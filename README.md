# All Tidied Up Guernsey — website

A single-page site in plain HTML, Tailwind CSS v3 (compiled and committed) and a small vanilla JS file. No frameworks and no runtime CDNs.

Draft live at: https://tobygregg.github.io/all-tidied-up/

## Folder layout

```
index.html              ← the whole site; sections separated by big comment banners
thanks.html             ← shown after the quote form is sent (FormSubmit _next)
404.html                ← GitHub Pages "not found" page (uses absolute /all-tidied-up/ paths – see checklist)
assets/css/styles.css   ← compiled Tailwind – don't edit by hand, run npm run build
assets/js/main.js       ← menu, header, reveals, services explorer, before/after, lightbox, form, mobile bar
assets/fonts/           ← self-hosted Fraunces + Figtree (woff2) with their OFL licences
images/brand/           ← logo.webp / logo-sm.webp (from the client's logo), mark.svg (simplified mark for favicons)
images/work/            ← photos, each as name.webp (large) + name-sm.webp (small)
images/                 ← favicons, og-image.jpg (1200×630 share card), site.webmanifest
src/input.css           ← Tailwind source, @font-face, component styles and keyframes
tailwind.config.js      ← brand colours, fonts and animations
sitemap.xml, robots.txt
_fb-pack/               ← the Facebook research pack (not published – the underscore keeps it off Pages)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| plum-900 | `#32293c` | Logo background. Text, primary buttons, before/after band, footer |
| slate-500 | `#566b85` | Bucket in the logo. Favicon mark |
| sky-400 | `#87cae7` | Logo bubbles. Icon tiles, hero wash, illustration fills (lighter tints) |
| lilac-400 | `#c998d4` | Logo glow. Headline underline, accents, quote panel |
| cream-100 | `#f8f3eb` | Logo lettering. Page and section backgrounds |

- **Fonts:** Fraunces (display, "soft" variant) and Figtree (body), both SIL Open Font License, self-hosted.
- **Logo:** the client's own logo (646 px) is used as-is as a rounded badge (`images/brand/logo.webp`). It is a detailed illustration, so it wasn't redrawn as SVG; `images/brand/mark.svg` is a simplified bucket-and-mop version drawn from it for favicons only. If the client has the original artwork file, swap it in.

## Editing

- **Text:** everything is in `index.html`. Each section starts with a `═══` comment banner.
- **Colours:** change them in `tailwind.config.js`, then run `npm install` (first time) and `npm run build`.
- **Services explorer:** each service is a `<button role="tab">` in the list plus a matching `<article role="tabpanel">`. To add one, copy a tab and panel pair, give them new ids (`tab-x` / `panel-x`), and add the service to the form's `<select>`.
- **Before & after:** the pairs are `images/work/<name>-before.webp` and `<name>-after.webp` (977×1221, same framing). Add a `data-pair="<name>"` chip in the section and a matching entry in `PAIRS` at the top of the before/after code in `assets/js/main.js` (title + one line of text).
- **Adding a work photo:** export it as WebP at ~1600px (`name.webp`) and ~800px (`name-sm.webp`) into `images/work/`, then copy one of the `<button class="gal-item">` blocks in the Recent work section and update the paths, `width`/`height`, `alt` and `data-caption`.
- **Hero:** the hero card is the bathroom pair, wiping from before to after on a loop (CSS `hero-wipe` keyframes in `src/input.css`). With reduced motion turned on it just shows the after photo.

## Before going live — checklist

- [ ] Swap `https://tobygregg.github.io/all-tidied-up/` for the real domain everywhere: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD, `sitemap.xml`, `robots.txt` and the form's `_next`.
- [ ] Change the `/all-tidied-up/` paths in `404.html` to `/` once the site is on its own domain.
- [ ] **When the client goes ahead, switch the form from Toby's email to the client's** (`action="https://formsubmit.co/…"` in `index.html`) and activate FormSubmit by sending a first test enquiry and clicking the confirmation email.
- [ ] Confirm the phone number (07781 176624) and ask for an email address – the Facebook page has none, so the site has no email link yet.
- [ ] Get Sarah to sign off the services wording, especially the "what's included" lists, which are built from her posts and photos.
- [ ] Check she's happy for the job photos (posted "with permission of the client") to be used on the website, and for her first name to be used throughout.
- [ ] Ask whether she has a surname or trading name for the JSON-LD, and any areas she doesn't cover.
- [ ] Assumptions: the bathroom, kitchen, fridge and microwave photos are from the emergency hospital-discharge clean (they were in that post); the food cupboard and sink photos are from other jobs. "Reusable items set aside for charity or people in need" is based on her "Preloved boxes" post – confirm she still offers it.
- [ ] Left out on purpose: the memes (gull "junk drawer", Virgo/Aquarius wardrobe), the shared "amazing advice from this lady" post, the AI-style promo graphics ("From Chaos to Comfort", "Introducing Preloved Boxes"), the Guernsey flag cover photo, the vacuum filter photo, and the two reviews (fewer than three written reviews, so no testimonials section). No FAQ, as the pack doesn't answer enough customer questions.

## Source

Built from the Facebook pack in `_fb-pack/` (not published on the live site).
