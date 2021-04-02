// ==UserScript==
// @name         DoNotGiveOutButadon
// @namespace    http://lisge.com/ib/
// @version      50.0
// @description  Duel is Exp only
// @author       tikuiti_himajin
// @match        http://lisge.com/ib/k/*/*.html
// @grant        GM_addStyle
// ==/UserScript==

(($) => {
    $("img[src='../../p/nd0.png']").parent().parent(".R870").addClass("duelescape");
    $("img[src='../../p/nd0.png']").parent().parent(".R870").prev("img").addClass("duelescape");
    $("img[src='../../p/nd0.png']").parent().parent(".R870").next("img").addClass("duelescape");
    $("img[src='../../p/nd.png']").parent(".R870").addClass("duelescape");
    $("img[src='../../p/nd.png']").parent(".R870").prev("img").addClass("duelescape");
    $("img[src='../../p/nd.png']").parent(".R870").next("img").addClass("duelescape");

    GM_addStyle(".duelescape{display:none}");
    GM_addStyle(".duelescape+br,.duelescape+br+br,.duelescape+br+br+br,.duelescape+br+br+br+br,.duelescape+br+br+br+br+br,.duelescape+br+br+br+br+br+br{display:none}");
})(jQuery);