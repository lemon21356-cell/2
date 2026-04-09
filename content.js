// 버튼 생성 및 UI 추가
const setupCleanButton = () => {
    const btn = document.createElement('button');
    btn.innerText = "쓸모없는 블록 삭제";
    btn.style.cssText = "position: fixed; top: 10px; right: 10px; z-index: 9999; padding: 10px; background: #00bb33; color: white; border: none; border-radius: 5px; cursor: pointer;";
    document.body.appendChild(btn);

    btn.onclick = () => {
        if (confirm("연결되지 않은 모든 블록을 삭제하시겠습니까?")) {
            deleteUnusedBlocks();
        }
    };
};

// 블록 삭제 로직
const deleteUnusedBlocks = () => {
    // 엔트리 워크스페이스의 블록 엔진에 접근
    // Entry.mainWorkspace는 엔트리 내부 전역 객체입니다.
    if (typeof Entry !== 'undefined' && Entry.mainWorkspace) {
        const board = Entry.mainWorkspace.board;
        const code = board.code;
        const threads = code.getThreads(); // 모든 블록 묶음(쓰레드)을 가져옴

        threads.forEach(thread => {
            const firstBlock = thread.getFirstBlock();
            
            // 시작 블록(이벤트 블록)으로 시작하지 않는 독립된 블록인지 확인
            // 엔트리에서는 'start_event' 등의 타입으로 시작하지 않으면 실행되지 않는 블록인 경우가 많습니다.
            if (firstBlock && !isStartingBlock(firstBlock)) {
                thread.destroy(); // 블록 묶음 삭제
            }
        });
        
        // 화면 업데이트
        board.render();
        alert("정리가 완료되었습니다!");
    } else {
        alert("엔트리 워크스페이스를 찾을 수 없습니다.");
    }
};

// 시작 블록(이벤트 블록)인지 판별하는 함수
const isStartingBlock = (block) => {
    const type = block.type;
    // 엔트리의 시작 블록들은 보통 'when_'으로 시작하거나 특정 시작 타입을 가집니다.
    return type.startsWith('when_') || type.includes('start');
};

// 페이지 로드 시 버튼 설치
setTimeout(setupCleanButton, 3000);
