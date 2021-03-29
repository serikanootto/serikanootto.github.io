// ==UserScript==
// @name         DoNotGiveOutButadon
// @namespace    http://lisge.com/ib/
// @version      99.9
// @description  Œˆ“¬‚ÍŒoŒ±’l—p‚Å‚·
// @author       skrige
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