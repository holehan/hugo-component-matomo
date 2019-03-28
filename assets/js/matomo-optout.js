'use strict';

var matomoUrl = document.querySelector('script[data-id="matomo-optout"]').getAttribute('data-matomo-optout-url');
var matomoOptOutIsTracked = true;

/**
 * Activate user tracking.
 */
function matomoOptOutTrack() {
  var url = matomoUrl + '/index.php?module=API&method=AjaxOptOut.doTrack&format=json';

  fetchJsonp(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    matomoOptOutStatus();
  }).catch(function (ex) {
    console.log('parsing failed', ex);
  });
}

/**
 * Deactivate user tracking.
 */
function matomoOptOutBlock() {
  var url = matomoUrl + '/index.php?module=API&method=AjaxOptOut.doIgnore&format=json';

  fetchJsonp(url).then(function (response) {
    return response.json();
  }).then(function () {
    matomoOptOutStatus();
  }).catch(function (ex) {
    console.log('parsing failed', ex);
  });
}

/**
 * Get tracking status
 */

function matomoOptOutStatus() {
  // Retrieve initial status from piwik installation.
  var url = matomoUrl + '/index.php?module=API&method=AjaxOptOut.isTracked&format=json';

  fetchJsonp(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    matomoOptOutIsTracked = json.value;
    updateText();
  }).catch(function (ex) {
    console.log('parsing failed', ex);
  });
}

/**
 * Update status text with tracking status.
 */
function updateText() {
  var trackText = document.querySelector('.MatomoOptout-message--track');
  var blockText = document.querySelector('.MatomoOptout-message--block');
  if (matomoOptOutIsTracked === true) {
    trackText.classList.remove('is-hidden');
    blockText.classList.add('is-hidden');
  } else {
    blockText.classList.remove('is-hidden');
    trackText.classList.add('is-hidden');
  }
}

function documentReady() {
  // Get initial tracking status
  matomoOptOutStatus();

  // Add listener for the "do track" button.
  var doTrackBtn = document.querySelector('.MatomoOptout-button--track');
  doTrackBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    matomoOptOutTrack();
  });

  // Add listener for the "do not track" button.
  var doBlockBtn = document.querySelector('.MatomoOptout-button--block');
  doBlockBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    matomoOptOutStatus();
    if (matomoOptOutIsTracked === true) {
      matomoOptOutBlock();
    }
  });
}

// Check if the DOMContentLoaded has already been completed
if (document.readyState !== 'loading') {
  documentReady();
} else {
  document.addEventListener('DOMContentLoaded', documentReady);
}