// 1. inject.js 주입
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
(document.head || document.documentElement).appendChild(script);

// 2. 버튼 생성 및 상단바 삽입 함수
function injectButton() {
    // 엔트리 상단 메뉴의 왼쪽 영역을 찾습니다.
    const menuList = document.querySelector('.entryNmMenuLeft > ul');
    
    if (menuList && !document.getElementById('entry-cleaner-btn')) {
        const li = document.createElement('li');
        li.className = 'entryMenuItem'; // 엔트리 기본 스타일 상속
        
        const a = document.createElement('a');
        a.id = 'entry-cleaner-btn';
        a.innerText = "🧹 블록 청소";
        a.style.cursor = 'pointer';
        a.style.color = '#fff';
        a.style.padding = '0 15px';
        a.style.fontWeight = 'bold';
        a.style.display = 'flex';
        a.style.alignItems = 'center';

        a.onclick = (e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('START_CLEANING'));
        };

        li.appendChild(a);
        menuList.appendChild(li);
        console.log("청소 버튼이 상단바에 추가되었습니다.");
    }
}

// 엔트리는 리액트로 그려지기 때문에 요소가 나타날 때까지 감시합니다.
const observer = new MutationObserver(() => {
    injectButton();
});

observer.observe(document.body, { childList: true, subtree: true });
