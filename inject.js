window.addEventListener('START_CLEANING', () => {
    // 1. Entry 객체가 존재하는지 확인
    if (typeof Entry === 'undefined' || !Entry.mainWorkspace) {
        alert("엔트리 에디터가 아직 완전히 로드되지 않았거나, 만들기 화면이 아닙니다.");
        return;
    }

    const board = Entry.mainWorkspace.board;
    const code = board.code;
    const threads = code.getObjects(); // 블록 뭉치(쓰레드)들
    let count = 0;

    // 2. 삭제 로직 (안전하게 뒤에서부터 순회)
    for (let i = threads.length - 1; i >= 0; i--) {
        const block = threads[i];

        // 시작 블록(이벤트 블록)이 아닌 뭉치들만 삭제
        // isHead()는 해당 블록 뭉치가 실행 가능한 시작점인지를 판단합니다.
        if (block && typeof block.isHead === 'function' && !block.isHead()) {
            block.destroy();
            count++;
        }
    }

    // 3. 화면 갱신 및 결과 알림
    if (count > 0) {
        Entry.requestUpdate(); 
        alert(`${count}개의 미사용 블록 뭉치를 삭제했습니다.`);
    } else {
        alert("삭제할 미사용 블록이 없습니다.");
    }
});
