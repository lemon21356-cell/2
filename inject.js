window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'ENTRY_CLEAN_BLOCKS') {
        if (typeof Entry === 'undefined' || !Entry.mainWorkspace) {
            alert("엔트리 코딩 화면에서만 작동합니다.");
            return;
        }

        const board = Entry.mainWorkspace.board;
        const threads = board.code.getObjects();
        let count = 0;

        for (let i = threads.length - 1; i >= 0; i--) {
            const thread = threads[i];
            // 머리 블록이 아니면 삭제 (연결 안 된 블록들)
            if (thread && typeof thread.isHead === 'function' && !thread.isHead()) {
                thread.destroy();
                count++;
            }
        }

        if (count > 0) {
            Entry.requestUpdate();
            alert(`${count}개의 미사용 블록을 청소했습니다!`);
        } else {
            alert("청소할 블록이 없네요!");
        }
    }
});
