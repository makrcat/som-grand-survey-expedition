
// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 显示悖论选择模态框
    document.getElementById('paradoxModal').style.display = 'flex';
    
    // 绑定事件
    document.getElementById('submitParadox').addEventListener('click', submitParadox);
    document.getElementById('pufferfish').addEventListener('click', togglePufferfishDialogue);
    document.getElementById('closeAchievement').addEventListener('click', closeAchievement);
    
    // 30秒后触发逻辑风暴
    setTimeout(triggerLogicStorm, 30000);
    
    // 跟踪页面刷新次数
    trackRefreshCount();
    
    // 初始化成就系统
    initAchievementSystem();
    
    // 启动动态标签页标题
    startDynamicPageTitle();
});

// 提交悖论选择
function submitParadox() {
    const selectedOption = document.querySelector('input[name="paradox"]:checked');
    
    if (!selectedOption) {
        alert("Please select an option to enter the island!");
        return;
    }
    
    // 隐藏模态框
    document.getElementById('paradoxModal').style.display = 'none';
    
    if (selectedOption.value === 'option3') {
        // Correct answer
        showAchievement('Paradox Master', 'You have mastered the mysteries of anti-anti logic! Welcome to Anti-Anti Ireland Island!');
        
        // 触发彩虹效果
        document.body.classList.add('rainbow-effect');
        
        // 播放音频（模拟）
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            playRickrollMelody(audioContext);
        } catch (e) {
            console.log("Audio context not supported");
        }
    } else {
        // Wrong answer
        showAchievement('Logic Apprentice', 'Your answer doesn\'t fully conform to anti-anti logic, but welcome to explore this island!');
    }
}

// 切换河豚对话显示
function togglePufferfishDialogue() {
    const dialogue = document.getElementById('pufferfishDialogue');
    dialogue.style.display = dialogue.style.display === 'block' ? 'none' : 'block';
}

// 触发逻辑风暴
function triggerLogicStorm() {
    document.body.classList.add('logic-storm');
    showAchievement('Logic Storm', 'You triggered a logic storm! Reality begins to split into contradictory skies...');
}

// 播放Never Gonna Give You Up旋律（简化版）
function playRickrollMelody(audioContext) {
    // 这是一个简化的实现，实际项目中可以使用完整的音频文件
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 440;
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    
    setTimeout(() => {
        oscillator.stop();
    }, 1000);
}

// 显示成就弹窗
function showAchievement(title, description) {
    const achievement = document.getElementById('achievement');
    document.getElementById('achievementText').textContent = `${title}: ${description}`;
    achievement.classList.add('show');
}

// 关闭成就弹窗
function closeAchievement() {
    document.getElementById('achievement').classList.remove('show');
}



// 跟踪页面刷新次数
function trackRefreshCount() {
    let refreshCount = localStorage.getItem('antiAntiIrelandRefreshCount') || 0;
    refreshCount = parseInt(refreshCount) + 1;
    localStorage.setItem('antiAntiIrelandRefreshCount', refreshCount);
    
    if (refreshCount >= 3) {
        // 触发隐藏彩蛋
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #169b62 0%, #ffffff 50%, #ff883e 100%)';
            showAchievement('Anti-Anti-Anti Ireland Elder', 'Persistent behavior detected! You have been promoted to Anti-Anti-Anti Ireland Elder');
        }, 2000);
    }
}

// 动态雨滴系统
class RainSystem {
    constructor() {
        this.skyMiddle = document.querySelector('.sky-middle');
        this.raindrops = [];
        this.isActive = false;
        this.rainSymbols = ['💧'];
        
        // 启动雨滴系统
        this.start();
    }
    
    start() {
        if (!this.skyMiddle) return;
        
        this.isActive = true;
        this.createRaindrops();
        
        // 定期创建新雨滴
        this.rainInterval = setInterval(() => {
            if (this.isActive) {
                this.createRaindrops();
            }
        }, 150); // 每150ms创建一批新雨滴
    }
    
    createRaindrops() {
        const containerRect = this.skyMiddle.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
        // 每次创建3-8个随机雨滴
        const dropCount = Math.floor(Math.random() * 6) + 3;
        
        for (let i = 0; i < dropCount; i++) {
            this.createSingleRaindrop(containerWidth, containerHeight);
        }
    }
    
    createSingleRaindrop(containerWidth, containerHeight) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        
        // 随机选择雨滴符号
        const symbol = this.rainSymbols[Math.floor(Math.random() * this.rainSymbols.length)];
        raindrop.textContent = symbol;
        
        // 随机大小
        const sizes = ['small', '', 'large'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        if (size) raindrop.classList.add(size);
        
        // 随机水平位置
        const xPosition = Math.random() * (containerWidth - 20);
        raindrop.style.left = xPosition + 'px';
        raindrop.style.top = '-20px';
        
        // 随机下落时间 (1-4秒)
        const fallDuration = (Math.random() * 3 + 1).toFixed(2);
        raindrop.style.animationDuration = fallDuration + 's';
        
        // 随机水平漂移
        const drift = (Math.random() - 0.5) * 30; // -15px to +15px
        raindrop.style.setProperty('--drift', drift + 'px');
        
        // 添加到天空中
        this.skyMiddle.appendChild(raindrop);
        this.raindrops.push(raindrop);
        
        // 动画结束后移除雨滴
        raindrop.addEventListener('animationend', () => {
            this.removeRaindrop(raindrop);
        });
        
        // 防止雨滴堆积过多
        if (this.raindrops.length > 100) {
            const oldDrop = this.raindrops.shift();
            if (oldDrop && oldDrop.parentNode) {
                oldDrop.parentNode.removeChild(oldDrop);
            }
        }
    }
    
    removeRaindrop(raindrop) {
        if (raindrop && raindrop.parentNode) {
            raindrop.parentNode.removeChild(raindrop);
            const index = this.raindrops.indexOf(raindrop);
            if (index > -1) {
                this.raindrops.splice(index, 1);
            }
        }
    }
    
    stop() {
        this.isActive = false;
        if (this.rainInterval) {
            clearInterval(this.rainInterval);
        }
        
        // 清除所有雨滴
        this.raindrops.forEach(drop => this.removeRaindrop(drop));
        this.raindrops = [];
    }
}

// 混沌色块系统
class ChaosBlockSystem {
    constructor() {
        this.skyBottom = document.querySelector('.sky-bottom');
        this.chaosBlocks = [];
        this.isActive = false;
        this.shapes = ['circle', 'square', 'diamond', 'triangle', 'hexagon', 'star'];
        
        // 启动混沌色块系统
        this.start();
    }
    
    start() {
        if (!this.skyBottom) return;
        
        this.isActive = true;
        this.scheduleNextBlock();
    }
    
    scheduleNextBlock() {
        if (!this.isActive) return;
        
        // 随机间隔时间 1-5000ms
        const interval = Math.floor(Math.random() * 100) + 1;
        
        setTimeout(() => {
            if (this.isActive) {
                this.createChaosBlock();
                this.scheduleNextBlock();
            }
        }, interval);
    }
    
    createChaosBlock() {
        const containerRect = this.skyBottom.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
        const block = document.createElement('div');
        block.className = 'chaos-block';
        
        // 随机形状
        const shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
        if (shape !== 'circle') {
            block.classList.add(shape);
        }
        
        // 随机颜色
        const colors = [
            '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
            '#ff8000', '#8000ff', '#ff0080', '#80ff00', '#0080ff', '#ff8080',
            '#80ff80', '#8080ff', '#ffff80', '#ff80ff', '#80ffff', '#ff4040',
            '#40ff40', '#4040ff', '#ffaa00', '#aa00ff', '#00aaff', '#ff6600',
            '#6600ff', '#00ff66', '#ff0066', '#66ff00', '#0066ff', '#ff3366',
            '#33ff66', '#6633ff', '#ff6633', '#66ff33', '#3366ff'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机大小 10-80px
        const size = Math.floor(Math.random() * 70) + 10;
        
        // 随机位置
        const x = Math.random() * (containerWidth - size);
        const y = Math.random() * (containerHeight - size);
        
        // 随机透明度
        const maxOpacity = (Math.random() * 0.6 + 0.2).toFixed(2); // 0.2-0.8
        
        // 随机存在时间 1-3000ms
        const duration = Math.floor(Math.random() * 2999) + 1;
        
        // 设置样式
        block.style.left = x + 'px';
        block.style.top = y + 'px';
        block.style.width = size + 'px';
        block.style.height = size + 'px';
        block.style.backgroundColor = color;
        block.style.animationDuration = duration + 'ms';
        block.style.setProperty('--color', color);
        block.style.setProperty('--size', (size / 2) + 'px');
        block.style.setProperty('--max-opacity', maxOpacity);
        
        // 特殊形状处理
        if (shape === 'triangle') {
            block.style.left = (x + size/2) + 'px';
            block.style.top = (y + size/4) + 'px';
        }
        
        // 添加到天空中
        this.skyBottom.appendChild(block);
        this.chaosBlocks.push(block);
        
        // 动画结束后移除
        block.addEventListener('animationend', () => {
            this.removeChaosBlock(block);
        });
        
        // 防止色块过多堆积
        if (this.chaosBlocks.length > 50) {
            const oldBlock = this.chaosBlocks.shift();
            if (oldBlock && oldBlock.parentNode) {
                oldBlock.parentNode.removeChild(oldBlock);
            }
        }
    }
    
    removeChaosBlock(block) {
        if (block && block.parentNode) {
            block.parentNode.removeChild(block);
            const index = this.chaosBlocks.indexOf(block);
            if (index > -1) {
                this.chaosBlocks.splice(index, 1);
            }
        }
    }
    
    stop() {
        this.isActive = false;
        
        // 清除所有色块
        this.chaosBlocks.forEach(block => this.removeChaosBlock(block));
        this.chaosBlocks = [];
    }
    
    // 增强混沌效果的方法
    intensifyChaos() {
        // 创建多个同时出现的色块
        const burstCount = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                if (this.isActive) {
                    this.createChaosBlock();
                }
            }, i * 100);
        }
    }
}

// 渡鸦逻辑符号系统
class RavenLogicSystem {
    constructor() {
        this.raven = document.getElementById('floating-raven');
        this.symbols = ['→', '⇄', '⊻'];
        this.currentSymbolIndex = 0;
        this.truthTableViewCount = parseInt(localStorage.getItem('truthTableViews') || '0');
        this.truthTables = {
            '→': {
                name: 'Conditional (Implication)',
                table: [
                    ['P', 'Q', 'P→Q'],
                    ['T', 'T', 'T'],
                    ['T', 'F', 'F'],
                    ['F', 'T', 'T'],
                    ['F', 'F', 'T']
                ]
            },
            '⇄': {
                name: 'Biconditional (Equivalence)',
                table: [
                    ['P', 'Q', 'P⇄Q'],
                    ['T', 'T', 'T'],
                    ['T', 'F', 'F'],
                    ['F', 'T', 'F'],
                    ['F', 'F', 'T']
                ]
            },
            '⊻': {
                name: 'Exclusive OR (XOR)',
                table: [
                    ['P', 'Q', 'P⊻Q'],
                    ['T', 'T', 'F'],
                    ['T', 'F', 'T'],
                    ['F', 'T', 'T'],
                    ['F', 'F', 'F']
                ]
            }
        };
        
        this.start();
    }
    
    start() {
        // 每20秒更换逻辑符号
        setInterval(() => {
            this.changeSymbol();
        }, 20000);
    }
    
    changeSymbol() {
        this.currentSymbolIndex = (this.currentSymbolIndex + 1) % this.symbols.length;
        const newSymbol = this.symbols[this.currentSymbolIndex];
        if (this.raven) {
            this.raven.setAttribute('data-symbol', newSymbol);
        }
    }
    
    getCurrentSymbol() {
        return this.symbols[this.currentSymbolIndex];
    }
    
    getTruthTable(symbol) {
        return this.truthTables[symbol];
    }
    
    incrementTruthTableView() {
        this.truthTableViewCount++;
        localStorage.setItem('truthTableViews', this.truthTableViewCount.toString());
        
        // 检查累积成就
        this.checkCumulativeAchievements();
    }
    
    checkCumulativeAchievements() {
        const count = this.truthTableViewCount;
        
        if (count === 3) {
            setTimeout(() => {
                showAchievement('Logic Beginner', 'You have viewed 3 truth tables! Your journey of logical learning officially begins.');
            }, 800);
        } else if (count === 5) {
            setTimeout(() => {
                showAchievement('Symbol Collector', 'Collected knowledge of 5 logical symbols! Your understanding of logic grows deeper.');
            }, 800);
        } else if (count === 10) {
            setTimeout(() => {
                showAchievement('Logic Master', 'Viewed 10 truth tables! You are now an expert of the Logic Paradox Island.');
            }, 800);
        } else if (count === 20) {
            setTimeout(() => {
                showAchievement('Truth Seeker', '20 times of deep research! Your passion for logic is admirable.');
            }, 800);
        }
    }
}

// 羽毛掉落功能
function dropFeather(event) {
    const raven = event.target;
    const ravenRect = raven.getBoundingClientRect();
    
    // 创建羽毛元素
    const feather = document.createElement('div');
    feather.className = 'feather';
    feather.textContent = '🪶';
    feather.style.left = (ravenRect.left + ravenRect.width / 2) + 'px';
    feather.style.top = (ravenRect.top + ravenRect.height / 2) + 'px';
    
    // 添加点击事件显示真理值表
    feather.addEventListener('click', () => {
        const currentSymbol = window.ravenLogicSystem.getCurrentSymbol();
        showTruthTable(currentSymbol);
        feather.remove();
    });
    
    // 添加到页面
    document.body.appendChild(feather);
    
    // 3秒后自动移除羽毛
    setTimeout(() => {
        if (feather.parentNode) {
            feather.remove();
        }
    }, 3000);
}

// 显示真理值表
function showTruthTable(symbol) {
    const truthTableData = window.ravenLogicSystem.getTruthTable(symbol);
    
    // 增加查看次数
    window.ravenLogicSystem.incrementTruthTableView();
    
    // 创建真理值表模态框
    const modal = document.createElement('div');
    modal.className = 'truth-table show';
    
    let tableHTML = `
        <button class="close-btn" onclick="closeTruthTable(this)">×</button>
        <h3>${truthTableData.name}</h3>
        <table>
    `;
    
    truthTableData.table.forEach((row, index) => {
        if (index === 0) {
            tableHTML += '<tr>';
            row.forEach(cell => {
                tableHTML += `<th>${cell}</th>`;
            });
            tableHTML += '</tr>';
        } else {
            tableHTML += '<tr>';
            row.forEach(cell => {
                tableHTML += `<td>${cell}</td>`;
            });
            tableHTML += '</tr>';
        }
    });
    
    tableHTML += '</table>';
    tableHTML += `<p style="margin-top: 10px; font-size: 0.8rem; color: #ccc; text-align: center;">
        Truth table easter egg from Logic Paradox Island!
    </p>`;
    
    modal.innerHTML = tableHTML;
    document.body.appendChild(modal);
    
    // 5秒后自动关闭
    setTimeout(() => {
        if (modal.parentNode) {
            const symbolElement = modal.querySelector('h3');
            const symbolName = symbolElement ? symbolElement.textContent : '逻辑符号';
            
            modal.remove();
            
            // 自动关闭也显示成就（稍微不同的成就）
            const autoCloseAchievements = [
                {
                    title: 'Deep Thinker',
                    description: `You carefully studied all content of ${symbolName}! Time witnessed your dedication.`
                },
                {
                    title: 'Logic Contemplator',
                    description: `Contemplated deeply in ${symbolName}! Truth needs time to digest.`
                },
                {
                    title: 'Knowledge Absorber',
                    description: `Completely absorbed the wisdom of ${symbolName}! Every second of thinking is precious.`
                },
                {
                    title: 'Patient Scholar',
                    description: `Patiently learned ${symbolName}! In the anti-anti world, slow is fast.`
                }
            ];
            
            const randomAchievement = autoCloseAchievements[Math.floor(Math.random() * autoCloseAchievements.length)];
            
            setTimeout(() => {
                showAchievement(randomAchievement.title, randomAchievement.description);
            }, 200);
        }
    }, 5000);
}

// 关闭真理值表
function closeTruthTable(button) {
    const modal = button.parentNode;
    const symbolElement = modal.querySelector('h3');
    const symbolName = symbolElement ? symbolElement.textContent : 'Logic Symbol';
    
    modal.remove();
    
    // Pop up achievement notification
    const achievements = [
        {
            title: 'Logic Scholar',
            description: `You deeply studied ${symbolName}! Truth shines brilliantly in paradoxes.`
        },
        {
            title: 'Truth Explorer', 
            description: `Through ${symbolName} you glimpsed the essence of logic! The anti-anti world opens its doors to you.`
        },
        {
            title: 'Paradox Analyst',
            description: `Mastered the mysteries of ${symbolName}! You are becoming an expert of logical paradoxes.`
        },
        {
            title: 'Symbol Hunter',
            description: `Collected knowledge of ${symbolName}! Each symbol is a key to truth.`
        }
    ];
    
    // Randomly select an achievement
    const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
    
    // Delay showing achievement to let user see table closing animation
    setTimeout(() => {
        showAchievement(randomAchievement.title, randomAchievement.description);
    }, 300);
}

// 页面加载后启动所有系统
document.addEventListener('DOMContentLoaded', function() {
    // 延迟启动系统，确保DOM完全加载
    setTimeout(() => {
        window.rainSystem = new RainSystem();
        window.chaosBlockSystem = new ChaosBlockSystem();
        window.ravenLogicSystem = new RavenLogicSystem();
        
        // 每30秒触发一次混沌爆发
        setInterval(() => {
            if (window.chaosBlockSystem && window.chaosBlockSystem.isActive) {
                window.chaosBlockSystem.intensifyChaos();
            }
        }, 30000);
    }, 1000);
});

// 成就系统
const AchievementSystem = {
    // 定义所有可能的成就
    achievements: {
        'paradox_master': { name: 'Paradox Master', unlocked: false },
        'logic_apprentice': { name: 'Logic Apprentice', unlocked: false },
        'logic_storm': { name: 'Logic Storm', unlocked: false },
        'elder': { name: 'Anti-Anti-Anti Ireland Elder', unlocked: false },
        'logic_intro': { name: 'Logic Beginner', unlocked: false },
        'symbol_collector': { name: 'Symbol Collector', unlocked: false },
        'logic_master': { name: 'Logic Master', unlocked: false },
        'truth_seeker': { name: 'Truth Seeker', unlocked: false }
    },

    // 初始化系统
    init() {
        this.loadAchievements();
        this.updateCounter();
    },

    // 从localStorage加载已解锁的成就
    loadAchievements() {
        const savedAchievements = localStorage.getItem('antiAntiIrelandAchievements');
        if (savedAchievements) {
            const saved = JSON.parse(savedAchievements);
            Object.keys(saved).forEach(key => {
                if (this.achievements[key]) {
                    this.achievements[key].unlocked = saved[key];
                }
            });
        }
    },

    // 保存成就到localStorage
    saveAchievements() {
        const toSave = {};
        Object.keys(this.achievements).forEach(key => {
            toSave[key] = this.achievements[key].unlocked;
        });
        localStorage.setItem('antiAntiIrelandAchievements', JSON.stringify(toSave));
    },

    // 解锁成就
    unlock(achievementKey) {
        if (this.achievements[achievementKey] && !this.achievements[achievementKey].unlocked) {
            this.achievements[achievementKey].unlocked = true;
            this.saveAchievements();
            this.updateCounter();
            return true; // 新解锁
        }
        return false; // 已经解锁或不存在
    },

    // 更新计数器显示
    updateCounter() {
        const total = Object.keys(this.achievements).length;
        const discovered = Object.values(this.achievements).filter(a => a.unlocked).length;
        
        document.getElementById('totalCount').textContent = total;
        document.getElementById('discoveredCount').textContent = discovered;
        
        // 添加动画效果
        const counter = document.getElementById('achievementCounter');
        if (discovered > 0) {
            counter.style.animation = 'counterGlow 3s ease-in-out infinite';
        }
    },

    // 获取成就统计
    getStats() {
        const total = Object.keys(this.achievements).length;
        const discovered = Object.values(this.achievements).filter(a => a.unlocked).length;
        return { total, discovered };
    }
};

// 初始化成就系统
function initAchievementSystem() {
    AchievementSystem.init();
}

// 修改原有的showAchievement函数来集成成就系统
function showAchievement(title, description) {
    // 先显示成就弹窗
    const achievement = document.getElementById('achievement');
    document.getElementById('achievementText').textContent = `${title}: ${description}`;
    achievement.classList.add('show');
    
    // 然后更新成就系统计数
    const achievementMap = {
        'Paradox Master': 'paradox_master',
        'Logic Apprentice': 'logic_apprentice', 
        'Logic Storm': 'logic_storm',
        'Anti-Anti-Anti Ireland Elder': 'elder',
        'Logic Beginner': 'logic_intro',
        'Symbol Collector': 'symbol_collector',
        'Logic Master': 'logic_master',
        'Truth Seeker': 'truth_seeker',
        'Anti-Anti Warrior': 'contradiction_warrior'
    };

    const achievementKey = achievementMap[title];
    if (achievementKey) {
        AchievementSystem.unlock(achievementKey);
    }
}

// 矛盾路标点击处理
function handleContradictionClick() {
    showAchievement('Anti-Anti Warrior', 'You violated the "Don\'t Click" instruction, but gained an achievement for it!');
    
    // Visual feedback after button click
    const button = document.getElementById('contradictionSign');
    button.style.background = 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)';
    button.textContent = 'Clicked!';
    button.style.transform = 'rotate(-3deg) scale(1.1)';
    
    // Restore original state after 3 seconds
    setTimeout(() => {
        button.style.background = 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)';
        button.textContent = 'Don\'t Click';
        button.style.transform = 'rotate(3deg) scale(1)';
    }, 3000);
}

// 动态浏览器标签页标题系统
function startDynamicPageTitle() {
    const baseTitles = [
        'This beach is yellow | Anti-Anti Ireland Island',
        'This beach is not yellow | Anti-Anti Ireland Island', 
        'This beach is not not yellow | Anti-Anti Ireland Island',
        'This beach is not not not yellow | Anti-Anti Ireland Island',
        'This beach is not yellow | Anti-Anti Ireland Island',
        'This beach is not is yellow | Anti-Anti Ireland Island',
        'This beach is is yellow | Anti-Anti Ireland Island',
        'This beach is not not yellow | Anti-Anti Ireland Island'
    ];
    
    let currentIndex = 0;
    
    function updatePageTitle() {
        document.title = baseTitles[currentIndex];
        currentIndex = (currentIndex + 1) % baseTitles.length;
    }
    
    // 每3秒更换一次标签页标题
    setInterval(updatePageTitle, 3000);
    
    // 立即执行一次
    updatePageTitle();
}

// 更新成就系统以包含新成就
AchievementSystem.achievements['contradiction_warrior'] = { name: 'Anti-Anti Warrior', unlocked: false };