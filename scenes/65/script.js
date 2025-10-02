// SERVER EMULATION SHIM (client-side)
(function(){
  const __TEMPLATES = {};
  __TEMPLATES["easter_egg.html"] = `<div class="hidden-container">
    <div class="hidden-content">
        <header class="secret-header">
            <h1 class="glitch" data-text="SCENE 65 UNLOCKED">SCENE 65 UNLOCKED</h1>
            <p class="access-granted">Access Granted - Welcome to the Forbidden Archive</p>
        </header>

        <div class="expedition-details">
            <h2>THE GRAND SURVEY EXPEDITION</h2>
            <p>Congratulations! You've successfully infiltrated the forbidden sector and discovered the hidden archive of the <strong>Hack Club Summer of Making Grand Survey Expedition</strong>.</p>
            
            <h3>🚀 Mission Briefing:</h3>
            <p>The Grand Survey was a legendary expedition across the digital cosmos, mapping uncharted territories of creativity and innovation during the Summer of Making.</p>
            
            <h3>📡 Discovered Artifacts:</h3>
            <ul>
                <li><strong>Project Constellation:</strong> A mapping of maker projects across space-time</li>
                <li><strong>The Creativity Engine:</strong> Quantum algorithms for inspiration generation</li>
                <li><strong>Community Nexus:</strong> Interdimensional communication protocols</li>
                <li><strong>Innovation Protocols:</strong> Guidelines for reality-bending projects</li>
            </ul>
            
            <h3>🔬 Secret Research Data:</h3>
            <div class="data-block">
                <code>
                EXPEDITION_STATUS: ONGOING<br>
                DIMENSIONS_MAPPED: ∞<br>
                MAKERS_INSPIRED: 47,892<br>
                PROJECTS_CREATED: COUNTLESS<br>
                IMPOSSIBLE_MADE_POSSIBLE: TRUE
                </code>
            </div>
            
            <h3>🌟 Your Mission, Should You Choose to Accept:</h3>
            <p>Join the ongoing expedition! Create something impossible, map new territories of learning, and add your discoveries to the Grand Survey archive.</p>
            
            <div class="expedition-links">
                <a href="/scenes/27" class="expedition-link">
                    🗺️ Access the Discouraged Sector (Scene 27)
                </a>
                <div class="hidden-message">
                    <strong>Classified Note:</strong> The true treasure was the friends and projects made along the way. 
                    Keep exploring, keep creating, and remember: in the world of making, there are no forbidden sectors—only undiscovered possibilities.
                </div>
            </div>
        </div>

        <footer class="secret-footer">
            <p>🔒 Scene 65 Classified Archive | Clearance Level: ULTRA</p>
        </footer>
    </div>
</div>
`;
  __TEMPLATES["info.html"] = `<div class="stars"></div>
<div class="container">
    <div class="terminal-window">
        <div class="terminal-header">
            <div class="terminal-controls">
                <span class="control close"></span>
                <span class="control minimize"></span>
                <span class="control maximize"></span>
            </div>
            <div class="terminal-title">EXPEDITION_ARCHIVES.dat</div>
        </div>
        <div class="terminal-body">
            <div class="info-header">
                <h1>🗺️ EXPEDITION MEMBER ACCESS GUIDE</h1>
                <p class="subtitle">Recovered data from the SoM Grand Survey Archive</p>
            </div>

            <div class="challenge-section">
                <h2>📋 MISSION BRIEFING</h2>
                <p>Greetings, potential expedition member! You've stumbled upon classified archives from the legendary <strong>Hack Club Summer of Making Grand Survey Expedition</strong>.</p>
                <p>To prove your worthiness and gain access to the Forbidden Sector, you must solve these challenges left behind by previous explorers.</p>
            </div>

            <div class="challenge-container">
                <div class="challenge-box">
                    <h3>🌊 Challenge 1: The Sea of Glub Navigation</h3>
                    <p>A waterlogged notebook from Scene 36 contains this cryptic message:</p>
                    <div class="cipher-text">
                        "Nine tools drift in the digital ocean. Match them to their purposes:<br>
                        <span class="highlight">Git</span> tracks changes, <span class="highlight">Docker</span> contains worlds,<br>
                        <span class="highlight">Kubernetes</span> orchestrates, <span class="highlight">Rust</span> runs fast..."
                    </div>
                    <p>The expedition leader's identity is hidden in the tool that:</p>
                    <div class="riddle-text">
                        "Manages code versions and is loved by all hackers worldwide.<br>
                        Take the name of this tool, add 'hub', and you'll find the secret door."
                    </div>
                    <p class="hint">💡 <strong>Hint:</strong> This tool + hub = a famous code hosting platform</p>
                    <form class="answer-form" data-type="username">
                        <input type="text" placeholder="Enter the tool + hub" class="answer-input" required>
                        <button type="submit" class="reveal-btn">Submit</button>
                        <div class="solution" style="display:none;"></div>
                    </form>
                </div>

                <div class="challenge-box">
                    <h3>🎭 Challenge 2: The Scene Count Mystery</h3>
                    <p>From the exploration logs, we know various scene numbers from the expedition:</p>
                    <div class="cipher-text">
                        Scene 1: Splorgon 5 (Peninsula of Dragons)<br>
                        Scene 17: Toetree Forest<br>
                        Scene 33: The Far Northeast Extremity<br>
                        Scene 65: <span class="highlight">The Forbidden Sector</span> (YOU ARE HERE)<br>
                        Scene 99: The Silly Silly Hilly Silly Hills
                    </div>
                    <p>The expedition archived clues about the access code:</p>
                    <div class="riddle-text">
                        "Count the forbidden scene number, then subtract the peninsula dragons.<br>
                        Add the extreme, multiply by the trees of toes.<br>
                        Finally subtract the silly hills. This number holds the key!"
                    </div>
                    <p class="hint">💡 <strong>Math:</strong> (65 - 1 + 33) × 17 - 99 = ?</p>
                    <form class="answer-form" data-type="password">
                        <input type="text" placeholder="Enter the password" class="answer-input" required>
                        <button type="submit" class="reveal-btn">Submit</button>
                        <div class="solution" style="display:none;"></div>
                    </form>
                </div>

                <div class="challenge-box">
                    <h3>‍☠️ Challenge 3: The Crime Scene Investigation</h3>
                    <p>From Scene 93 "The Scene of the Crime", decrypt this transmission:</p>
                    <div class="cipher-text glitch" id="glitchText">
                        >SCANNING_PRESENCE...<br>
                        >SUBJECT_DETECTED.<br>
                        >AURARIDDLE THOUGHT HE WAS BUILDING A PROJECT<br>
                        >BUT <span class="highlight">HE</span> WAS THE PROJECT.<br>
                        >WELCOME TO THE REAL SUMMER OF MAKING.
                    </div>
                    <p>The ghost in the machine asks:</p>
                    <div class="riddle-text">
                        "I haunt the Eastern Upside-Down Island (Scene 37),<br>
                        Where gravity defies and trees hang from the sky.<br>
                        My domain spans many scenes, from Bigloo Island (21) to the Forbidden Sector.<br>
                        What am I that connects all these digital realms?"
                    </div>
                    <p class="hint">💡 Think about what enables all these web scenes to exist...</p>
                    <form class="answer-form" data-type="riddle">
                        <input type="text" placeholder="What connects all scenes?" class="answer-input" required>
                        <button type="submit" class="reveal-btn">Submit</button>
                        <div class="solution" style="display:none;"></div>
                    </form>
                </div>

                <div class="challenge-box">
                    <h3>🔬 Challenge 4: The Raving Crabs Protocol</h3>
                    <p>Scene 16 documented the <em>Rhythmus brachyurus</em> (Raving Crabs). Their dance contains a secret:</p>
                    <div class="cipher-text">
                        🦀💃🕺🦀💃🕺🦀<br>
                        "The crabs dance in patterns of <span class="highlight">4-1-1-2-2-4</span><br>
                        Each number represents letters in expedition words:<br>
                        <strong>SUMM</strong>-<strong>E</strong>-<strong>R</strong>-<strong>OF</strong>-<strong>MA</strong>-<strong>KING</strong>"
                    </div>
                    <p>Arrange these expedition fragments to unlock the sequence:</p>
                    <div class="riddle-text">
                        "When the crabs rave, they spell out the expedition's motto.<br>
                        Combine all fragments in dancing order for the final key."
                    </div>
                    <form class="answer-form" data-type="crab">
                        <input type="text" placeholder="Enter the final key" class="answer-input" required>
                        <button type="submit" class="reveal-btn">Submit</button>
                        <div class="solution" style="display:none;"></div>
                    </form>
                </div>

                <div class="challenge-box danger">
                    <h3>💀 FINAL CHALLENGE: The Composite Key</h3>
                    <p>All previous challenges have led to this moment. The true access requires combining discoveries:</p>
                    <div class="cipher-text terminal-style">
                        EXPEDITION_PROTOCOL_ENGAGED<br>
                        USERNAME: [Challenge 1 Result]<br>
                        PASSWORD: [Challenge 2 Result]<br>
                        VERIFICATION: [Challenges 3 & 4 prove worthiness]<br>
                        <span class="highlight">AUTHORISATION LEVEL: SECTOR65</span>
                    </div>
                    <form class="answer-form" data-type="final">
                        <input type="text" placeholder="Username" class="answer-input" required>
                        <input type="text" placeholder="Password" class="answer-input" required>
                        <button type="submit" class="reveal-btn danger-btn">INITIATE FINAL PROTOCOL</button>
                        <div class="solution" style="display:none;"></div>
                    </form>
                </div>
            </div>

            <div class="credentials-summary" id="credentialsSummary" style="display: none;">
                <h2>🚀 EXPEDITION CREDENTIALS DISCOVERED!</h2>
                <div class="credentials-box">
                    <p><strong>Username:</strong> <code>github</code></p>
                    <p><strong>Password:</strong> <code>1550</code></p>
                </div>
                <p>Use these credentials to access the forbidden sector and uncover the hidden expedition archive!</p>
                <button class="return-btn" onclick="window.location.href='index.html'">🔙 Return to Forbidden Sector</button>
            </div>

            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <div class="progress-text">
                Challenges Completed: <span id="challengeCount">0</span>/5
            </div>

            <div class="expedition-lore">
                <h3>📚 Expedition Lore</h3>
                <p>The Summer of Making Grand Survey Expedition was a legendary journey through the realms of creativity and innovation. Participants from around the world joined forces to map uncharted territories of possibility, building projects that pushed the boundaries of what teenagers could create.</p>
                <p>Each expedition member was given special access codes to navigate the various sectors of the digital cosmos. Only those who proved their dedication to the mission of making could access the most classified areas.</p>
                <p>(This lore is purely AI-generated and makes no sense, and that is the point here)</p>
                <p>Are you ready to join their ranks?</p>
            </div>
        </div>
    </div>
</div>
`;
  const __USERNAME = "github";
  const __PASSWORD = "1550";
  
  // Client-side challenge answers and tracking
  let __CHALLENGE_COUNT = 0;
  const __CHALLENGE_ANSWERS = {
    'username': ['github'],
    'password': ['1550'],
    'riddle': ['internet', 'web'],
    'crab': ['summerofmaking', 'summer of making'],
    'final': { username: 'github', password: '1550' }
  };
  
  function htmlResponse(html){ return Promise.resolve(new Response(html, {status:200, headers:{"Content-Type":"text/html"}})); }
  function jsonResponse(obj){ return Promise.resolve(new Response(JSON.stringify(obj), {status:200, headers:{"Content-Type":"application/json"}})); }
  const _origFetch = window.fetch.bind(window);
  window.fetch = function(input, init){
    try{
      const url = (typeof input === "string") ? input : input.url;
      const u = new URL(url, location.origin);
      const path = u.pathname;
      if(path === "/login" && init && init.method && init.method.toUpperCase()==="POST"){
        return (async ()=>{
          let body = init.body || "";
          let data={};
          try{ data = JSON.parse(body); }catch(e){ try{ data = Object.fromEntries(new URLSearchParams(body)); }catch(e){} }
          const ok = (__USERNAME===null || __PASSWORD===null) ? false : (data.username===__USERNAME && data.password===__PASSWORD);
          if(ok) return jsonResponse({ok:true, user:data.username});
          return jsonResponse({ok:false, error:"bad credentials"});
        })();
      }
      if(path === "/auth" && init && init.method && init.method.toUpperCase()==="POST"){
        return (async ()=>{
          let body = init.body || "";
          let data={};
          try{ data = JSON.parse(body); }catch(e){ try{ data = Object.fromEntries(new URLSearchParams(body)); }catch(e){} }
          const ok = (__USERNAME===null || __PASSWORD===null) ? false : (data.username===__USERNAME && data.password===__PASSWORD);
          if(ok) return jsonResponse({ok:true, user:data.username});
          return jsonResponse({ok:false, error:"bad credentials"});
        })();
      }
      if(path === "/authenticate" && init && init.method && init.method.toUpperCase()==="POST"){
        return (async ()=>{
          let body = init.body || "";
          let data={};
          try{ data = JSON.parse(body); }catch(e){ try{ data = Object.fromEntries(new URLSearchParams(body)); }catch(e){} }
          const ok = (__USERNAME===null || __PASSWORD===null) ? false : (data.username===__USERNAME && data.password===__PASSWORD);
          if(ok) return jsonResponse({authenticated: true, user: data.username});
          return jsonResponse({authenticated: false, error: "Invalid credentials - access denied"});
        })();
      }
      if(path === "/check_answer" && init && init.method && init.method.toUpperCase()==="POST"){
        return (async ()=>{
          let body = init.body || "";
          let data={};
          try{ data = JSON.parse(body); }catch(e){ try{ data = Object.fromEntries(new URLSearchParams(body)); }catch(e){} }
          
          let correct = false;
          const type = data.type;
          const value = (data.value || '').toLowerCase().trim();
          
          if (type === 'final') {
            const finalAnswers = __CHALLENGE_ANSWERS.final;
            correct = data.username === finalAnswers.username && data.password === finalAnswers.password;
          } else if (__CHALLENGE_ANSWERS[type]) {
            const answers = __CHALLENGE_ANSWERS[type];
            correct = answers.some(answer => answer.toLowerCase() === value);
          }
          
          if (correct && type !== 'final') {
            __CHALLENGE_COUNT++;
          }
          
          return jsonResponse({
            correct: correct,
            challenge_count: __CHALLENGE_COUNT,
            message: correct ? 'Correct!' : 'Try again!'
          });
        })();
      }
      if(path === "/content/authenticated" && init && init.method && init.method.toUpperCase()==="POST"){
        return (async ()=>{
          let body = init.body || "";
          let data={};
          try{ data = JSON.parse(body); }catch(e){ try{ data = Object.fromEntries(new URLSearchParams(body)); }catch(e){} }
          const ok = (__USERNAME===null || __PASSWORD===null) ? false : (data.username===__USERNAME && data.password===__PASSWORD);
          if(ok) {
            const template = __TEMPLATES["easter_egg.html"];
            return jsonResponse({html: template});
          }
          return jsonResponse({ok:false, error:"bad credentials"});
        })();
      }
      if(path === "/create_session" && init && init.method && init.method.toUpperCase()==="POST"){
        return (async ()=>{
          return jsonResponse({session_id: "client-side-session-" + Date.now()});
        })();
      }
    }catch(e){ /* passthrough on error */ }
    return _origFetch(input, init);
  };
  
  // Expose templates globally for client-side access
  window.__TEMPLATES = __TEMPLATES;
})();
// END SHIM


// The Forbidden Sector - Scene 65
// Interactive JavaScript with authentication

// Help command to redirect to riddles
const HELP_COMMAND = 'help';
let userInput = '';
let sequenceTimeout;
let challengeSessionId = '';  // For challenge tracking only

// DOM elements
const forbiddenPage = document.getElementById('forbidden-page');
const hint = document.getElementById('hint');
const authButton = document.getElementById('auth-button');

// Initialize the application
function init() {
    setupEventListeners();
    updateHintPeriodically();
    createSession();
}

// Create a session for challenge tracking
async function createSession() {
    try {
        const response = await fetch('/create_session', { method: 'POST' });
        const data = await response.json();
        challengeSessionId = data.session_id;
        console.log('Challenge session created:', challengeSessionId);
    } catch (error) {
        console.error('Failed to create session:', error);
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Keyboard input for secret sequence
    document.addEventListener('keydown', handleKeyDown);
    
    // Authentication button
    if (authButton) {
        authButton.addEventListener('click', createAuthDialog);
    }
}

// Handle keyboard input for help command
function handleKeyDown(event) {
    // Only process if not on authenticated page
    if (document.body.innerHTML.includes('SCENE 65 UNLOCKED')) return;
    
    const char = event.key.toLowerCase();
    
    // Clear previous timeout
    clearTimeout(sequenceTimeout);
    
    // Add character to input
    userInput += char;
    
    // Check if input matches start of help command
    if (HELP_COMMAND.startsWith(userInput)) {
        // If complete match, redirect to info page
        if (userInput === HELP_COMMAND) {
            redirectToInfoPage();
            userInput = '';
            return;
        }
        
        // Set timeout to clear input after 2 seconds of inactivity
        sequenceTimeout = setTimeout(() => {
            userInput = '';
        }, 2000);
    } else {
        // Reset input if no match
        userInput = '';
    }
}

// Redirect to info page with riddles
function redirectToInfoPage() {
    loadClientSideTemplate('info.html');
}

// Load client-side template (for client-only mode)
function loadClientSideTemplate(templateName) {
    try {
        // Get template from the client-side shim
        const template = window.__TEMPLATES && window.__TEMPLATES[templateName];
        if (!template) {
            throw new Error(`Template ${templateName} not found`);
        }

        // Replace body content with template content
        document.body.innerHTML = template;
        
        // Add CSS link to head if not present
        if (!document.querySelector('link[href="style.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'style.css';
            document.head.appendChild(link);
        }
        
        // Initialize challenge handling for info page
        if (templateName === 'info.html') {
            initializeChallengeHandling();
        }
        
        console.log(`Client-side template ${templateName} loaded successfully`);
    } catch (error) {
        console.error('Failed to load client-side template:', error);
        alert(`Failed to load content: ${error.message}`);
    }
}

// Load dynamic content into the page
async function loadDynamicContent(endpoint, sessionIdParam = null) {
    try {
        let url = endpoint;
        if (sessionIdParam) {
            console.log('Adding session_id to URL:', sessionIdParam);
            url += `?session_id=${encodeURIComponent(sessionIdParam)}`;
        } else {
            console.warn('No session_id provided for', endpoint);
        }
        
        console.log('Loading content from:', url);
        
        const response = await fetch(url);
        console.log('Response status:', response.status, response.statusText);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server error response:', errorText);
            
            if (response.status === 401) {
                console.error('Authentication required for this content');
                alert('Authentication required. Please log in again.');
                return;
            }
            if (response.status === 400) {
                console.error('Bad request - likely missing or invalid session ID');
                console.error('URL that failed:', url);
                console.error('Session ID param:', sessionIdParam);
                alert(`Authentication error (400): ${errorText}. Please try logging in again.`);
                return;
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Content loaded successfully');
        
        // Replace body content with new content
        document.body.innerHTML = data.html;
        
        // Add CSS link to head if not present
        if (!document.querySelector('link[href="style.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'style.css';
            document.head.appendChild(link);
        }
        
        // Initialize challenge handling for info page
        if (endpoint === '/content/help') {
            initializeChallengeHandling();
        }
    } catch (error) {
        console.error('Failed to load content:', error);
        alert(`Failed to load content: ${error.message}`);
    }
}

// Initialize challenge handling for the info page
function initializeChallengeHandling() {
    // Server-side challenge tracking - remove client-side count
    function updateProgress(serverChallengeCount) {
        const progressFill = document.getElementById('progressFill');
        const challengeCount = document.getElementById('challengeCount');
        if (progressFill && challengeCount) {
            const percentage = (serverChallengeCount / 5) * 100;
            progressFill.style.width = percentage + '%';
            challengeCount.textContent = serverChallengeCount;
        }
    }
    
    // Animate challenge boxes
    const challengeBoxes = document.querySelectorAll('.challenge-box');
    challengeBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(20px)';
            box.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            setTimeout(() => {
                box.style.opacity = '1';
                box.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
    
    // Glitch effect
    const glitchText = document.getElementById('glitchText');
    if (glitchText) {
        setInterval(() => {
            glitchText.classList.add('glitch-active');
            setTimeout(() => {
                glitchText.classList.remove('glitch-active');
            }, 200);
        }, 3000);
    }
    
    // Handle all challenge forms
    document.querySelectorAll('.answer-form').forEach(form => {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            const type = form.getAttribute('data-type');
            const inputs = form.querySelectorAll('input');
            const solutionDiv = form.querySelector('.solution');
            solutionDiv.style.display = 'none';
            let payload = {};
            if (type === 'final') {
                if (inputs.length < 2) return;
                payload = { type: 'final', username: inputs[0].value, password: inputs[1].value, session_id: challengeSessionId };
            } else {
                payload = { type, value: inputs[0].value, session_id: challengeSessionId };
            }
            try {
                const response = await fetch('/check_answer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();
                if (result.correct) {
                    // Hide the input fields and submit button, but keep the form visible for the success message
                    inputs.forEach(input => input.style.display = 'none');
                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (submitBtn) submitBtn.style.display = 'none';
                    
                    solutionDiv.innerHTML = '<strong>✅ Correct!</strong>';
                    solutionDiv.style.display = 'block';
                    
                    // Update progress using server-side count
                    updateProgress(result.challenge_count || 0);
                    
                    if (type === 'final') {
                        setTimeout(() => {
                            const credentialsSummary = document.getElementById('credentialsSummary');
                            if (credentialsSummary) {
                                credentialsSummary.style.display = 'block';
                                credentialsSummary.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 1000);
                    }
                } else {
                    inputs.forEach(input => {
                        input.value = '';
                        input.placeholder = 'Try again!';
                        input.classList.add('wrong');
                    });
                    setTimeout(() => inputs.forEach(input => input.classList.remove('wrong')), 800);
                }
            } catch (err) {
                solutionDiv.innerHTML = '<span style="color:red">Server error. Try again.</span>';
                solutionDiv.style.display = 'block';
            }
        });
    });
}

// Create authentication dialog
function createAuthDialog() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(3px);
    `;
    
    const dialog = document.createElement('div');
    dialog.style.cssText = `
        background: #1a1a1a;
        border: 2px solid #ff4444;
        border-radius: 8px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 0 30px rgba(255, 68, 68, 0.5);
        font-family: 'Courier New', monospace;
    `;
    
    dialog.innerHTML = `
        <h3 style="color: #ff4444; text-align: center; margin-bottom: 1rem; font-family: 'Courier New', monospace; font-size: 1.2rem;">
            🔐 AUTHENTICATION REQUIRED
        </h3>
        <p style="color: #fff; text-align: center; margin-bottom: 1.5rem; font-size: 0.9rem;">
            Enter your expedition credentials to access the forbidden sector:
        </p>
        <form id="authForm">
            <div style="margin-bottom: 1rem;">
                <label style="color: #ffaa44; display: block; margin-bottom: 0.5rem; font-family: 'Courier New', monospace; font-size: 0.9rem;">Username:</label>
                <input type="text" id="username" style="width: 100%; padding: 0.5rem; background: #000; color: #ff4444; border: 1px solid #ff4444; border-radius: 4px; font-family: 'Courier New', monospace;" required>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <label style="color: #ffaa44; display: block; margin-bottom: 0.5rem; font-family: 'Courier New', monospace; font-size: 0.9rem;">Password:</label>
                <input type="password" id="password" style="width: 100%; padding: 0.5rem; background: #000; color: #ff4444; border: 1px solid #ff4444; border-radius: 4px; font-family: 'Courier New', monospace;" required>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button type="submit" style="background: #ff4444; color: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; font-family: 'Courier New', monospace; font-weight: bold; font-size: 0.9rem;">ACCESS</button>
                <button type="button" id="cancelAuth" style="background: #666; color: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; font-family: 'Courier New', monospace; font-weight: bold; font-size: 0.9rem;">CANCEL</button>
            </div>
        </form>
        <div id="authError" style="color: #ff4444; text-align: center; margin-top: 1rem; display: none; font-size: 0.9rem;"></div>
    `;
    
    modal.appendChild(dialog);
    document.body.appendChild(modal);
    
    // Focus on username field
    setTimeout(() => document.getElementById('username').focus(), 100);
    
    // Handle form submission
    document.getElementById('authForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('authError');
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
        
        try {
            const response = await fetch('/authenticate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            if (!response.ok) {
                throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log('Authentication response:', result);
            
            if (result.authenticated) {
                console.log('Authentication successful, proceeding to unlock');
                // Store credentials for accessing protected content
                const credentials = { username, password };
                document.body.removeChild(modal);
                unlockHiddenSiteWithCredentials(credentials);
            } else {
                console.error('Authentication failed:', result);
                errorDiv.textContent = result.error || 'Invalid credentials - access denied';
                errorDiv.style.display = 'block';
                // Clear the form
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                document.getElementById('username').focus();
            }
        } catch (err) {
            console.error('Authentication error:', err);
            errorDiv.textContent = `Connection failed: ${err.message}`;
            errorDiv.style.display = 'block';
        }
    });
    
    // Handle cancel
    document.getElementById('cancelAuth').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Unlock the hidden site with credentials
function unlockHiddenSiteWithCredentials(credentials) {
    console.log('unlockHiddenSiteWithCredentials called - using direct authentication');
    
    if (!credentials || !credentials.username || !credentials.password) {
        console.error('Missing credentials');
        alert('Authentication error: Missing credentials.');
        return;
    }
    
    console.log('Loading authenticated content with direct credentials');
    loadAuthenticatedContent(credentials.username, credentials.password);
    
    // Play unlock sound effect
    playUnlockSound();
}

// Legacy function for backward compatibility (not used in new flow)
function unlockHiddenSite() {
    console.log('Legacy unlockHiddenSite called - should not be used');
    alert('Authentication error: Please try logging in again.');
}

// Load authenticated content with direct credential verification
async function loadAuthenticatedContent(username, password) {
    try {
        console.log('Posting credentials directly to authenticated endpoint');
        
        const response = await fetch('/content/authenticated', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        console.log('Response status:', response.status, response.statusText);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server error response:', errorText);
            
            if (response.status === 401) {
                alert('Invalid credentials - access denied');
                return;
            }
            if (response.status === 400) {
                alert(`Authentication error (400): ${errorText}`);
                return;
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Authenticated content loaded successfully');
        
        // Replace body content with new content
        document.body.innerHTML = data.html;
        
        // Add CSS link to head if not present
        if (!document.querySelector('link[href="style.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'style.css';
            document.head.appendChild(link);
        }
        
    } catch (error) {
        console.error('Failed to load authenticated content:', error);
        alert(`Failed to load authenticated content: ${error.message}`);
    }
}

function updateHintPeriodically() {
    const hints = [
        "Try type something. Anything...",
        "There might be ways to find assistance...",
        "Some commands might provide direction...",
        "If stuck, one might ask for assistance...",
        "The wise explorer knows when to seek aid...",
        "Remember, help is often just a command away...",
        "H.E.L.P. Hmm, just a thought...",
        "Four letters, one word, starts with H. Just saying...",
        "Maybe you could try look into script.js...",
        "HkddndEhdhdhLhdeahP. Just kidding, or am I?",
        "Come on, it's not that hard...",
        "The answer is RIGHT in front of you...",
        "The source is on GitHub, if you know where to look...",
        "In the shadows of the forbidden, light awaits...",
        "The key lies in the letters you type...",
        "Have you tried a common command?",
        "Four letters might unlock the way...",
        "It starts with H, what could it be?",
        "Commands that help are often short...",
        "The forbidden sector responds to certain words...",
        "Perhaps typing 'help' would work...",
        "Try pressing H, then E, then L, then P..."
    ];
    
    let currentHint = 0;
    
    setInterval(() => {
        if (hint && !document.body.innerHTML.includes('SCENE 65 UNLOCKED')) {
            hint.innerHTML = `<small>${hints[currentHint]}</small>`;
            currentHint = (currentHint + 1) % hints.length;
        }
    }, 2000);
}

// Play unlock sound effect (simple beep using Web Audio API)
function playUnlockSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        // Audio context might not be supported
        console.log('Audio not supported');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);
