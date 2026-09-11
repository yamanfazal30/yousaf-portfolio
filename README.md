# Portfolio Site

A one-page portfolio site — static HTML, CSS, and JavaScript, no build step, no
framework, no dependencies to install. It runs by opening `index.html`, and
deploys to Vercel as-is.

Sections: Home, About, Services, Testimonials, Contact — same structure as most
one-page portfolios, with a design built around spreadsheets/ledgers (formula
bar, cell references, data table) to match Excel automation / dashboard /
lead-gen work. Swap the copy and it works for any freelance service.

## Files

```
index.html    → all content and structure
style.css     → all styling (colors/fonts are CSS variables at the top)
script.js     → typewriter effect, mobile menu, scroll animations, contact form
assets/
  profile-placeholder.svg   → placeholder for your hero photo
  about-placeholder.svg     → placeholder for your about-section photo
```

## Before you publish — personalize these

Nothing here will break if you skip a step, but these are placeholders and
should be swapped before you send the link to anyone:

- [ ] **Name** — replace "Your Name" in `index.html` (hero, `<title>`, footer)
      and the "YN" initials in the nav/footer logo box.
- [ ] **Roles** — edit the `roles` array near the top of `script.js` (the
      text that types itself out in the hero).
- [ ] **Bio & intro copy** — the hero intro and About paragraphs are written
      generically for an Excel/automation freelancer; adjust to your voice.
- [ ] **Stats** — the "40+ / 15+ / 5 days" row in About is sample data. Put
      in real numbers or delete the row.
- [ ] **Services table** — edit the four rows in the Services section to
      match what you actually offer.
- [ ] **Testimonials** — the three quotes are placeholder examples (clearly
      generic on purpose). Replace with real client feedback you have
      permission to publish, or remove the section.
- [ ] **Email & social links** — currently `you@example.com` and `href="#"`
      placeholders in the hero, contact section, and footer.
- [ ] **Photos** — replace `assets/profile-placeholder.svg` and
      `assets/about-placeholder.svg` with real images. Keep the same
      filenames (or update the `src` in `index.html`) — JPG or PNG both work.
- [ ] **CV/resume** — the "Download CV" button links to `assets/CV.pdf`,
      which doesn't exist yet. Add your PDF there, or remove the button.
- [ ] **Favicon initials** — the little tab icon is a generic bracket mark;
      fine to leave as-is.

## Contact form setup (2 minutes)

The form posts to [Formspree](https://formspree.io) so messages arrive by
email with no backend to host. To connect it:

1. Create a free account at formspree.io and add a new form.
2. Copy the endpoint it gives you (looks like `https://formspree.io/f/xxxxxxx`).
3. In `index.html`, find:
   ```html
   <form ... action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   and replace `YOUR_FORM_ID` with your real form ID.

Until you do this, the form shows a friendly "not connected yet" message
instead of failing silently.

## Preview locally

Opening `index.html` directly in a browser works. If you want a local
server (only needed for some browsers' handling of relative paths):

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy to Vercel

**Option A — GitHub + Vercel dashboard (recommended)**

1. Push this folder to a new GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import
   that repository.
3. Framework preset: choose **Other** (it's a static site — no build
   command or output directory needed).
4. Click **Deploy**. Vercel gives you a live `*.vercel.app` URL in under a
   minute, and redeploys automatically on every push.

**Option B — Vercel CLI**

```bash
npm install -g vercel
cd path/to/this/folder
vercel        # first deploy, follow the prompts
vercel --prod # promote to your production URL
```

No `vercel.json` is included because none is needed — Vercel serves static
HTML/CSS/JS with zero configuration.

## Customizing the design

Everything visual is driven by CSS variables at the top of `style.css`:

```css
:root {
  --paper: #F5F6F2;   /* page background */
  --ink: #14181C;     /* main text */
  --green: #1B4D3E;   /* primary accent */
  --amber: #C6862B;   /* secondary accent */
  ...
}
```

Change those and the whole site retints consistently — buttons, links,
underlines, and the corner-bracket marks all reference the same variables.
Fonts (Fraunces / IBM Plex Sans / IBM Plex Mono) are loaded from Google
Fonts in `index.html`'s `<head>`.
