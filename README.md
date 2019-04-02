## About

[Matomo](https://matomo.org/) tracking and optout scripts for [Hugo](https://gohugo.io).

## Requirements

- [Hugo](https://gohugo.io) extended v0.47 or higher
- [Matomo Analytics](https://matomo.org/) with marketplace/plugin access
- Matomo plugin [Ajax Opt Out](https://plugins.matomo.org/AjaxOptOut)
- A modern webbrowser with JS and [Promises](https://caniuse.com/#feat=promises) support. Although not modern, IE11 (IE10 even?) is supported with the [es6-promise polyfill](https://github.com/stefanpenner/es6-promise).

## Install component as a submodule

```sh
git submodule add https://github.com/holehan/hugo-components-matomo.git themes/matomo
```

### Update component

```sh
git submodule update --remote themes/matomo
```

## Usage

- Add the matomo components to your Hugo project's config.toml:

  ```toml
  theme = ["YOURTHEME", "matomo"]
  ```

- Include the tracking partial in your Hugo templates, e.g. in `footer.html`

  ```go
  {{ partial "matomo-tracking" . }}
  ```

- Add the optout shortcode to your privacy page

  ```markdown
  {{< matomo-optout >}}
  ```

### Configure tracking (mandatory)

Add the matomo server url and your site's tracking id to your Hugo project's params within your `config.toml`. If e.g. your matomo server is located at `example.org` and your Hugo project's site id is `1`, add the following:

```toml
[params.matomo]
url = "https://example.org"
id = 1
```

The scripts and styles are fingerprinted, and [SRI](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) is applied by default. If you want to disable SRI (e.g. in case your webhoster optimzes your assets automagically), add the following to your matomo config in `config.toml`:

```toml
[params.matomo]
disableSRI = true
```

### Configure optout

Customize the optout message and button text by adding the following to your `config.toml`. The message text supports markdown, the button text does not.

```toml
[params.matomo.track]
button = "Datenerhebung zulassen"
message = "Ihre Sitzungsdaten werden erhoben."
[params.matomo.block]
button = "Datenerhebung abstellen"
message = "Ihre Sitzungsdaten werden *nicht* erhoben."
```

Alternatively use the page's frontmatter to customize the optout message and button text. The message text supports markdown, the button text does not.

```yaml
matomo:
  track:
    button: Allow tracking
    message: You are being watched. The government has a secret system, a machine that spies on you every hour of every day.
  block:
    button: Disallow tracking
    message: You are **not** tracked.
```

### Style the Matomo Optout component

The generated HTML will look like below.

```html
<div class="MatomoOptout">
  <script ...></script>
  <div class="MatomoOptout-message MatomoOptout-message--track is-hidden">
    You are being watched.
  </div>
  <div class="MatomoOptout-message MatomoOptout-message--block">
    You are not tracked.
  </div>
  <button class="MatomoOptout-button MatomoOptout-button--track">
    Allow tracking
  </button>
  <button class="MatomoOptout-button MatomoOptout-button--block">
    Disable tracking
  </button>
</div>
```

The matomo component comes with a very limited set of css styles that toggles between the messages. The style file is located at `themes/matomo/assets/css/matomo-optout.css`. If you want to use your own style file, create a file called `assets/css/matomo-optout.css` in your Hugo project's or your theme's root folder. Hugo will then pick this file instead of the one shipped with the matomo component.

In case you want to use your own build pipeline, set `styleFromAssets = false` within `[params.matomo]`. It's up to you then to add the css styles to one of your own style files.

Use the following classes to style the optout component to your heart's desire.

```css
MatomoOptout
MatomoOptout-message
MatomoOptout-message--track
MatomoOptout-message--track.is-hidden
MatomoOptout-message--block
MatomoOptout-message--block.is-hidden
MatomoOptout-button
MatomoOptout-button--track
MatomoOptout-button--block
```
