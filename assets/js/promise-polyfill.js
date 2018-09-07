'use strict';

var promiseUrl = document.querySelector('script[data-id="promise-polyfill"]').getAttribute('data-promise-polyfill-url');

if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) document.write('<script src="' + promiseUrl + '"></script>');