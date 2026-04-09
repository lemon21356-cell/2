(function() {
    console.log("엔트리 블록 정리기 스크립트 로드됨");

    const setupCleanButton = () => {
        if (document.getElementById('entry-cleaner-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'entry-cleaner-btn';
        btn.innerText = "🧹 블록 정리";
        
        // 스타일 보강: 어떤 상황에서도 보이도록 위치와 두께 조정
        btn.style.cssText = `
            position: fixed !important; 
            bottom: 30px !important; 
            right: 30px !important; 
            z-index: 2147483647 !important; 
            width: 120px;
            height: 50px;
            background-color: #00bb33 !important; 
            color: white !important; 
            border: 2px solid #ffffff !important;
            border-radius: 25px !important; 
            cursor: pointer !important;
            font-size: 14px !important;
            font-weight: bold !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important;
            display: block !important;
        `;
        
        document.body.appendChild(btn);
        console.log("버튼이 화면에 추가되었습니다.");

        btn.onclick = () => {
            if (typeof Entry !== 'undefined' && Entry.mainWorkspace) {
                const board = Entry.mainWorkspace.board;
                const threads = board.code.getThreads(); 
                let count = 0;

                threads.forEach(thread => {
                    const firstBlock = thread.getFirstBlock();
                    if (firstBlock && !isStartingBlock(firstBlock)) {
                        thread.destroy(); 
                        count++;
                    }
                });
                
                board.render();
                alert(`${count}개의 블록 묶음을 정리했습니다!`);
            } else {
                alert("엔트리가 아직 로딩 중입니다.");
            }
        };
    };

    const isStartingBlock = (block) => {
        const type = block.type;
        return type.startsWith('when_') || type.includes('start') || type.includes('clicked');
    };

    // 엔트리 엔진 감지 루프
    const checkInterval = setInterval(() => {
        if (typeof Entry !== 'undefined' && Entry.mainWorkspace) {
            setupCleanButton();
            // 엔진은 로드되었어도 UI가 늦게 뜰 수 있으므로 약간 더 대기
            setTimeout(setupCleanButton, 2000);
            clearInterval(checkInterval);
        }
    }, 1000);
})();
