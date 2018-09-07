'use strict';

var matomoUrl = document.querySelector('script[data-id="matomo-optout"]').getAttribute('data-matomo-optout-url');
var piwikAjaxOptOutIsTracked = true;

/**
 * Activate user tracking.
 *
 * @author Florian Grässle <hallo@holehan.org>
 */
function piwikAjaxOptOutTrack() {
  var url = matomoUrl + '/index.php?module=API&method=AjaxOptOut.doTrack&format=json';

  fetchJsonp(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    // console.log('parsed json', json);
    piwikAjaxOptOutStatus();
  }).catch(function (ex) {
    console.log('parsing failed', ex);
  });
}

/**
 * Deactivate user tracking.
 *
 * @author Florian Grässle <hallo@holehan.org>
 */
function piwikAjaxOptOutUntrack() {
  url = matomoUrl + '/index.php?module=API&method=AjaxOptOut.doIgnore&format=json';

  fetchJsonp(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    // console.log('parsed json', json);
    piwikAjaxOptOutStatus();
  }).catch(function (ex) {
    console.log('parsing failed', ex);
  });
}

/**
 * Get tracking status
 *
 * @author Florian Grässle <hallo@holehan.org>
 */

function piwikAjaxOptOutStatus() {
  // Retrieve initial status from piwik installation.
  var url = matomoUrl + '/index.php?module=API&method=AjaxOptOut.isTracked&format=json';

  fetchJsonp(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    // console.log('parsed json', json);
    piwikAjaxOptOutIsTracked = json.value;
    updateText();
  }).catch(function (ex) {
    console.log('parsing failed', ex);
  });
}

/**
 * Update status text with tracking status.
 *
 * @author Oliver Lippert <oliver@lipperts-web.de>
 */
function updateText() {
  var trackText = document.querySelector('.MatomoOptout-trackMessage');
  var untrackText = document.querySelector('.MatomoOptout-untrackMessage');
  if (piwikAjaxOptOutIsTracked === true) {
    trackText.classList.remove('is-hidden');
    untrackText.classList.add('is-hidden');
  } else {
    trackText.classList.add('is-hidden');
    untrackText.classList.remove('is-hidden');
  }
}

function documentReady() {
  // Get initial tracking status
  piwikAjaxOptOutStatus();

  // Add listener for the "do track" button.
  var doTrackBtn = document.querySelector('.MatomoOptout-button--track');
  doTrackBtn.onclick = function (event) {
    event.preventDefault();
    event.stopPropagation();

    piwikAjaxOptOutTrack();
  };

  // Add listener for the "do not track" button.
  var doUntrackBtn = document.querySelector('.MatomoOptout-button--untrack');
  doUntrackBtn.onclick = function (event) {
    event.preventDefault();
    event.stopPropagation();

    piwikAjaxOptOutStatus();
    if (piwikAjaxOptOutIsTracked === true) {
      piwikAjaxOptOutUntrack();
    }
  };
}

// Check if the DOMContentLoaded has already been completed
if (document.readyState !== 'loading') {
  documentReady();
} else {
  document.addEventListener('DOMContentLoaded', documentReady);
}