window.addEventListener('message', (event) => {
    // 보낸 신호가 블록 청소 신호인지 확인
    if (event.data && event.data.type === 'ENTRY_CLEAN_BLOCKS') {
        if (typeof Entry === 'undefined' || !Entry.mainWorkspace) {
            alert("엔트리 에디터 로딩을 기다려주세요.");
            return;
        }

        const board = Entry.mainWorkspace.board;
        const threads = board.code.getObjects();
        let count = 0;

        // 삭제 전 확인 (선택 사항)
        if (!confirm("연결되지 않은 블록들을 모두 삭제할까요?")) return;

        // 역순으로 순회하며 미사용 블록 삭제
        for (let i = threads.length - 1; i >= 0; i--) {
            const thread = threads[i];
            // 시작 블록이 아니면 삭제
            if (thread && typeof thread.isHead === 'function' && !thread.isHead()) {
                thread.destroy();
                count++;
            }
        }

        if (count > 0) {
            Entry.requestUpdate(); // 워크스페이스 갱신
            alert(`${count}개의 블록 뭉치를 정리했습니다!`);
        } else {
            alert("정리할 블록이 없습니다.");
        }
    }
});
