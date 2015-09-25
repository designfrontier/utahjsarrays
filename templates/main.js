(function(){function main(it
/**/) {
var out='<html><head> <link rel="stylesheet" href="/dist/main.css" /></head> <body> <h1>Utah JS Arrays</h1> <a href="http://slides.com/danielsellers/deck-3c5aae95-d7e1-4a22-aa8e-2e8d32c4fd8b"> The Slides</a> </body> <script src="/components/stubs/index.js"></script></html>';return out;
}var itself=main, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {window.render=window.render||{};window.render['main']=itself;}}());