// inject.js 주입
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
(document.head || document.documentElement).appendChild(script);

function injectButton() {
    // 1. 파일 아이콘이 들어있는 우측 메뉴 영역 찾기
    const rightMenu = document.querySelector('.entryNmMenuRight');
    
    if (rightMenu && !document.getElementById('entry-cleaner-btn')) {
        // 버튼 생성
        const cleanBtn = document.createElement('div');
        cleanBtn.id = 'entry-cleaner-btn';
        cleanBtn.innerText = "🧹 블록 청소";
        
        // 엔트리 상단 바와 어울리는 스타일
        cleanBtn.style = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            padding: 0 12px;
            margin-right: 10px;
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            border-radius: 4px;
            font-size: 13px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s;
        `;

        // 마우스 호버 효과
        cleanBtn.onmouseover = () => cleanBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        cleanBtn.onmouseout = () => cleanBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';

        // 클릭 시 신호 보내기
        cleanBtn.onclick = () => {
            window.postMessage({ type: 'ENTRY_CLEAN_BLOCKS' }, '*');
        };

        // 파일 아이콘(첫 번째 자식) 앞에 삽입
        rightMenu.insertBefore(cleanBtn, rightMenu.firstChild);
    }
}

// 요소 감시 (엔트리가 동적으로 메뉴를 그려내기 때문)
const observer = new MutationObserver(injectButton);
observer.observe(document.body, { childList: true, subtree: true });
