// inject.js 주입
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
(document.head || document.documentElement).appendChild(script);

// 버튼 생성 함수
function createCleanButton() {
    // 이미 버튼이 있다면 중복 생성 방지
    if (document.getElementById('entry-cleaner-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'entry-cleaner-btn';
    btn.innerText = "🧹 블록 청소";
    // 엔트리 테마와 어울리는 스타일
    btn.style = `
        position: fixed; 
        bottom: 80px; 
        right: 30px; 
        z-index: 999999; 
        padding: 12px 20px; 
        background: #50e3c2; 
        color: #333; 
        border: 2px solid #333; 
        border-radius: 30px; 
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;

    btn.onclick = () => {
        console.log("청소 버튼 클릭됨!");
        // inject.js로 신호 보내기
        window.dispatchEvent(new CustomEvent('START_CLEANING'));
    };

    document.body.appendChild(btn);
}

// 페이지 로딩 완료 후 버튼 생성 시도
if (document.readyState === 'complete') {
    createCleanButton();
} else {
    window.addEventListener('load', createCleanButton);
}
