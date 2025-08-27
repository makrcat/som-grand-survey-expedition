// Configuration
const SEED = 42; // Change this to get different random layouts
const NUM_DOTS = 100;
const BIDIRECTIONAL_PROBABILITY = 0.4; // Probability of bidirectional connection

// Settings
let settings = {
    regenerateConnections: false,
    showVoronoi: false
};

// Global variables
let dots = [];
let connections = [];
let imageAspectRatio = 1;
let imageWidth = 0;
let imageHeight = 0;
let svgWidth = 0;
let svgHeight = 0;
let isStateLoaded = false; // Track if we loaded state from URL
let selectedNode = null; // Currently selected node
let nodeClickOccurred = false; // Track if a node click just happened

// Deterministic random number generator using seed
class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }
    
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
    
    random() {
        return this.next();
    }
    
    randomBetween(min, max) {
        return min + (max - min) * this.random();
    }
}

const random = new SeededRandom(SEED);

// Helper functions for proper Voronoi-based connections
function calculateDistance(dot1, dot2) {
    const dx = dot1.normalizedX - dot2.normalizedX;
    const dy = dot1.normalizedY - dot2.normalizedY;
    return Math.sqrt(dx * dx + dy * dy);
}

function findVoronoiNeighbors() {
    const neighbors = new Map(); // dot index -> array of neighbor indices
    
    // Initialize neighbors map
    for (let i = 0; i < dots.length; i++) {
        neighbors.set(i, []);
    }
    
    // For each pair of dots, check if they share a Voronoi edge
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dot1 = dots[i];
            const dot2 = dots[j];
            
            // Check if these two dots are Voronoi neighbors
            if (areVoronoiNeighbors(dot1, dot2, i, j)) {
                neighbors.get(i).push(j);
                neighbors.get(j).push(i);
            }
        }
    }
    
    return neighbors;
}

function areVoronoiNeighbors(dot1, dot2, index1, index2) {
    // Two dots are Voronoi neighbors if there exists a point equidistant from both
    // that is closer to these two dots than to any other dot
    
    // Calculate midpoint between the two dots
    const midX = (dot1.normalizedX + dot2.normalizedX) / 2;
    const midY = (dot1.normalizedY + dot2.normalizedY) / 2;
    
    // Calculate distance from midpoint to both dots
    const dist1 = calculateDistance({normalizedX: midX, normalizedY: midY}, dot1);
    const dist2 = calculateDistance({normalizedX: midX, normalizedY: midY}, dot2);
    
    // Check if midpoint is closer to these two dots than to any other dot
    for (let k = 0; k < dots.length; k++) {
        if (k !== index1 && k !== index2) {
            const otherDot = dots[k];
            const distToOther = calculateDistance({normalizedX: midX, normalizedY: midY}, otherDot);
            
            // If any other dot is closer to the midpoint, these are not Voronoi neighbors
            if (distToOther < Math.max(dist1, dist2)) {
                return false;
            }
        }
    }
    
    return true;
}

// Generate deterministic color from node ID
function getNodeColor(nodeId) {
    // Use a better hash function that distributes across all RGB channels
    let hash = 0;
    const str = nodeId.toString();
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Use different parts of the hash for each color channel
    const r = (hash * 17) % 256;  // Red channel
    const g = (hash * 31) % 256;  // Green channel  
    const b = (hash * 13) % 256;  // Blue channel
    
    return `rgba(${r}, ${g}, ${b}, 0.3)`; // 30% opacity
}

// Render Voronoi cells using a simple grid-based approach
function renderVoronoiCells() {
    const svg = d3.select('#overlay-svg');
    
    // Clear existing Voronoi cells
    svg.selectAll('.voronoi-cell').remove();
    
    if (!settings.showVoronoi) {
        return;
    }
    
    // Create a grid to approximate Voronoi cells
    const gridSize = 1000; // Much higher resolution for accurate Voronoi cells
    const stepX = (2 * imageAspectRatio) / gridSize;
    const stepY = 2 / gridSize;
    
    // Group points by closest dot
    const cellGroups = {};
    
    for (let x = -imageAspectRatio; x <= imageAspectRatio; x += stepX) {
        for (let y = -1; y <= 1; y += stepY) {
            const point = {normalizedX: x, normalizedY: y};
            let closestDotIndex = 0;
            let minDistance = Infinity;
            
            // Find the closest dot to this point
            for (let i = 0; i < dots.length; i++) {
                const distance = calculateDistance(point, dots[i]);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestDotIndex = i;
                }
            }
            
            // Add this point to the closest dot's cell
            if (!cellGroups[closestDotIndex]) {
                cellGroups[closestDotIndex] = [];
            }
            cellGroups[closestDotIndex].push([normalizedToPixelX(x), normalizedToPixelY(y)]);
        }
    }
    
    // Create polygons for each cell
    for (const [dotIndex, points] of Object.entries(cellGroups)) {
        if (points.length > 2) {
            // Create a convex hull of the points to get a clean cell boundary
            const hull = createConvexHull(points);
            
            if (hull.length > 2) {
                const pathData = hull.map((point, index) => 
                    (index === 0 ? 'M' : 'L') + point[0] + ',' + point[1]
                ).join('') + 'Z';
                
                const nodeColor = getNodeColor(parseInt(dotIndex));
                
                svg.append('path')
                    .attr('class', 'voronoi-cell')
                    .attr('d', pathData)
                    .attr('fill', nodeColor)
                    .attr('stroke', 'rgba(255, 255, 255, 0.5)')
                    .attr('stroke-width', 1)
                    .style('pointer-events', 'none');
            }
        }
    }
}

// Simple convex hull algorithm
function createConvexHull(points) {
    if (points.length < 3) return points;
    
    // Find the leftmost point
    let leftmost = 0;
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] < points[leftmost][0]) {
            leftmost = i;
        }
    }
    
    const hull = [];
    let current = leftmost;
    
    do {
        hull.push(points[current]);
        
        let next = (current + 1) % points.length;
        for (let i = 0; i < points.length; i++) {
            if (i === current) continue;
            
            const cross = (points[i][0] - points[current][0]) * (points[next][1] - points[current][1]) -
                         (points[i][1] - points[current][1]) * (points[next][0] - points[current][0]);
            
            if (cross > 0) {
                next = i;
            }
        }
        
        current = next;
    } while (current !== leftmost);
    
    return hull;
}

function generateVoronoiConnections(existingConnectionsArray = []) {
    const neighbors = findVoronoiNeighbors();
    const connections = [];
    const connectionSet = new Set(); // To avoid duplicates
    
    // Create a map of existing connections for memoization
    const existingConnections = new Map();
    for (const conn of existingConnectionsArray) {
        const key = conn.from < conn.to ? `${conn.from}-${conn.to}` : `${conn.to}-${conn.from}`;
        existingConnections.set(key, conn.bidirectional);
    }
    
    // Create connections for each Voronoi neighbor pair
    for (let i = 0; i < dots.length; i++) {
        const neighborList = neighbors.get(i);
        
        for (const neighborIndex of neighborList) {
            // Create a unique key for this connection
            const key = i < neighborIndex ? `${i}-${neighborIndex}` : `${neighborIndex}-${i}`;
            
            // Avoid duplicate connections
            if (!connectionSet.has(key)) {
                connectionSet.add(key);
                
                // Check if this connection existed before
                let isBidirectional;
                if (existingConnections.has(key)) {
                    // Use the existing value
                    isBidirectional = existingConnections.get(key);
                } else {
                    // Generate new random value for new connections
                    isBidirectional = random.random() < BIDIRECTIONAL_PROBABILITY;
                }
                
                connections.push({
                    from: i,
                    to: neighborIndex,
                    bidirectional: isBidirectional
                });
            }
        }
    }
    
    // Ensure graph connectivity by fixing nodes with no in/out edges
    ensureGraphConnectivity(connections);
    
    console.log(`Generated ${connections.length} connections using Voronoi algorithm (memoized)`);
    return connections;
}

// Ensure every node has at least one bidirectional edge
function ensureGraphConnectivity(connections) {
    let maxIterations = 100; // Prevent infinite loops
    let iteration = 0;
    
    while (iteration < maxIterations) {
        const nodeStats = analyzeNodeConnectivity(connections);
        const nodesWithoutBidirectional = findNodesWithoutBidirectional(nodeStats);
        
        if (nodesWithoutBidirectional.length === 0) {
            console.log(`All nodes have bidirectional edges after ${iteration} iterations`);
            break;
        }
        
        // Fix nodes without bidirectional edges
        for (const nodeIndex of nodesWithoutBidirectional) {
            ensureNodeHasBidirectional(nodeIndex, connections, nodeStats);
        }
        
        iteration++;
    }
    
    if (iteration >= maxIterations) {
        console.warn('Warning: Could not ensure all nodes have bidirectional edges within iteration limit');
    }
}

// Analyze connectivity for each node
function analyzeNodeConnectivity(connections) {
    const nodeStats = new Map();
    
    // Initialize stats for all nodes
    for (let i = 0; i < dots.length; i++) {
        nodeStats.set(i, { inEdges: [], outEdges: [], bidirectionalEdges: [] });
    }
    
    // Analyze each connection
    for (let i = 0; i < connections.length; i++) {
        const conn = connections[i];
        
        if (conn.bidirectional) {
            nodeStats.get(conn.from).bidirectionalEdges.push(i);
            nodeStats.get(conn.to).bidirectionalEdges.push(i);
        } else {
            nodeStats.get(conn.from).outEdges.push(i);
            nodeStats.get(conn.to).inEdges.push(i);
        }
    }
    
    return nodeStats;
}

// Find nodes that don't have any bidirectional edges
function findNodesWithoutBidirectional(nodeStats) {
    const nodesWithoutBidirectional = [];
    
    for (const [nodeIndex, stats] of nodeStats.entries()) {
        if (stats.bidirectionalEdges.length === 0) {
            nodesWithoutBidirectional.push(nodeIndex);
        }
    }
    
    return nodesWithoutBidirectional;
}

// Ensure a specific node has at least one bidirectional edge
function ensureNodeHasBidirectional(nodeIndex, connections, nodeStats) {
    const stats = nodeStats.get(nodeIndex);
    
    // If node already has bidirectional edges, nothing to do
    if (stats.bidirectionalEdges.length > 0) {
        return;
    }
    
    // Get all edges connected to this node
    const allConnectedEdges = [...stats.inEdges, ...stats.outEdges];
    
    if (allConnectedEdges.length === 0) {
        // Node has no edges at all - this shouldn't happen with Voronoi neighbors
        console.warn(`Node ${nodeIndex} has no edges - this shouldn't happen`);
        return;
    }
    
    // Pick a random edge and make it bidirectional
    const edgeIndex = allConnectedEdges[Math.floor(random.random() * allConnectedEdges.length)];
    const conn = connections[edgeIndex];
    
    // Make the edge bidirectional
    conn.bidirectional = true;
    
    console.log(`Made edge ${edgeIndex} (${conn.from} ↔ ${conn.to}) bidirectional for node ${nodeIndex}`);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const mapImage = document.getElementById('map-image');
    const svg = d3.select('#overlay-svg');
    
    // Wait for image to load to get dimensions
    mapImage.onload = function() {
        initializeApp();
    };
    
    // If image is already loaded
    if (mapImage.complete) {
        initializeApp();
    }
    
    function initializeApp() {
        // Get image dimensions
        const imgRect = mapImage.getBoundingClientRect();
        imageWidth = imgRect.width;
        imageHeight = imgRect.height;
        imageAspectRatio = imageWidth / imageHeight;
        
        // Set SVG dimensions
        svg.attr('width', imageWidth)
           .attr('height', imageHeight);
        
        svgWidth = imageWidth;
        svgHeight = imageHeight;
        
        // Try to load state from URL first
        if (!loadStateFromURL()) {
            // Generate new dots and connections if no state loaded
            generateDots();
            generateConnections();
        }
        
        // Render everything (Voronoi cells first, then connections, then dots on top)
        renderVoronoiCells();
        renderConnections();
        renderDots();
        
        // Set up event listeners
        setupEventListeners();
        
        // Attach drag behavior to dots
        attachDragBehavior();
    }
});

// Generate dots with normalized coordinates
function generateDots() {
    dots = [];
    
    for (let i = 0; i < NUM_DOTS; i++) {
        // Generate normalized coordinates
        // X: -aspectRatio to +aspectRatio
        // Y: -1 to +1
        const normalizedX = random.randomBetween(-imageAspectRatio, imageAspectRatio);
        const normalizedY = random.randomBetween(-1, 1);
        
        dots.push({
            id: i,
            normalizedX: normalizedX,
            normalizedY: normalizedY,
            x: normalizedToPixelX(normalizedX),
            y: normalizedToPixelY(normalizedY),
            name: `Node ${i}` // Default name
        });
    }
}

// Generate connections between dots using Voronoi diagram
function generateConnections() {
    connections = generateVoronoiConnections(connections);
}

// Convert normalized coordinates to pixel coordinates
function normalizedToPixelX(normalizedX) {
    return (normalizedX / imageAspectRatio + 1) * (imageWidth / 2);
}

function normalizedToPixelY(normalizedY) {
    return (-normalizedY + 1) * (imageHeight / 2);
}

// Convert pixel coordinates to normalized coordinates
function pixelToNormalizedX(pixelX) {
    return ((pixelX / (imageWidth / 2)) - 1) * imageAspectRatio;
}

function pixelToNormalizedY(pixelY) {
    return -((pixelY / (imageHeight / 2)) - 1);
}

// Render dots
function renderDots() {
    const svg = d3.select('#overlay-svg');
    
    // Clear existing dots
    svg.selectAll('.dot').remove();
    
    console.log('Rendering dots:', dots.length, 'dots with names:', dots.map(d => ({id: d.id, name: d.name})));
    
    // Create dots
    const dotGroups = svg.selectAll('.dot')
        .data(dots)
        .enter()
        .append('g')
        .attr('class', 'dot')
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .style('cursor', 'pointer');
    
    // Add circle for each dot
    dotGroups.append('circle')
        .attr('r', 6)
        .attr('fill', d => d.id === selectedNode ? '#FFD700' : '#FF6B6B')
        .attr('stroke', d => d.id === selectedNode ? '#FFA500' : '#ffffff')
        .attr('stroke-width', d => d.id === selectedNode ? 3 : 1.5)
        .attr('data-radius', 6) // Store radius for line calculations
        .style('transition', 'r 0.2s ease, stroke-width 0.2s ease'); // Smooth transitions
    
    // Add text label
    dotGroups.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('fill', '#ffffff')
        .attr('font-size', '8px')
        .attr('font-weight', 'bold')
        .style('user-select', 'none')
        .style('pointer-events', 'none')
        .text(d => d.id);
    
    // Add hover events
    dotGroups
        .on('mouseenter', function(event, d) {
            console.log('Mouse enter on node:', d.id, d.name);
            showHoverDisplay(d.name);
            // Make node bigger on hover
            d3.select(this).select('circle')
                .attr('r', 10)
                .attr('stroke-width', d.id === selectedNode ? 4 : 2.5);
        })
        .on('mouseleave', function(event, d) {
            console.log('Mouse leave on node:', d.id);
            // Return to normal size
            d3.select(this).select('circle')
                .attr('r', 6)
                .attr('stroke-width', d.id === selectedNode ? 3 : 1.5);
            
            // Show selected node's name if there is one, otherwise hide display
            if (selectedNode !== null) {
                const selectedNodeData = dots.find(n => n.id === selectedNode);
                if (selectedNodeData) {
                    showHoverDisplay(selectedNodeData.name);
                }
            } else {
                hideHoverDisplay();
            }
        });
}

// Helper function to calculate line endpoints at dot edges
function calculateLineEndpoints(fromDot, toDot, fromRadius = 6, toRadius = 6) {
    const dx = toDot.x - fromDot.x;
    const dy = toDot.y - fromDot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return { x1: fromDot.x, y1: fromDot.y, x2: toDot.x, y2: toDot.y };
    
    // Calculate unit vector
    const unitX = dx / distance;
    const unitY = dy / distance;
    
    // Calculate endpoints at dot edges
    const x1 = fromDot.x + unitX * fromRadius;
    const y1 = fromDot.y + unitY * fromRadius;
    const x2 = toDot.x - unitX * toRadius;
    const y2 = toDot.y - unitY * toRadius;
    
    return { x1, y1, x2, y2 };
}

// Render connections
function renderConnections() {
    const svg = d3.select('#overlay-svg');
    
    // Clear existing connections
    svg.selectAll('.connection').remove();
    
    // Create connections
    const connectionGroups = svg.selectAll('.connection')
        .data(connections)
        .enter()
        .append('g')
        .attr('class', 'connection');
    
    // Add lines with endpoints at dot edges
    connectionGroups.append('line')
        .attr('x1', d => {
            const endpoints = calculateLineEndpoints(dots[d.from], dots[d.to]);
            return endpoints.x1;
        })
        .attr('y1', d => {
            const endpoints = calculateLineEndpoints(dots[d.from], dots[d.to]);
            return endpoints.y1;
        })
        .attr('x2', d => {
            const endpoints = calculateLineEndpoints(dots[d.from], dots[d.to]);
            return endpoints.x2;
        })
        .attr('y2', d => {
            const endpoints = calculateLineEndpoints(dots[d.from], dots[d.to]);
            return endpoints.y2;
        })
        .attr('stroke', d => d.bidirectional ? '#4ECDC4' : '#FFE66D')
        .attr('stroke-width', d => d.bidirectional ? 4 : 3)
        .attr('stroke-dasharray', d => d.bidirectional ? 'none' : '5,5')
        .style('filter', 'drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.8))'); // Add shadow for contrast
    
    // Add arrow markers for directional connections
    if (!svg.select('defs').empty()) {
        svg.select('defs').remove();
    }
    
    const defs = svg.append('defs');
    
    // Arrow marker for directional connections
    defs.append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#FFE66D')
        .style('filter', 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.8))'); // Add shadow for arrow
    
    // Apply arrow markers to directional connections
    connectionGroups.select('line')
        .filter(d => !d.bidirectional)
        .attr('marker-end', 'url(#arrowhead)');
}

// Set up event listeners
function setupEventListeners() {
    // Save button
    document.getElementById('save-btn').addEventListener('click', saveToClipboard);
    
    // Settings checkboxes
    document.getElementById('regenerate-connections').addEventListener('change', function() {
        settings.regenerateConnections = this.checked;
        updateURLWithState();
    });
    
    document.getElementById('show-voronoi').addEventListener('change', function() {
        settings.showVoronoi = this.checked;
        renderVoronoiCells();
    });
    
    // Node name input
    document.getElementById('node-name-input').addEventListener('input', function() {
        if (selectedNode !== null) {
            const node = dots.find(d => d.id === selectedNode);
            if (node) {
                node.name = this.value;
                showHoverDisplay(node.name); // Update the hover display
                updateURLWithState();
            }
        }
    });
    
    // Background click to deselect
    document.getElementById('map-container').addEventListener('click', function(event) {
        // Only deselect if clicking on the background, not on nodes or their children
        if (event.target.id === 'map-container' || event.target.id === 'map-image') {
            console.log('Background click detected, deselecting');
            deselectNode();
        }
    });
    
    // Keyboard shortcut for save
    document.addEventListener('keydown', function(e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
            e.preventDefault();
            saveToClipboard();
        }
    });
}

// Show hover display
function showHoverDisplay(name) {
    const hoverDisplay = document.getElementById('hover-display');
    hoverDisplay.textContent = name;
    hoverDisplay.classList.add('visible');
}

// Update hover display for selected node
function updateHoverDisplayForSelected() {
    if (selectedNode !== null) {
        const node = dots.find(d => d.id === selectedNode);
        if (node) {
            showHoverDisplay(node.name);
        }
    }
}

// Hide hover display
function hideHoverDisplay() {
    const hoverDisplay = document.getElementById('hover-display');
    hoverDisplay.classList.remove('visible');
}

// Select a node
function selectNode(nodeId) {
    // If clicking the same node, deselect it
    if (selectedNode === nodeId) {
        deselectNode();
        return;
    }
    
    selectedNode = nodeId;
    const node = dots.find(d => d.id === nodeId);
    if (node) {
        document.getElementById('node-name-input').value = node.name;
        showHoverDisplay(node.name); // Show the name at the top
    }
    renderDots(); // Re-render to show selection
    attachDragBehavior(); // Re-attach drag behavior after re-rendering
    console.log(`Selected node ${nodeId}: ${node.name}`);
}

// Deselect current node
function deselectNode() {
    selectedNode = null;
    document.getElementById('node-name-input').value = '';
    hideHoverDisplay();
    renderDots(); // Re-render to show deselection
    attachDragBehavior(); // Re-attach drag behavior after re-rendering
    console.log('Deselected node');
}

// Attach drag behavior to dots
function attachDragBehavior() {
    console.log('Attaching drag behavior to', d3.selectAll('.dot').size(), 'dots');
    
    const drag = d3.drag()
        .on('start', function(event, d) {
            console.log('Drag started on node:', d.id);
            d3.select(this).raise().classed('active', true);
            // Select the node when drag starts (works for both clicks and drags)
            selectNode(d.id);
        })
        .on('drag', function(event, d) {
            // Update dot position
            d.normalizedX = pixelToNormalizedX(event.x);
            d.normalizedY = pixelToNormalizedY(event.y);
            d.x = event.x;
            d.y = event.y;
            
            // Update visual position
            d3.select(this).attr('transform', `translate(${d.x}, ${d.y})`);
            
            // Update connections if needed
            updateConnections();
        })
        .on('end', function(event, d) {
            d3.select(this).classed('active', false);
            
            // Update URL with new state
            updateURLWithState();
            
            // Regenerate connections if setting is enabled
            if (settings.regenerateConnections) {
                generateConnections();
                renderVoronoiCells();
                renderConnections();
                renderDots();
                attachDragBehavior();
            }
        });
    
    d3.selectAll('.dot').call(drag);
}

// Drag functions
function dragStarted(event, d) {
    d3.select(this).raise().classed('active', true);
}

function dragged(event, d) {
    // Update pixel coordinates
    d.x = event.x;
    d.y = event.y;
    
    // Update normalized coordinates
    d.normalizedX = pixelToNormalizedX(d.x);
    d.normalizedY = pixelToNormalizedY(d.y);
    
    // Update transform
    d3.select(this).attr('transform', `translate(${d.x}, ${d.y})`);
    
    // Update connections (but not URL yet)
    updateConnections();
}

function dragEnded(event, d) {
    d3.select(this).classed('active', false);
    
    // Regenerate connections if setting is enabled
    if (settings.regenerateConnections) {
        generateConnections();
        renderVoronoiCells();
        renderConnections();
        renderDots(); // Re-render dots to keep them on top
        attachDragBehavior(); // Re-attach drag behavior to new dots
    }
    
    // Update URL with new state only when drag is complete
    updateURLWithState();
}

// Update connections when dots move
function updateConnections() {
    const svg = d3.select('#overlay-svg');
    
    svg.selectAll('.connection line')
        .attr('x1', d => {
            const endpoints = calculateLineEndpoints(dots[d.from], dots[d.to]);
            return endpoints.x1;
        })
        .attr('y1', d => {
            const endpoints = calculateLineEndpoints(dots[d.from], dots[d.to]);
            return endpoints.y1;
        })
        .attr('x2', d => {
            const endpoints = calculateLineEndpoints(dots[d.from], dots[d.to]);
            return endpoints.x2;
        })
        .attr('y2', d => {
            const endpoints = calculateLineEndpoints(dots[d.from], dots[d.to]);
            return endpoints.y2;
        });
}

// Save data to clipboard
function saveToClipboard() {
    const data = getCurrentState();
    const jsonString = JSON.stringify(data, null, 2);
    
    // Copy to clipboard
    navigator.clipboard.writeText(jsonString).then(function() {
        // Visual feedback
        const btn = document.getElementById('save-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = '#28a745';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#007AFF';
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy to clipboard:', err);
        alert('Failed to copy to clipboard. Please try again.');
    });
}

// Get current state as JSON object
function getCurrentState() {
    return {
        seed: SEED,
        numDots: NUM_DOTS,
        bidirectionalProbability: BIDIRECTIONAL_PROBABILITY,
        settings: settings,
        dots: dots.map(dot => ({
            id: dot.id,
            normalizedX: dot.normalizedX,
            normalizedY: dot.normalizedY,
            name: dot.name
        })),
        connections: connections
    };
}

// Update URL with current state
function updateURLWithState() {
    try {
        // Check if LZString is available
        if (typeof LZString === 'undefined') {
            console.error('LZString library not loaded');
            return;
        }
        
        const state = getCurrentState();
        const jsonString = JSON.stringify(state);
        
        // Use LZString's URL-safe compression
        const compressed = LZString.compressToEncodedURIComponent(jsonString);
        
        // Update URL without reloading the page
        const url = new URL(window.location);
        url.searchParams.set('state', compressed);
        window.history.replaceState({}, '', url);
    } catch (error) {
        console.error('Failed to update URL with state:', error);
    }
}

// Load state from URL
function loadStateFromURL() {
    try {
        const url = new URL(window.location);
        const base64State = url.searchParams.get('state');
        
        if (!base64State) {
            return false;
        }
        
        const jsonString = LZString.decompressFromEncodedURIComponent(base64State);
        
        if (!jsonString) {
            console.warn('Failed to decompress state from URL');
            return false;
        }
        
        const state = JSON.parse(jsonString);
        
        // Validate state structure
        if (!state.dots || !state.connections) {
            console.warn('Invalid state structure in URL');
            return false;
        }
        
        // Load dots
        dots = state.dots.map(dot => ({
            ...dot,
            x: normalizedToPixelX(dot.normalizedX),
            y: normalizedToPixelY(dot.normalizedY),
            name: dot.name || `Node ${dot.id}` // Ensure name exists
        }));
        
        // Load connections
        connections = state.connections;
        
        // Load settings
        if (state.settings) {
            settings = state.settings;
            // Update UI to reflect loaded settings
            document.getElementById('regenerate-connections').checked = settings.regenerateConnections;
            document.getElementById('show-voronoi').checked = settings.showVoronoi;
        }
        
        isStateLoaded = true;
        console.log('State loaded from URL successfully');
        return true;
        
    } catch (error) {
        console.error('Failed to load state from URL:', error);
        return false;
    }
}
