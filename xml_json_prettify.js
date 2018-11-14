// ==UserScript==
// @name         Format Transaction Log XML
// @namespace    BeautfyXMLAndJSON
// @version      0.1
// @description  This will format the xml returned in transaction log and format it.
// @author       Sudhir Dhumal
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var loadScript = function(src, callback) {
        var scriptElement = document.createElement("script");
        scriptElement.src = src;
        scriptElement.onload = function() {
            if(callback) {
                callback();
            }
        };

        document.head.appendChild(scriptElement);
    };

    loadScript('https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/vkbeautify/vkbeautify.0.99.00.beta.js', function() {
        // Add classes to pretty print the webpage
        var preTags = document.getElementsByTagName('pre');
        for (var i = 0; i < preTags.length; i++) {
            var responsePre = preTags[i];
            //var responsePre = document.getElementsByTagName('pre')[1];
            responsePre.classList.add('prettyprint');

            // Extract xml from pre tag
            var preElementTextContent = responsePre.textContent;

            try {
                if(preElementTextContent.startsWith('<?xml')) {
                    preElementTextContent = window.vkbeautify.xml(preElementTextContent);
                } else {
                    preElementTextContent = window.vkbeautify.json(preElementTextContent);
                }
            } catch(err) {
                // ignore
            }
            responsePre.innerHTML = '';

            var codeElement = document.createElement("code");
            codeElement.classList.add('language-xml');
            codeElement.textContent = preElementTextContent;

            responsePre.appendChild(codeElement);
        };

        loadScript('https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js', function() {
            window.PR.prettyPrint();
        });
    }); // END of the prettifying the webpage.
})();
