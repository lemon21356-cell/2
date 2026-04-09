// inject.js 주입
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
(document.head || document.documentElement).appendChild(script);

function injectButton() {
    // 1. 파일(저장) 버튼이 포함된 상단 우측 메뉴 영역을 찾습니다.
    // 엔트리 업데이트에 따라 클래스명이 바뀔 수 있어 여러 후보를 넣었습니다.
    const rightMenu = document.querySelector('.entryNmMenuRight') || 
                      document.querySelector('[class*="entryNmMenuRight"]');
    
    // 버튼이 이미 있거나 메뉴를 못 찾으면 중단
    if (!rightMenu || document.getElementById('entry-cleaner-btn')) return;

    // 2. 버튼 생성
    const cleanBtn = document.createElement('div');
    cleanBtn.id = 'entry-cleaner-btn';
    cleanBtn.innerText = "🧹 블록 청소";
    
    // 스타일: 눈에 확 띄도록 배경색을 약간 넣었습니다.
    cleanBtn.style = `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        padding: 0 10px;
        margin-right: 8px;
        background-color: #ff5e5e; /* 눈에 띄게 빨간색 계열로 우선 테스트 */
        color: white;
        border-radius: 6px;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        z-index: 999999;
    `;

    cleanBtn.onclick = (e) => {
        e.stopPropagation();
        window.postMessage({ type: 'ENTRY_CLEAN_BLOCKS' }, '*');
    };

    // 3. 맨 앞에 삽입
    rightMenu.prepend(cleanBtn);
    console.log("청소 버튼 삽입 시도 성공!");
}

// 주기적으로 확인 (MutationObserver가 놓치는 경우 대비)
setInterval(injectButton, 1000);
