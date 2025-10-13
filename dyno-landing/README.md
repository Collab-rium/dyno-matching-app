Dyno-Matching Landing (dev notes)

What I changed
- Rebuilt landing page to match the 'Final Pro Version' spec.
- Single floating glass header, cinematic gradients, mobile-first responsive layout.
- Animated hero with phone mockup, accessible mobile menu, theme toggle, simple carousel, chat preview.
- PWA: updated `manifest.json` to use `assets/logo.svg` and added a basic `sw.js`.

How to test locally
1. Serve the `dyno-landing` folder on a local static server (recommended: Python or Node).

Python 3 (from workspace root):

Dyno-Matching landing: pro-rebuild removed

The pro-rebuild assets and files were moved to `pro-backup/` inside this folder. The active site files were replaced with minimal stubs to restore the previous, pre-rebuild experience.

If you want the full pro version restored or committed to a separate branch, tell me and I will restore it from `pro-backup/`.
