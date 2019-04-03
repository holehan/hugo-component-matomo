'use strict';

var matomoUrl = document.querySelector('script[data-id="matomo-tracking"]').getAttribute('data-matomo-tracking-url');
var matomoSiteId = document.querySelector('script[data-id="matomo-tracking"]').getAttribute('data-matomo-tracking-id');

var _paq = _paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['disableCookies']);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
  _paq.push(['setTrackerUrl', matomoUrl + '/piwik.php']);
  _paq.push(['setSiteId', matomoSiteId]);

  var d = document;
  var g = d.createElement('script');
  var s = d.getElementsByTagName('script')[0];

  g.type = 'text/javascript';
  g.defer = true;
  g.src = matomoUrl + '/piwik.js';
  s.parentNode.insertBefore(g, s);
})();