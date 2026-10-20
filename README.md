Thanks for downloading this theme!

## Other Useful Links

**ThemeWagon** is a great source for downloading free HTML templates built with the latest technology.

To download free templates, follow this link: https://themewagon.com/theme_tag/free/

Besides that, you can buy our premium templates for making your web development experience unforgettable.

Visit the store from here: https://themewagon.com/theme-categories/premium-templates/

Alternatively, here's our top most trending and selling items:

* [**Sparrow**](https://themewagon.com/themes/sparrow/) - A multipurpose template made with Bootstrap 4.1 and world's finest animation.
* [**Posh**](https://themewagon.com/themes/posh-html5-bootstrap-4-template/) - Bootstrap 4 template with a myriad number of ready-to-deploy sections. 
* [**Elixir**](https://themewagon.com/themes/elixir-elegant-html5-bootstrap-template-consultancy-agency-website/) - Bootstrap 4 agency template. Best for smooth animated scrolling. 
* [**Freya**](https://themewagon.com/themes/bootstrap-4-premium-interior-design-template-freya/) - Interior design template made with Bootstrap 4. 
* [**Reign Pro**](https://themewagon.com/themes/reign-pro-premium-corporate-agency-html5-template/) - A corporate template with a visually unique design scheme. 
* [**Boots4**](https://themewagon.com/themes/first-ever-bootstrap-4-template/) - One of the first Bootstrap 4 templates ever made on earth. 
* [**Hideaway**](https://themewagon.com/themes/hideaway/) - A template for resorts. Built with Bootstrap 4. 
* [**Baikal**](https://themewagon.com/themes/bootstrap-4-startup-small-business-website-template/) - A smart Bootstrap template for start-up. 
* [**Mega Discount**](https://themewagon.com/themes/mega-discount-bundle/) - A bundle of 26 HTML5 templates; best value for your money.

---

# Next.js Application: Esther Studios

> Every moment. Beautifully kept.

Wedding and portrait photography studio in Nairobi, Kenya. Weddings, engagements,
portraits, corporate headshots, maternity, family and events.

WhatsApp: **+254 112 272 061**

---

## What this repository contains

This project is built **on top of** the supplied `studio-master` HTML template
(ThemeWagon "Studio" by Colorlib). The template is preserved exactly at the root of
the repository, and the Next.js application is built alongside it.

### Preserved template (do not rename, move or delete)

```
.gitattributes      README.md (original template readme, kept verbatim)
about-me.html       blog.html        contact.html
elements.html       index.html       portfolio.html
style.css
css/                (animate, bootstrap, core-style, font-awesome,
                     magnific-popup, owl.carousel, pe-icon-7-stroke, responsive)
fonts/              (FontAwesome.otf, Pe-icon-7-stroke.*, fontawesome-webfont.*)
img/                (bg-img and core-img assets)
js/                 (active.js, bootstrap.min.js, map-active.js, plugins.js,
                     popper.min.js, jquery/jquery-2.2.4.min.js)
```

The two `@font-face` rules from the zip (`FontAwesome` and `Pe-icon-7-stroke`), the
full `:root` custom property block from `css/bootstrap.min.css`, and the
`#preloader` / `.showbox` / `.loader` / `.circular` / `.path` / `.questions-area`
preloader CSS are all reproduced in `app/globals.css`. Poppins (300, 400, 500, 600,
700) is still loaded from Google Fonts, exactly as the template did.

### Application

```
app/                    Next.js App Router pages and API routes
components/             UI, animation, consent, captcha, voice tour
lib/                    site config, packages, galleries, bookings, mail, captcha
public/images/          Pexels photography plus image-credits.md
types/                  local module declarations
```

## Running it

```bash
nvm use            # Node 24 (.nvmrc)
npm ci
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build
npm run start
npm run typecheck
```

## Environment

Copy `.env.example` to `.env.local` and fill it in.

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=254112272061
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
PEXELS_API_KEY=
KV_REST_API_URL=
KV_REST_API_TOKEN=
BLOB_READ_WRITE_TOKEN=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
```

Without `RECAPTCHA_SECRET_KEY` the captcha step is skipped locally and logged, so
forms stay usable in development. Without `SMTP_HOST` mail is logged instead of
sent. Without KV credentials bookings are held in memory for the lifetime of the
server process.

## Image credits

See `public/images/image-credits.md`. Every photograph is a Pexels free plan image
of East African or African subjects, with the photo page, photographer, subject and
licence confirmation for each file. No watermarks. No AI generated imagery.

## Deviations from the supplied specification

These are deliberate and were required to get a clean, buildable project.

1. **`@vercel/blob` 0.29.4 does not exist on npm.** The 0.x line ends at 0.27.3,
   so 0.27.3 is installed, the closest published version below the requested one.
2. **`jspdf` 3.0.1, `nodemailer` 6.10.1 and `next-auth` 5.0.0-beta.28 carry
   critical or high advisories**, and the build gate requires zero critical and zero
   high. They are pinned to the minimum patched releases instead:
   `jspdf` 4.2.1, `nodemailer` 10.1.7, `next-auth` 5.0.0-beta.32.
3. **`undici` is overridden to `^7.30.1`.** It arrives through `@vercel/blob`, whose
   pinned 5.x copy carries high severity advisories. `@vercel/blob` is installed to
   match the stack but is not wired to a feature yet, so the override carries no
   runtime risk today.
4. **`@tailwindcss/postcss` 4.1.10 is added as a dev dependency.** Tailwind CSS 4
   moved its PostCSS plugin out of the `tailwindcss` package, so this is required
   for `@import "tailwindcss"` to compile.
5. **`motion-dom` is overridden to 12.19.0.** The version range used by
   `framer-motion` 12.18.0 resolves to a release that removed an export it needs,
   which breaks the production build.
6. **Em dashes in `js/plugins.js`.** Two em dashes inside a third party vendor
   licence comment were replaced with hyphens so the whole project is free of the
   character. The file is otherwise untouched.
7. **Photographer names.** Where a Pexels contributor has not published a name on
   the photo page, `image-credits.md` records "Pexels contributor" with a link to
   the photo page, which always shows the current credit.

## Accessibility and compliance notes

- Cookie consent is stored under `esther_studios_consent` and written to meet the
  Kenya Data Protection Act 2019. The loading screen exposes `role="status"`.
- The voice tour never autoplays. It starts on the first scroll, click, tap or key
  press, and can be muted from the fixed control at the bottom left.
- Google reCAPTCHA v3 protects the booking, contact, sign in and sign up forms, with
  a v2 challenge fallback when the score falls below 0.5. The secret key is only
  ever read on the server.
