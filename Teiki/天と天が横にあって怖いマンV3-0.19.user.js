// ==UserScript==
// @name         天と天が横にあって怖いマンV3
// @namespace    http://sexyradish.jp
// @version      0.19
// @description  天と天が被ってるので色つけて思いっきりダサくしてわかりやすくするよ～
// @match        https://soraniwa.428.st/stb/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function modifyAndReorderOptions() {
        const select = document.querySelector('select[name="starorb"]');
        if (!select) return;

        const options = Array.from(select.querySelectorAll('option'));
        let scorpioOption, piscesOption;

        options.forEach(option => {
            if (option.textContent.includes('星珠『天蝎宮』 イメージ「水/感情/感性/不動」')) {
                option.style.backgroundColor = 'lightblue';
                scorpioOption = option;
            } else if (option.textContent.includes('星珠『天秤宮』 イメージ「風/知識/情報/活動」')) {
                option.style.backgroundColor = 'lightgreen';
            } else if (option.textContent.includes('星珠『双魚宮』 イメージ「水/感情/感性/柔軟」')) {
                piscesOption = option;
            }
        });

        // 天蝎宮の要素を双魚宮の要素の後に移動
        if (scorpioOption && piscesOption) {
            select.removeChild(scorpioOption);
            piscesOption.insertAdjacentElement('afterend', scorpioOption);
        }
    }

    // ページ読み込み後に実行
    window.addEventListener('load', modifyAndReorderOptions);

})();