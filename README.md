# Grand Survey Expedition - Map Viewer

A vanilla HTML/CSS/JS application that displays a map image with interactive dots and connections, built with D3.js.

## Features

- **Full-screen map display**: The `map.png` image scales to fit the screen while maintaining aspect ratio
- **100 interactive dots**: Placed randomly using a deterministic seed-based algorithm
- **Normalized coordinate system**: Dots are positioned using normalized coordinates (0,0 at center, -1 to +1 on smaller axis)
- **Voronoi-based connections**: Creates connections based on Voronoi diagram edges (deterministic, no overlaps)
- **Drag and drop**: Move dots around and see connections update in real-time
- **Visual distinction**: 
  - Bidirectional connections: Solid teal lines
  - Unidirectional connections: Dashed yellow lines with arrows
- **Save functionality**: Copy the entire graph data to clipboard with Cmd+C or the save button
- **URL state persistence**: Automatically saves state to URL for sharing and recovery

## Usage

1. Open `index.html` in a web browser
2. The map will load with 100 randomly placed dots and connections
3. Drag any dot to move it around - connections will update automatically
4. Press Cmd+C (or Ctrl+C on Windows/Linux) or click the "Save to Clipboard" button to copy the graph data as JSON
5. **Sharing**: Copy the URL to share your current state with others
6. **Recovery**: If the page crashes, just reload - your state is automatically saved in the URL

## Configuration

You can modify the following constants in `script.js`:

- `SEED`: Change this to get different random layouts (default: 42)
- `NUM_DOTS`: Number of dots to generate (default: 100)
- `BIDIRECTIONAL_PROBABILITY`: Probability of bidirectional connections (default: 0.4)

## Data Format

The saved JSON includes:
- Configuration parameters (seed, probabilities)
- Dot positions in normalized coordinates
- Connection information (from, to, bidirectional flag)

## Technical Details

- Uses D3.js v7 for SVG manipulation and drag functionality
- Deterministic random number generation ensures reproducible layouts
- Normalized coordinate system adapts to image aspect ratio
- SVG overlay for interactive elements
- Modern CSS with responsive design
- LZ String compression for efficient URL state storage
- Automatic state persistence and recovery via URL parameters
