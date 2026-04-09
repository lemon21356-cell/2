window.addEventListener('START_CLEANING', () => {
    // Entry 객체 존재 확인
    if (typeof Entry === 'undefined' || !Entry.mainWorkspace) {
        alert("에디터 로딩을 기다려주세요.");
        return;
    }

    const board = Entry.mainWorkspace.board;
    const code = board.code;
    const threads = code.getObjects(); 
    let count = 0;

    // 미사용 블록(머리가 없는 블록) 삭제
    for (let i = threads.length - 1; i >= 0; i--) {
        const block = threads[i];
        if (block && typeof block.isHead === 'function' && !block.isHead()) {
            block.destroy();
            count++;
        }
    }

    if (count > 0) {
        Entry.requestUpdate(); // 화면 새로고침
        alert(`${count}개의 미사용 블록을 삭제했습니다.`);
    } else {
        alert("삭제할 블록이 없습니다.");
    }
});
