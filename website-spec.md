# Gapunda Civil Construction — Website Specification

> **Purpose**: Complete reference for all design decisions, file structure, logic, and content. Read this file first before making any updates.

## Company Info

- **Company**: Gapunda Civil Construction (Indigenous-owned)
- **Location**: 866 Stuart Highway, Pinelands NT 0829
- **Email**: admin@gapundacivil.com.au
- **Hours**: Monday–Saturday 7:00 AM – 6:00 PM, Sunday Closed
- **Services**: Concrete Works, Civil Infrastructure, Plant Hire
- **Clients**: Fulton Hogan, Boskalis, Territory Proud, Smithbridge, Sitzler, Ritek, John Holland, Civmec
- **GitHub Repo**: https://github.com/plam1999/gapunda-civil.git
- **Live URL**: https://plam1999.github.io/gapunda-civil/

---

## Tech Stack

| Technology | Purpose | Notes |
|---|---|---|
| **Tailwind CSS CDN** | All styling via utility classes | Loaded via `<script src="https://cdn.tailwindcss.com">` with inline `tailwind.config` in each HTML `<head>` — **no build step** |
| **Google Fonts (Inter)** | Typography, weights 400–800 | Preconnected, loaded via `<link>` |
| **Vanilla JavaScript** | All interactivity | 3 files, zero dependencies |
| **Web3Forms** | Contact form email delivery | Free tier, 250 emails/month. HTML form POSTs to `api.web3forms.com`. Requires access key (currently placeholder) |
| **Google Maps** | Embedded location map | Free iframe embed, no API key |
| **GitHub Pages** | Hosting | Deploy from `main` branch, root folder. `.nojekyll` file prevents Jekyll processing |

---

## File Structure

```
gapunda-civil/
├── index.html                              # Main single-page website (7 sections + footer)
├── project.html                            # Data-driven project detail template
├── .nojekyll                               # Empty file — tells GitHub Pages to skip Jekyll
├── README.md
├── website-spec.md                         # This file
├── css/
│   └── custom.css                          # Custom animations, nav states, lightbox, dot pattern
├── js/
│   ├── components.js                       # Shared header + footer (injected into DOM on load)
│   ├── main.js                             # All interactivity (nav, scroll, filters, lightbox, etc.)
│   └── projects-data.js                    # All project content as a JS object
└── assets/
    └── images/
        ├── company-logo.png                # Logo (transparent bg, dark "Gapunda" text, orange "Civil Construction")
        └── clients/                        # 8 client logo PNGs
            ├── Fulton_Hogan.png
            ├── Boskalis_partner.png
            ├── 1-Territory-Proud_partner.png
            ├── 1-Smithbridge_partner.png
            ├── 1-Sitzler_partner.png
            ├── 1-Ritek_partner.png
            ├── 1-John_Holland_partner.png
            └── 1-Civmec_partner.png
```

---

## Color Palette

Defined inline in `tailwind.config` in each HTML file's `<head>`:

```js
colors: {
  charcoal: { DEFAULT: '#2D2D2D', light: '#3D3D3D', dark: '#1A1A1A' },
  orange:   { DEFAULT: '#E8731A', dark: '#C75F14', light: '#F5A623' },
  earth:    { brown: '#8B6F47', tan: '#D4A96A' },
  cream:    '#FAF7F2',
  sand:     '#F0E6D3',   // available but currently unused
}
```

| Color | Where used |
|---|---|
| `charcoal` (#2D2D2D) | Services bg, Contact bg, body text, subpage nav bg |
| `charcoal-light` (#3D3D3D) | Projects bg, service panel bg |
| `charcoal-dark` (#1A1A1A) | Footer bg, mobile menu overlay |
| `orange` (#E8731A) | Primary accent everywhere — buttons, links, icons, badges, checkmarks, focus rings, section labels |
| `orange-dark` (#C75F14) | Button hover states |
| `cream` (#FAF7F2) | Hero bg, Clients bg, warm light sections |
| `earth-brown` (#8B6F47) | About photo gradient, project card gradients, concrete badge color |
| `earth-tan` (#D4A96A) | Gradient accents, dot pattern |

### Aboriginal Dot Pattern (`.dot-pattern`)

CSS-only decorative texture using 3 layered `radial-gradient` circles in orange, tan, and brown at different sizes (24px, 36px, 18px). Applied at very low opacity:
- `opacity-[0.06]` on hero (with CSS mask fade at bottom)
- `opacity-[0.03]` on dark sections (services, projects, contact)
- `opacity-15` or `opacity-20` on project card/about placeholders

---

## Logo Handling

The logo PNG has **dark charcoal "Gapunda" text** — invisible on dark backgrounds.

| Context | Treatment |
|---|---|
| Hero (cream bg) | Normal — dark text readable |
| Nav on home page | Normal — transparent nav over cream hero |
| Nav on subpages | `filter: brightness(0) invert(1)` via `.page-subpage .header-logo` |
| Footer | `filter: brightness(0) invert(1)` via `.footer-logo-invert` |

---

## Page-Level Architecture

### How shared components work

1. Each HTML page has `<div id="header-slot"></div>` and `<div id="footer-slot"></div>`
2. `components.js` runs on `DOMContentLoaded`, calls `renderHeader()` and `renderFooter()`
3. These functions generate full HTML strings and inject via `innerHTML`
4. Path resolution uses `data-base` attribute on `<html>` element (currently `"./"` for all pages since they're in root)

### How page type detection works

`main.js` checks `window.location.pathname` filename:
- `index.html` or empty → adds `body.page-home`
- Anything else → adds `body.page-subpage`

CSS rules in `custom.css` use these classes to change nav colors, logo filters, hamburger colors.

---

## Sections in index.html (top to bottom)

All content sections use `min-h-screen` so they fill the viewport. Sections use `pt-24 pb-XX md:pt-32 md:pb-XX` — the large top padding (6rem mobile / 8rem desktop) accounts for the fixed nav height so content starts right below the nav with no gap from the previous section. `scroll-padding-top: 0` in CSS (sections handle their own offset). Hero is the only section that uses `flex items-center justify-center` for vertical centering.

### Background Alternation Pattern

```
Hero       → cream                    (BRIGHT)
Services   → charcoal                 (DARK)
About      → gradient cream→white     (BRIGHT)
Projects   → charcoal-light           (DARK)
Clients    → cream                    (BRIGHT)
Contact    → charcoal                 (DARK)
Footer     → charcoal-dark            (DARK)
```

---

### 1. Hero (`#home`)

**Background**: `bg-cream` with dot-pattern overlay that fades out at bottom via CSS `mask-image: linear-gradient(to bottom, black 70%, transparent 100%)` — this prevents a visible seam with the next section.

**Layout**: Centered vertically and horizontally.

**Content (top to bottom)**:
- Company logo — `h-24 sm:h-32 md:h-40 lg:h-48` (the logo IS the title, no separate H1)
- Subtitle: "Building the Territory's future — civil construction, concrete works, and plant hire across the NT."
- Two CTA buttons side by side (stacked on mobile):
  - "Our Services" → solid orange with `.glow-pulse` animation, links to `#services`
  - "Get in Touch" → outlined orange, links to `#contact`
- Bouncing scroll indicator arrow at bottom — **clickable** `<a href="#services">`, turns orange on hover

**Animations**:
- Logo: `.reveal` fade-up + `.hero-float` (6s infinite gentle vertical float)
- Subtitle: `.reveal .reveal-delay-1`
- Buttons: `.reveal .reveal-delay-2`
- "Our Services" CTA: `.glow-pulse` — subtle orange box-shadow pulse every 3s

---

### 2. Services (`#services`)

**Background**: `bg-charcoal` with `dot-pattern opacity-[0.03]`

**Header**: 
- Orange uppercase label: "Our Capabilities"
- White heading: "Core Services"
- Gray-400 subtitle

**Layout**: Three panels in a `grid cols-1 lg:cols-3` with `gap-px bg-white/10 rounded-xl overflow-hidden` — creates thin white divider lines between panels. Entire grid uses `.reveal-scale` (scales from 0.9 on scroll-in).

**Each panel** (`bg-charcoal-light/80`, hover → `bg-charcoal-light`):
- Icon (context-specific SVG, orange, 24px) in a box that glows on hover (`group-hover:bg-orange/20`) + title (white, bold) inline with `flex items-center gap-4`
- Description paragraph (gray-400, text-sm)
- 4 capability items, each with orange checkmark SVG + gray-300 text

**Panel icons**:
- Concrete Works: stacked concrete blocks/bricks (`<rect>` elements)
- Civil Infrastructure: bridge with road surface and support columns (`<path>` + `<line>`)
- Plant Hire: excavator/construction vehicle with wheels and crane arm (`<path>` + `<circle>`)

**Panel content**:

| Concrete Works | Civil Infrastructure | Plant Hire |
|---|---|---|
| Foundations & footings | Roads & earthworks | Excavators & loaders |
| Formwork & reinforcing | Bridges & culverts | Graders & rollers |
| Retaining walls & slabs | Drainage & floodways | Water carts & trucks |
| Detailed concrete finishing | Stormwater systems | Wet & dry hire options |

---

### 3. About (`#about`)

**Background**: `bg-gradient-to-br from-cream via-white to-orange/5` with two soft blurred glow shapes (orange top-right, earth-tan bottom-left) using `blur-3xl` for depth.

**Layout**: Two columns on `lg:`, stacked on mobile.

**Left column** (`.reveal-left` — slides in from left): Image placeholder — `aspect-[4/3] rounded-2xl` with earth-brown→tan gradient, dot pattern overlay, camera SVG icon + "Company Photo" text. Replace with real photo later.

**Right column** (`.reveal-right` — slides in from right):
- Orange uppercase label: "Who We Are"
- Heading: "Indigenous-Owned. Territory Built." (line break hidden on mobile via `hidden sm:block`)
- 3 paragraphs about the company
- **Stat counters** below a `border-t border-gray-200 pt-8` divider:
  - `10+` Years Experience (animated) + orange `.counter-line` underline
  - `50+` Projects Completed (animated) + orange `.counter-line` underline
  - `100%` NT Owned (static) + orange `.counter-line` underline

**Counter animation**: Triggered by Intersection Observer when About section is 30% visible. Uses `requestAnimationFrame` with cubic ease-out over 1500ms. Each counter has `data-target` attribute. Only triggers once.

**Counter underlines** (`.counter-line`): 3px orange lines that grow from 0 to 100% width when they enter the viewport, with a 0.5s delay after becoming visible.

---

### 4. Projects (`#projects`)

**Background**: `bg-charcoal-light` with `dot-pattern opacity-[0.03]`

**Header**: "Portfolio" label + "Recent Projects" white heading + gray-400 subtitle

**Filter tabs**: 4 buttons — All (active: solid orange), Concrete Works, Civil Infrastructure, Plant Hire (inactive: `bg-white/10 text-gray-300`). JS toggles `.hidden-card` class on cards by matching `data-filter` to `data-category`.

**Project cards**: 6 cards in `grid cols-1 sm:cols-2 lg:cols-3 gap-6 lg:gap-8`.

Each card is an `<a>` tag linking to `./project.html?id=<slug>` with class `project-card group`:
- **Image area**: `aspect-[16/10]` with gradient placeholder, dot pattern, category badge (top-left), and hover overlay with "View Project" button (opacity transition)
- **Text area**: `p-5` with title (bold, `group-hover:text-orange`), client + year, description

**Card data**:

| # | Slug | Title | Category | Badge Color | Client | Year | data-category |
|---|---|---|---|---|---|---|---|
| 1 | stuart-highway | Stuart Highway Upgrade | Civil Infrastructure | bg-orange | John Holland | 2024 | civil |
| 2 | darwin-waterfront | Darwin Waterfront Precinct | Concrete Works | bg-earth-brown | Civmec | 2023 | concrete |
| 3 | palmerston-hospital | Palmerston Regional Hospital | Concrete Works | bg-earth-brown | Sitzler | 2023 | concrete |
| 4 | ichthys-lng | Ichthys LNG Pipeline | Civil Infrastructure | bg-orange | Boskalis | 2024 | civil |
| 5 | katherine-bridge | Katherine Bridge Repair | Civil Infrastructure | bg-orange | Smithbridge | 2025 | civil |
| 6 | mining-access | Mining Access Roads | Plant Hire | bg-charcoal-light | Ritek | 2024 | plant |

**Card gradient placeholders** (unique per card):
1. `from-charcoal-light to-earth-brown`
2. `from-earth-brown to-charcoal`
3. `from-charcoal to-orange-dark`
4. `from-earth-tan to-charcoal-light`
5. `from-charcoal-dark to-earth-brown`
6. `from-orange-dark to-charcoal`

**Reveal animation delays**: Cards 1,4 = none, Cards 2,5 = delay-1, Cards 3,6 = delay-2

---

### 5. Clients (`#clients`)

**Background**: `bg-cream`

**Header**: "Trusted Partners" orange uppercase label + "Companies We Work With" charcoal heading (no subtitle)

**Logo grid**: `grid cols-2 sm:cols-3 lg:cols-4 gap-5 md:gap-6 max-w-5xl mx-auto`

Each logo card: `bg-white rounded-xl p-5 sm:p-6 min-h-[90px] border border-orange/5` with `hover:shadow-lg hover:border-orange/20 hover:-translate-y-1`.

Logos display at **full original color** (no grayscale filter). Max height: `max-h-12 sm:max-h-14`.

8 clients in order: Fulton Hogan, Boskalis, Territory Proud, Smithbridge, Sitzler, Ritek, John Holland, Civmec. All cards same size (no col-span — 8 logos fills the 2/4-col grids evenly).

**White-text logo handling**: Fulton Hogan logo has white text which is invisible on white card backgrounds. Fixed with `.logo-dark-outline` CSS class — applies 4x `drop-shadow(0.5px)` in semi-transparent charcoal (`rgba(45,45,45,0.4)`) creating a subtle dark outline around all edges of the image. The shadow is thin and transparent enough to be barely visible on the colored icon portion, but provides enough contrast to make the white text readable. Apply this class to any future client logos that have white text.

---

### 6. Contact (`#contact`)

**Background**: `bg-charcoal` with `dot-pattern opacity-[0.03]`

**Header**: "Start a Conversation" orange label + "Get a Quote" white heading + gray-400 subtitle

**Layout**: Two columns on `lg:`, stacked on mobile.

**Left column — Contact form** (white card `rounded-xl p-6 sm:p-8 shadow-sm` on dark bg):

Form has `novalidate` attribute — all validation is handled by JS, not browser native popups.

Form fields:
| Field | Type | Name | Required | Notes |
|---|---|---|---|---|
| Full Name | text | name | Yes | Placeholder: "Your name" |
| Email | email | email | Yes | Placeholder: "your@email.com". JS validates format (`user@domain.tld`) on blur and submit |
| Phone | tel | phone | No | Placeholder: "04XX XXX XXX or (08) XXXX XXXX". `inputmode="numeric"`, `pattern="[0-9\s\+\(\)]*"`, `maxlength="15"`. JS strips non-numeric chars on input in real-time |
| Service Interest | select | service | No | Options: Concrete Works, Civil Infrastructure, Plant Hire, General Enquiry |
| Message | textarea (5 rows) | message | Yes | Placeholder: "Tell us about your project..." |

Hidden fields: `access_key` (`d384711d-3f8b-401f-9919-ace58ae57773` — active), `subject` ("New Enquiry from Gapunda Website"), `from_name` ("Gapunda Website"), `botcheck` (honeypot checkbox, hidden)

Submit button: "Send Enquiry" — solid orange, full-width on mobile.

**Form validation (JS in main.js)**:
- **On submit**: clears all previous errors first, then validates all `[required]` fields (empty → "This field is required"), then validates email format (invalid → "Please enter a valid email address"). If any errors, `e.preventDefault()` blocks submission and focuses the first invalid field.
- **On input**: each field clears its own error as the user types.
- **On blur (email only)**: validates email format immediately when user leaves the field.
- **Error display**: red border (`border-red-400`) + red-tinted background (`bg-red-50`) + inline `<p class="field-error">` message below the field. All inline, no browser popups.

Success message: `#form-success` div (hidden by default). Shown when URL contains `#thank-you` or `?success`.

**Right column — Contact info + map**:
- 3 info items with orange icon badges (rounded-lg bg-orange/10):
  - Address: 866 Stuart Highway, Pinelands NT 0829
  - Email: admin@gapundacivil.com.au (orange link)
  - Hours: Mon–Sat 7:00 AM – 6:00 PM, Sunday Closed
- Google Maps iframe: `https://maps.google.com/maps?q=866+Stuart+Highway,+Pinelands+NT+0829,+Australia&output=embed`, height 280px, rounded-xl with shadow

All text on dark bg: headings `text-white`, body `text-gray-400`.

---

### 7. Footer (via components.js)

**Background**: `bg-charcoal-dark`

**Layout**: 3-column grid on `md:`, stacked on mobile. Bottom border `border-white/10`.

**Columns**:
1. Logo (white-inverted via `.footer-logo-invert`) + company description
2. Quick Links: Home, Services, About Us, Projects, Contact — all linking to `index.html#section`
3. Contact Us: Address, email, hours with orange SVG icons

**Bottom bar**: Copyright "2026 Gapunda Civil Construction" + "Back to Top" link (smooth scroll via JS onclick).

---

## Project Detail Page (project.html)

A single template that renders any project dynamically from the URL query parameter `?id=<slug>`.

### How it works

1. Page loads `projects-data.js` which defines global `PROJECTS` object
2. Inline `<script>` at bottom reads `new URLSearchParams(window.location.search).get('id')`
3. Looks up `PROJECTS[id]` — if not found, shows "Project Not Found"
4. Populates: `document.title`, meta description, hero (h1, badge, client, year), description paragraphs, info grid (client, category, year, location), gallery

### Page structure

- **Nav**: Subpage style (solid charcoal bg, white text, inverted logo)
- **Hero**: `bg-charcoal pt-28 pb-12 md:pt-36 md:pb-16`. "Back to Projects" link → `./index.html#projects`. Title, category badge, client, year.
- **Content**: `bg-cream py-12 md:py-20`.
  - Project overview (2-3 paragraphs)
  - Info grid: 4 cards (Client, Category, Year, Location)
  - Gallery: 4-column grid of square thumbnails (`grid cols-2 md:cols-3 lg:cols-4`)
  - Navigation: "All Projects" link + "Enquire About This Project" button → `./index.html#contact`
- **Lightbox modal**: Full-screen overlay for gallery viewing
- **Footer**: Same shared footer

### Project data structure (projects-data.js)

```js
PROJECTS['slug'] = {
  title: 'Project Name',
  metaDescription: 'SEO description',
  category: 'Civil Infrastructure',       // Display text
  badgeColor: 'bg-orange',                // Tailwind class for hero badge
  categoryTextColor: 'text-orange',        // Tailwind class for info grid category
  client: 'Client Name',
  year: '2024',
  location: 'Location, NT',
  paragraphs: ['Para 1', 'Para 2', 'Para 3'],
  gallery: [
    { type: 'image', src: '' },   // Empty src = gradient placeholder
    { type: 'video', src: '' },   // Video type shows play button
  ]
}
```

All 6 projects have 6 gallery items each (5 images + 1 video), all currently placeholders (empty `src`).

### Lightbox

- Opens on click of any `.gallery-item` in `#gallery`
- Shows: close button (top-right), prev/next arrows (left/right), image/video, counter ("1 / 6")
- Navigation: click arrows, keyboard Left/Right/Escape, click backdrop to close
- For placeholders (no `src`): shows enlarged gradient with "Photo placeholder" text
- Body scroll locks (`body.lightbox-open { overflow: hidden }`)
- CSS transitions: fade in (opacity 0→1) + scale (0.9→1) with cubic-bezier ease over 400ms

---

## JavaScript Details

### components.js

| Function | Purpose |
|---|---|
| `getBasePath()` | Returns `data-base` attribute from `<html>` (default `"./"`) |
| `renderHeader()` | Builds nav `<header>` + mobile menu `<div>` as **siblings** (not nested). Mobile menu uses `z-[60]` (above nav `z-50`) to avoid fixed-inside-fixed clipping on mobile. Nav items: Home, Services, About, Projects, Clients. CTA: "Get a Quote" → `#contact`. Active link detection based on current filename. |
| `renderFooter()` | Builds footer HTML. 3-column layout with logo, links, contact info. |
| DOMContentLoaded listener | Injects header into `#header-slot`, footer into `#footer-slot` |

### main.js

All features wrapped in null checks — only activate when relevant elements exist on the page.

| Feature | Trigger | Behavior |
|---|---|---|
| **Page detection** | DOMContentLoaded | Adds `.page-home` or `.page-subpage` to `<body>` |
| **Sticky nav** | `scroll` event (passive) | Adds `.scrolled` to `#navbar` when `scrollY > 50` |
| **Mobile menu** | Click on `#menu-toggle` | Toggles `.open` on `#mobile-menu`, `.menu-open` on body/toggle. Closes on any link click. |
| **Scroll reveal** | Intersection Observer (threshold 0.1, rootMargin -50px bottom) | Adds `.visible` to `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`, `.counter-line` elements once. CSS handles animation. |
| **Active nav highlight** | `scroll` event (home page only) | Highlights nav link matching current section based on scroll position + 100px offset |
| **Project filter** | Click on `.filter-btn` | Sets clicked button `.active`, shows/hides `.project-card` by matching `data-filter` to `data-category` |
| **Counter animation** | Intersection Observer on `#about` (threshold 0.3) | Animates `.counter` elements from 0 to `data-target` with cubic ease-out over 1500ms. Runs once. |
| **Lightbox** | Click on `.gallery-item` in `#gallery` | Opens `#lightbox`, renders image/video/placeholder, handles prev/next/close/keyboard/backdrop |
| **Phone input filter** | `input` event on `#phone` | Strips non-numeric characters (keeps digits, spaces, +, parentheses) in real-time |
| **Email validation** | `blur` + `input` on `#email` | Validates `user@domain.tld` format. Shows/clears inline red error on blur/input |
| **Form submit validation** | `submit` event on `#contact-form` | Clears all errors → validates required fields → validates email format → blocks submit if errors, focuses first invalid field. Form uses `novalidate` to disable browser popups |
| **Form success** | URL hash `#thank-you` or query `?success` | Hides form, shows `#form-success` message |

### projects-data.js

Single global `PROJECTS` object. 6 entries keyed by slug. Used only by `project.html` inline script.

---

## CSS Details (custom.css)

Only contains styles that Tailwind utility classes can't express. All layout, spacing, colors, and responsive breakpoints use Tailwind in HTML.

### What's in custom.css

| Feature | CSS |
|---|---|
| **Scroll padding** | `html { scroll-padding-top: 0 }` — sections handle their own top padding (`pt-24 md:pt-32`) to account for fixed nav |
| **Dot pattern** | `.dot-pattern` — 3 layered radial-gradients |
| **Scroll reveal (up)** | `.reveal` opacity 0 + translateY(40px), cubic-bezier ease. `.visible` resets. `.reveal-delay-1/2/3/4` (0.15–0.6s) |
| **Scroll reveal (left)** | `.reveal-left` — slides in from -50px left. Used on About image. |
| **Scroll reveal (right)** | `.reveal-right` — slides in from 50px right. Used on About text. |
| **Scroll reveal (scale)** | `.reveal-scale` — scales from 0.9. Used on Services grid. |
| **Hero float** | `.hero-float` — `@keyframes heroFloat` 6s infinite subtle vertical float on logo |
| **Glow pulse** | `.glow-pulse` — `@keyframes glowPulse` 3s infinite orange glow on primary CTA button |
| **Gradient shift** | `.gradient-shift` — `@keyframes gradientShift` 8s animated background-position (available for use) |
| **Counter underline** | `.counter-line` — orange line grows from 0 to 100% width on `.visible` with 0.5s delay |
| **Scroll indicator** | `@keyframes bounce` 2s infinite |
| **Nav — home page** | `.page-home #navbar` transparent, dark text. `.scrolled` → frosted glass (rgba white + backdrop-filter blur 12px) |
| **Nav — subpages** | `.page-subpage #navbar` solid charcoal, gray text. `.scrolled` → frosted glass dark |
| **Nav active underline** | `.nav-link::after` pseudo-element — 2px orange line grows from 0 to 100% width on hover/active |
| **Logo invert** | `.page-subpage .header-logo` and `.footer-logo-invert` → `filter: brightness(0) invert(1)` |
| **Mobile menu** | `.open` shows overlay. `.menu-open` animates hamburger to X. Body overflow hidden |
| **Project cards** | Enhanced transition with cubic-bezier ease for smoother hover lift |
| **Filter button** | `.filter-btn.active` orange bg + orange box-shadow glow |
| **Counter** | `.counter { font-variant-numeric: tabular-nums }` |
| **Form focus** | `input/select/textarea:focus` orange border + ring |
| **Lightbox** | Scale 0.9→1 with cubic-bezier on open. Fade + pointer-events transition |
| **Logo dark outline** | `.logo-dark-outline` — 4x `drop-shadow(0.5px)` in `rgba(45,45,45,0.4)` for white-text logos on white bg (used on Fulton Hogan) |
| **Section divider** | `.section-divider` — thin orange gradient line (available for use between sections) |
| **Selection** | `::selection` orange bg, white text |
| **Scroll lock** | `body.menu-open, body.lightbox-open { overflow: hidden }` |

### Service panel icons

| Panel | Icon | Description |
|---|---|---|
| Concrete Works | Stacked bricks/blocks | `<rect>` elements forming layered concrete blocks |
| Civil Infrastructure | Bridge/road | Arch bridge with road surface and support columns |
| Plant Hire | Excavator/machinery | Truck with wheels, crane arm, and construction vehicle shape |

---

## Responsive Breakpoints

Standard Tailwind breakpoints:

| Prefix | Width | Devices |
|---|---|---|
| (default) | 0+ | Mobile portrait |
| `sm:` | 640px+ | Mobile landscape, small tablets |
| `md:` | 768px+ | Tablets |
| `lg:` | 1024px+ | Desktop |

### Key responsive behavior

| Component | Mobile | Tablet+ | Desktop+ |
|---|---|---|---|
| Nav | Hamburger overlay | Hamburger overlay | Horizontal links |
| Hero logo | h-24 | h-32 / h-40 | h-48 |
| Hero CTAs | Stacked full-width | Side by side | Side by side |
| Service panels | Stacked | Stacked | 3 columns |
| About | Stacked (image → text) | Stacked | 2 columns |
| Project grid | 1 column | 2 columns | 3 columns |
| Client logos | 2 columns | 3 columns | 4 columns |
| Contact | Stacked (form → info) | Stacked | 2 columns |
| Footer | Stacked | 3 columns | 3 columns |
| Gallery (project.html) | 2 columns | 3 columns | 4 columns |

---

## How to Update (Common Tasks)

### Add a new project
1. Add entry to `js/projects-data.js` with unique slug key
2. Copy an existing `<a class="project-card">` block in `index.html` `#projects` section
3. Update: `href` slug, `data-category`, gradient classes, badge text/color, title, client, year, description
4. Match `reveal-delay-` pattern (0 for rows starting, -1/-2 for 2nd/3rd in row)

### Add real project photos
1. Create `assets/images/projects/` folder
2. Add image files
3. Update the gallery array in `js/projects-data.js`:
   ```js
   { type: 'image', src: './assets/images/projects/photo.jpg' }
   ```

### Replace the About section placeholder photo
Replace the gradient div at `index.html` line ~182 with:
```html
<img src="./assets/images/about-photo.jpg" alt="Gapunda team" class="w-full h-full object-cover">
```

### Contact form
Web3Forms access key is **already configured** (`d384711d-3f8b-401f-9919-ace58ae57773`). Form submissions go to `admin@gapundacivil.com.au`. To change the target email, generate a new key at https://web3forms.com and replace the `access_key` value in `index.html`.

### Change company address/email/hours
Update in two places:
- `index.html` → `#contact` section (lines ~472-491)
- `js/components.js` → `renderFooter()` function (lines ~81-91)

### Change nav menu items
Edit `navItems` array in `js/components.js` `renderHeader()` (line ~11-17). Add corresponding `id` section in `index.html`.

### Add a new client logo
1. Add PNG to `assets/images/clients/`
2. Copy an existing logo `<div>` block in `index.html` `#clients` section
3. Update `src` and `alt`
4. If the logo has white text, add class `logo-dark-outline` to the `<img>` tag

### Change the Tailwind color palette
Update `tailwind.config` in the `<head>` of **both** `index.html` and `project.html`. Also update hardcoded hex values in `css/custom.css` (nav states, active link, focus ring, filter active, selection color).

### Change the Google Maps location
Update the iframe `src` URL in `index.html` contact section (~line 496). Format: `https://maps.google.com/maps?q=ADDRESS+HERE&output=embed`

---

## Deployment

1. Push all files to `main` branch
2. GitHub Settings → Pages → Source: "Deploy from a branch" → `main` / `/ (root)` → Save
3. Site live at `https://plam1999.github.io/gapunda-civil/` within 1-2 minutes
4. All paths are relative (`./assets/...`, `./css/...`, `./js/...`) — works from any subdirectory

---

## UX Principles

- **If it's visible, it should be interactive.** Any visual element that looks clickable (arrows, icons, indicators) must be wrapped in a link or button with a clear action. No decorative-only elements that mislead the user.
- **All interactive elements must have hover feedback** (color change, shadow, lift, etc.)
- **No browser-native popups** — all validation and messages are inline.
- **Touch-friendly** — all tap targets minimum 44px.

---

## Known Limitations & Notes

- **Tailwind CDN**: ~300KB JS payload on first load. For production optimization, switch to Tailwind CLI build.
- **Web3Forms**: Free tier = 250 emails/month. Access key is active and configured.
- **Project photos**: All 6 projects use gradient placeholders. Replace with real images when available.
- **About photo**: Placeholder gradient. Replace with company/team photo.
- **Google Maps**: Uses basic query embed. For precise pin, generate embed URL from Google Maps share.
- **SEO**: Basic meta tags and OG tags present. No sitemap.xml or robots.txt.
- **company-logo.jpg**: Old JPG version was deleted. Only PNG (transparent) version exists now at `assets/images/company-logo.png`.
