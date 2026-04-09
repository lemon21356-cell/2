window.addEventListener('START_CLEANING', () => {
    if (typeof Entry === 'undefined' || !Entry.mainWorkspace) {
        alert("엔트리 에디터 상태가 아닙니다.");
        return;
    }

    const board = Entry.mainWorkspace.board;
    const allBlockLists = board.code.getObjects(); 
    let count = 0;

    // 뒤에서부터 지워야 인덱스 꼬임이 방지됨
    for (let i = allBlockLists.length - 1; i >= 0; i--) {
        const block = allBlockLists[i];
        
        // 머리(시작) 블록이 아닌 경우 = 혼자 떠다니는 블록
        if (!block.isHead()) {
            block.destroy();
            count++;
        }
    }

    // 변경사항 반영을 위해 엔진 업데이트
    Entry.requestUpdate(); 
    alert(`${count}개의 미사용 블록 뭉치를 청소했습니다!`);
});
