// ==UserScript==
// @name         ほしたまの横のポップアップそのまま撫でてレベルアップするマン参上(popup tap up yep)
// @namespace    http://sexyradish.jp
// @version      0.19
// @description  恋する星珠は切なくて横の数字をクリックしてもすぐレベルアップしちゃうの
// @match        https://soraniwa.428.st/stb/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    const starOrbValues = {
        "白羊宮": "1", "金牛宮": "2", "双児宮": "3", "巨蟹宮": "4",
        "獅子宮": "5", "処女宮": "6", "天秤宮": "7", "天蝎宮": "8",
        "人馬宮": "9", "磨羯宮": "10", "宝瓶宮": "11", "双魚宮": "12"
    };

    // 星珠のセクションを見つける
    const sections = document.querySelectorAll('img[src^="./img/u"]');

    sections.forEach((section) => {
        // 星珠名を取得
        const nameText = section.nextSibling.textContent.trim();
        const nameMatch = nameText.match(/星珠『(.+?)』/);
        if (!nameMatch) return;
        const name = nameMatch[1];

        // 現在のレベルを取得
        const currentLevel = parseInt(nameText.match(/Lv\.(\d+)/)[1]);
        const nextLevel = currentLevel + 1;

        // このセクションの終わりを示す hr タグを見つける
        let nextElement = section.nextElementSibling;
        while (nextElement && !nextElement.classList.contains('dashline')) {
            if (nextElement.tagName === 'SPAN' &&
                (nextElement.classList.contains('skilltipA') || nextElement.classList.contains('skilltipB'))) {
                const level = parseInt(nextElement.textContent);
                if (level === nextLevel) {
                    nextElement.style.cursor = 'pointer';
                    nextElement.style.color = 'blue';
                    nextElement.style.textDecoration = 'underline';

                    nextElement.addEventListener('click', function(event) {
                        event.preventDefault(); // デフォルトの動作を防ぐ

                        // 確認ダイアログを表示
                        if (confirm(`星珠『${name}』をレベルアップしますか？`)) {
                            const form = document.createElement('form');
                            form.method = 'POST';
                            form.action = '.';

                            const modeInput = document.createElement('input');
                            modeInput.type = 'hidden';
                            modeInput.name = 'mode';
                            modeInput.value = 'keizoku02_item_post';
                            form.appendChild(modeInput);

                            const actionInput = document.createElement('input');
                            actionInput.type = 'hidden';
                            actionInput.name = 'action';
                            actionInput.value = 'orblevelup';
                            form.appendChild(actionInput);

                            const starOrbInput = document.createElement('input');
                            starOrbInput.type = 'hidden';
                            starOrbInput.name = 'starorb';
                            starOrbInput.value = starOrbValues[name];
                            form.appendChild(starOrbInput);

                            document.body.appendChild(form);
                            form.submit();
                        }
                    });
                    // 次のレベルを見つけたらループを抜ける
                    break;
                }
            }
            nextElement = nextElement.nextElementSibling;
        }
    });
})();