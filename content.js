// 1. 버튼 생성 및 UI 설정 (우측 하단으로 이동)
const setupCleanButton = () => {
    // 중복 생성 방지
    if (document.getElementById('entry-cleaner-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'entry-cleaner-btn';
    btn.innerText = "쓸모없는 블록 삭제";
    
    // 위치를 아래쪽(bottom)으로 수정
    btn.style.cssText = `
        position: fixed; 
        bottom: 20px; 
        right: 20px; 
        z-index: 9999; 
        padding: 12px 16px; 
        background: #00bb33; 
        color: white; 
        border: none; 
        border-radius: 8px; 
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(btn);

    btn.onclick = () => {
        if (confirm("연결되지 않은(회색 처리된) 블록들을 모두 삭제할까요?")) {
            deleteUnusedBlocks();
        }
    };
};

// 2. 블록 삭제 핵심 로직
const deleteUnusedBlocks = () => {
    // Entry 객체 존재 여부 재확인
    if (typeof Entry !== 'undefined' && Entry.mainWorkspace) {
        const board = Entry.mainWorkspace.board;
        const code = board.code;
        const threads = code.getThreads(); 

        let count = 0;
        threads.forEach(thread => {
            const firstBlock = thread.getFirstBlock();
            
            // 시작 블록 없이 떠 있는 블록인지 체크
            if (firstBlock && !isStartingBlock(firstBlock)) {
                thread.destroy(); 
                count++;
            }
        });
        
        board.render();
        alert(`${count}개의 블록 묶음을 정리했습니다!`);
    } else {
        alert("아직 엔트리 워크스페이스가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
    }
};

// 시작 블록 판별 함수
const isStartingBlock = (block) => {
    const type = block.type;
    // 엔트리 이벤트 블록들의 일반적인 접두어
    return type.startsWith('when_') || type.includes('start') || type.includes('clicked');
};

// 3. 엔트리 엔진이 완전히 로드될 때까지 반복 확인 (최대 10초)
const checkEntryLoaded = setInterval(() => {
    if (typeof Entry !== 'undefined' && Entry.mainWorkspace) {
        setupCleanButton();
        clearInterval(checkEntryLoaded); // 로드 완료 시 반복 멈춤
    }
}, 1000);
