(function() {
    'use strict';

    var parseQuery = function() {
        var search = window.location.search,
            q = {};

        search.slice(1).split('&').forEach(function(term) {
            var kv = term.split('=');
            q[kv[0]] = (kv[1] !== undefined) ? decodeURIComponent(kv[1]) : true;
        });

        return q;
    },

    evalHeight = function(input) {
        input.style.height = input.value.split('\n').length + 'em';
    },

    log = (function() {
        var console = document.querySelector('output');
        return function() {
            var rep = document.createElement('div');

            rep.classList.add('rep');
            [].slice.call(arguments).forEach(function(arg) {
                var entry = document.createElement('pre'),
                    result = document.createElement('pre'),
                    evaled,
                    resultType;

                entry.classList.add('entry');
                result.classList.add('result');

                try {
                    evaled = eval.call(this, arg);
                } catch (e) {
                    evaled = e.toString();
                }

                if (evaled === undefined) {
                    evaled = 'undefined';
                    resultType = 'undefined';
                } else if (evaled === null) {
                    evaled = 'null';
                    resultType = 'null';
                } else {
                    resultType = ({}).toString.call(evaled).replace('[object ', '').replace(']', '').toLowerCase();
                }

                if (resultType === 'object' || resultType === 'array') {
                    try {
                        evaled = JSON.stringify(evaled);
                    } catch (e) {

                    }
                }

                result.classList.add(resultType);

                if (resultType === 'string') {
                    evaled = '"' + evaled + '"';
                }

                stack.unshift(arg);

                entry.textContent = arg;
                result.textContent = evaled;
                rep.appendChild(entry);
                rep.appendChild(result);
            });
            console.appendChild(rep);
        }

    })(),
        input = document.querySelector('textarea'),
        stack = [],
        q = parseQuery();

    input.addEventListener('keypress', function(evt) {
        var key = evt.which,
            retVal;

        if (key === 13 && !evt.shiftKey) {
            log(input.value);
            input.value = '';
            input.removeAttribute('style');
        }
        // TODO: implement stack navigation.


    });

    input.addEventListener('keyup', function(evt) {
        if (evt.which === 13) {

            if (!evt.shiftKey) {
                input.value = '';
            } else {
                evalHeight(input);
            }
        }

        // Backspace
        if (evt.which === 8) {
            input.style.height = input.value.split('\n').length + 'em';
        }
    });

    input.addEventListener('keydown', function(evt) {
        var val,
        beforeTab,
        afterTab,
        caratPos;

        // Tabs
        if (evt.which === 9) {
            evt.preventDefault();
            val = input.value;
            caratPos = input.selectionStart;
            beforeTab = val.substring(0, input.selectionStart);
            afterTab = val.substring(input.selectionEnd);
            input.value = beforeTab + '\t' + afterTab;
            input.setSelectionRange(caratPos + 1, caratPos + 1);
        }

    });

    if (q.prime) {
        input.value = q.prime;
        evalHeight(input);
    }
})();