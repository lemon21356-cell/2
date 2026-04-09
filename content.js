// inject.js를 실제 페이지에 주입
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
(document.head || document.documentElement).appendChild(script);

// UI 버튼 만들기 (엔트리 상단 메뉴바 등에 추가)
window.addEventListener('load', () => {
    const interval = setInterval(() => {
        const menuBar = document.querySelector('.entryWorkspaceBoard'); // 버튼을 놓을 적절한 위치
        if (menuBar) {
            clearInterval(interval);
            const cleanBtn = document.createElement('button');
            cleanBtn.innerText = "🧹 블록 청소";
            cleanBtn.style = "position:fixed; bottom:20px; right:20px; z-index:9999; padding:10px; background:#6c5ce7; color:white; border:none; border-radius:5px; cursor:pointer;";
            
            cleanBtn.onclick = () => {
                // inject.js에 정의된 함수 호출
                window.dispatchEvent(new CustomEvent('START_CLEANING'));
            };
            document.body.appendChild(cleanBtn);
        }
    }, 1000);
});
