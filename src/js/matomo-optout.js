const matomoUrl = document
  .querySelector('script[data-id="matomo-optout"]')
  .getAttribute('data-matomo-optout-url');
let matomoOptOutIsTracked = true;

/**
 * Activate user tracking.
 */
function matomoOptOutTrack() {
  const url = `${matomoUrl}/index.php?module=API&method=AjaxOptOut.doTrack&format=json`;

  fetchJsonp(url)
    .then(response => response.json())
    .then(json => {
      matomoOptOutStatus();
    })
    .catch(ex => {
      console.log('parsing failed', ex);
    });
}

/**
 * Deactivate user tracking.
 */
function matomoOptOutBlock() {
  const url = `${matomoUrl}/index.php?module=API&method=AjaxOptOut.doIgnore&format=json`;

  fetchJsonp(url)
    .then(response => response.json())
    .then(() => {
      matomoOptOutStatus();
    })
    .catch(ex => {
      console.log('parsing failed', ex);
    });
}

/**
 * Get tracking status
 */

function matomoOptOutStatus() {
  // Retrieve initial status from piwik installation.
  const url = `${matomoUrl}/index.php?module=API&method=AjaxOptOut.isTracked&format=json`;

  fetchJsonp(url)
    .then(response => response.json())
    .then(json => {
      matomoOptOutIsTracked = json.value;
      updateText();
    })
    .catch(ex => {
      console.log('parsing failed', ex);
    });
}

/**
 * Update status text with tracking status.
 */
function updateText() {
  const trackText = document.querySelector('.MatomoOptout-message--track');
  const blockText = document.querySelector('.MatomoOptout-message--block');
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
  const doTrackBtn = document.querySelector('.MatomoOptout-button--track');
  doTrackBtn.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();

    matomoOptOutTrack();
  });

  // Add listener for the "do not track" button.
  const doBlockBtn = document.querySelector('.MatomoOptout-button--block');
  doBlockBtn.addEventListener('click', event => {
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
