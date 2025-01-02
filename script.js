document.addEventListener('DOMContentLoaded', function() {
    const counterDiv = document.querySelector('.counter');
    counterDiv.innerHTML = 'Market Cap: <span id="count">$0</span>';
    
    const egg = document.getElementById('egg');
    let marketCap = 0;
    const contractAddress = '0x003c823a9d3e64c2407d8d698ff0b2de37559700';

    // 更新显示的市值
    function updateDisplay(marketCap) {
        const countDisplay = document.getElementById('count');
        if (countDisplay) {
            const formattedMarketCap = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(marketCap);
            
            countDisplay.textContent = formattedMarketCap;
            countDisplay.classList.add('update-flash');
            setTimeout(() => {
                countDisplay.classList.remove('update-flash');
            }, 500);

            // 更新等级显示
            if (marketCap >= 200000) {
                counterDiv.setAttribute('data-level', 'PHOENIX');
            } else if (marketCap >= 100000) {
                counterDiv.setAttribute('data-level', 'LEGENDARY');
            } else if (marketCap >= 50000) {
                counterDiv.setAttribute('data-level', 'RARE');
            } else if (marketCap >= 100000) {
                counterDiv.setAttribute('data-level', 'UNCOMMON');
            } else {
                counterDiv.setAttribute('data-level', 'COMMON');
            }

            // 根据市值添加破壳效果
            egg.classList.remove('crack-1', 'crack-2', 'crack-3');
            if (marketCap >= 150000) {
                egg.classList.add('crack-3');
            } else if (marketCap >= 100000) {
                egg.classList.add('crack-2');
            } else if (marketCap >= 50000) {
                egg.classList.add('crack-1');
            }
        }
    }

    // 从 DexScreener 获取市值
    async function fetchMarketCap() {
        try {
            const response = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`);
            console.log('DexScreener Response:', response.data);
            
            if (response.data && response.data.pairs && response.data.pairs.length > 0) {
                const pair = response.data.pairs[0];
                if (pair.fdv) {
                    marketCap = parseFloat(pair.fdv);
                    console.log('New market cap:', marketCap);
                    updateDisplay(marketCap);
                }
            }
        } catch (error) {
            console.error('Error fetching market cap:', error);
        }
    }

    // 创建羽毛效果
    function createFeathers() {
        const container = document.querySelector('.feathers-container');
        if (!container) return;

        function createFeather() {
            const feather = document.createElement('div');
            feather.className = 'feather';
            
            // 随机水平位置
            const startPositionLeft = Math.random() * window.innerWidth;
            feather.style.left = `${startPositionLeft}px`;
            
            // 随机大小
            const size = 10 + Math.random() * 10;
            feather.style.width = `${size}px`;
            feather.style.height = `${size * 2}px`;
            
            // 随机动画时间
            const fallDuration = 4 + Math.random() * 3;
            const swingDuration = 2 + Math.random() * 1;
            
            // 设置动画
            feather.style.animation = `
                featherFall ${fallDuration}s linear,
                featherSwing ${swingDuration}s ease-in-out infinite
            `;
            
            container.appendChild(feather);
            
            // 动画结束后移除羽毛
            setTimeout(() => {
                feather.remove();
            }, fallDuration * 1000);
        }
        
        // 每100ms创建一个新羽毛
        setInterval(createFeather, 100);
        
        // 初始创建一批羽毛
        for (let i = 0; i < 30; i++) {
            setTimeout(createFeather, i * 50);
        }
    }

    // 添加合约地址复制功能
    const contractAddressElement = document.getElementById('contract-address');
    if (contractAddressElement) {
        contractAddressElement.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(this.textContent);
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    }

    // 立即获取一次市值
    fetchMarketCap();
    
    // 每10秒更新一次市值
    setInterval(fetchMarketCap, 10000);

    // 启动羽毛效果
    createFeathers();
}); 