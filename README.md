# WristHOI project page (WACV 2027)

Project page for **WristHOI: A Dual Wrist-mounted Dataset for Contact-aware Hand-Object Interaction**, served with GitHub Pages at <https://cislab-web.github.io/WristHOI/>.

## Layout

| Path | Content |
|---|---|
| `index.html` | Generated page — edit `tools/page_template.html`, then run `python3 tools/build_page.py` |
| `tools/page_template.html` | Page source. `{{QUALITY}}` and `{{TABLES}}` are filled from `tools/fragments/` (annotation-quality and benchmark markup carried over from the previous page) |
| `static/css/wristhoi.css`, `static/js/wristhoi.js` | Styles and behavior (no framework; Inter / JetBrains Mono from Google Fonts) |
| `static/videos/v2/` | 720p H.264 web encodes (no audio, `+faststart`) of the dataset-overview and wrist-camera-localization videos and their per-feature clips |
| `static/images/v2/` | Video posters and the social preview image |

Videos autoplay muted only while visible, so the page stays light on bandwidth.

## Local preview

```bash
python3 -m http.server 8765 --directory .
```

## License

The page design is adapted from the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) (from [Nerfies](https://nerfies.github.io)), licensed under [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/).
