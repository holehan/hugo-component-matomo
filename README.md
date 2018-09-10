## About

Matomo tracking and optout scripts for Hugo.

## Requirements

- [Hugo](https://gohugo.io) v0.47 or higher
- [Matomo Analytics](https://matomo.org/) with marketplace/plugin access
- Matomo plugin [Ajax Opt Out](https://plugins.matomo.org/AjaxOptOut)
- A modern webbrowser with [Promises](https://caniuse.com/#feat=promises) support. IE11 is supported with the [es6-promise polyfill](https://github.com/stefanpenner/es6-promise).

## Install component as a submodule

```sh
git submodule add https://github.com/holehan/hugo-components-matomo.git themes/matomo
git submodule init themes/matomo
git submodule update themes/matomo
```

## Usage

- Add the matomo components to your Hugo project's config.toml:

  ```toml
  theme = ["...", "matomo"]
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

Add the matomo server url as `matomoUrl` and your site's tracking id as `matomoId` to your Hugo project's params within your config.toml. If e.g. your matomo server is located at `example.org` and your Hugo project's site id is `1`, add the following:

```toml
[params]
matomoUrl = "https://example.org"
matomoId = 1
```

### Configure optout

Edit your privacy page's frontmatter to customize the optout message and button text. The message text supports markdown, the button text does not.

```yaml
matomo:
  track:
    message: Ihre Sitzungsdaten werden erhoben.
    button: Datenerhebung zulassen
  block:
    message: Ihre Sitzungsdaten werden *nicht* erhoben.
    button: Datenerhebung verbieten
```

### Style the Matomo Optout component

Use the following classes to style the optout component to your heart's desire.

```
MatomoOptout {}
MatomoOptout-trackMessage {}
MatomoOptout-trackMessage.is-hidden {}
MatomoOptout-blockMessage {}
MatomoOptout-blockMessage.is-hidden {}
MatomoOptout-button {}
MatomoOptout-button--track {}
MatomoOptout-button--block {}
```

```html
<div class="MatomoOptout">
...
<div class="MatomoOptout-trackMessage is-hidden">You are being watched.</div>
<div class="MatomoOptout-blockMessage">You are not tracked.</div>
<button class="MatomoOptout-button MatomoOptout-button--track">Allow tracking</button>
<button class="MatomoOptout-button MatomoOptout-button--block">Disable tracking</button>
</div>
```
