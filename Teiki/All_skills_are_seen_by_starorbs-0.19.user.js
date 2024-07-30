// ==UserScript==
// @name         増弾ハイブレイク/ツインヒールを救いたい(All_skills_are_seen_by_starorbs)
// @namespace    http://sexyradish.jp
// @version      0.19
// @description  スキルを作るのプルダウンをトウィークします
// @match        https://soraniwa.428.st/stb/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // スキル名とその説明を含むオブジェクト
    const skillDescriptions = {};

    // スパンからスキル説明を取得する関数
    function getSkillDescriptions() {
        const spans = document.querySelectorAll('span[data-ctip]');
        spans.forEach(span => {
            const match = span.getAttribute('data-ctip').match(/【★.+?】\[.+?\](.+)/);
            if (match) {
                skillDescriptions[match[1]] = span.getAttribute('data-ctip');
            }
        });
    }

    // セレクトオプションを修正する関数
    function modifySelectOptions() {
        const select = document.querySelector('select[name="sno"]');
        if (!select) return;

        const uniqueOptions = new Map();

        Array.from(select.options).forEach(option => {
            const text = option.text;
            const match = text.match(/(.+?)（/);
            if (match) {
                const skillName = match[1];
                if (skillDescriptions[skillName]) {
                    const newText = text.replace(skillName, skillDescriptions[skillName]);
                    option.text = newText;
                }
                if (!uniqueOptions.has(option.value)) {
                    uniqueOptions.set(option.value, option);
                }
            }
        });

        select.innerHTML = '';
        uniqueOptions.forEach(option => select.appendChild(option));
    }

    // ページロード後に実行
    window.addEventListener('load', () => {
        getSkillDescriptions();
        modifySelectOptions();
    });
})();