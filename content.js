// inject.js 주입 (이 부분은 동일)
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
(document.head || document.documentElement).appendChild(script);

function createFloatingButton() {
    if (document.getElementById('entry-cleaner-btn')) return;

    const btn = document.createElement('div');
    btn.id = 'entry-cleaner-btn';
    btn.innerText = "🧹 블록 청소";
    
    // 스타일: 화면 오른쪽 하단에 고정
    btn.style = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        width: 100px;
        height: 40px;
        background-color: #6c5ce7;
        color: white;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: transform 0.2s, background 0.2s;
    `;

    // 마우스 올렸을 때 효과
    btn.onmouseover = () => {
        btn.style.transform = "scale(1.1)";
        btn.style.backgroundColor = "#a29bfe";
    };
    btn.onmouseout = () => {
        btn.style.transform = "scale(1)";
        btn.style.backgroundColor = "#6c5ce7";
    };

    // 클릭 이벤트
    btn.onclick = () => {
        window.postMessage({ type: 'ENTRY_CLEAN_BLOCKS' }, '*');
    };

    document.body.appendChild(btn);
}

// 페이지 로드 시 버튼 생성
if (document.readyState === 'complete') {
    createFloatingButton();
} else {
    window.addEventListener('load', createFloatingButton);
}

// 혹시 모르니 주기적으로 체크해서 버튼이 없으면 다시 생성
setInterval(createFloatingButton, 2000);
