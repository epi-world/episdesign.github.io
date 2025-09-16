// JavaScript Document
function importJS() {
    if (! new Array().push) return false;
        var scripts = new Array(
        'js/smartRollover.js',
        'js/scrollsmoothly.js'
        );
        for (var i=0; i<scripts.length; i++) {
        document.write('<script type="text/javascript" src="' +scripts[i] +'"><\/script>');
        }
    }
importJS();