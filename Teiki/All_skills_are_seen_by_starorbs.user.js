// ==UserScript==
// @name         増弾ハイブレイク/ツインヒールを救いたい(All_skills_are_seen_by_starorbs)
// @namespace    http://sexyradish.jp
// @version      0.1919
// @description  スキルを作るのプルダウンをトウィークします
// @match        https://soraniwa.428.st/stb/*
// @updateurl	https://serikanootto.github.io/Teiki/All_skills_are_seen_by_starorbs.user.js
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    const VERSION = '0.1919';
    console.log(`Select Options Modifier v${VERSION} loaded`);

    const skillDescriptions = {};

    function getSkillDescriptions() {
        try {
            const spans = document.querySelectorAll('span[data-ctip]');
            spans.forEach(span => {
                const match = span.getAttribute('data-ctip').match(/【★.+?】\[.+?\](.+)/);
                if (match) {
                    skillDescriptions[match[1]] = span.getAttribute('data-ctip');
                }
            });
            console.log('Skill descriptions loaded:', Object.keys(skillDescriptions).length);
        } catch (error) {
            console.error('Error in getSkillDescriptions:', error);
        }
    }

    function modifySelectOptions() {
        try {
            const select = document.querySelector('select[name="sno"]');
            if (!select) {
                console.warn('Select element not found');
                return;
            }

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
            console.log('Select options modified successfully');
        } catch (error) {
            console.error('Error in modifySelectOptions:', error);
        }
    }

    function init() {
        getSkillDescriptions();
        modifySelectOptions();
    }

    // MutationObserver を使用して、必要な要素が追加されたら処理を実行
    const observer = new MutationObserver((mutations, obs) => {
        const select = document.querySelector('select[name="sno"]');
        if (select) {
            obs.disconnect();
            init();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();