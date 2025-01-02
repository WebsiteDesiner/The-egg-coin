const egg = document.getElementById('egg');
const countDisplay = document.getElementById('count');
let count = 0;
let isEggHatched = false;

egg.addEventListener('click', () => {
    if (!isEggHatched) {
        egg.classList.add('chick');
        isEggHatched = true;
        count++;
        countDisplay.textContent = count;
        
        // 1秒后重置鸡蛋
        setTimeout(() => {
            egg.classList.remove('chick');
            isEggHatched = false;
        }, 1000);
    }
}); 

// 添加点击复制功能
document.getElementById('contract-address').addEventListener('click', async function() {
    const text = this.textContent;
    try {
        await navigator.clipboard.writeText(text);
        
        // 显示复制成功的临时提示
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => {
            this.textContent = originalText;
        }, 1000);
        
    } catch (err) {
        console.error('Failed to copy:', err);
    }
});

// 设置合约地址
function setContractAddress(address) {
    const contractAddressElement = document.getElementById('contract-address');
    contractAddressElement.textContent = address;
}

// 设置实际的合约地址
setContractAddress('0x003c823a9d3e64c2407d8d698ff0b2de37559700'); 