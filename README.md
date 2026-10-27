# Isiaka Opeyemi | Student Portfolio and Academic Management Website

**Course:** COS 106, Introduction to Web Technologies
**Institution:** Miva Open University
**Student:** Isiaka Opeyemi
**Email:** l.isiaka8925@miva.edu.ng

A five-page responsive portfolio written by hand in HTML, CSS and JavaScript. No frameworks, no build tools. Designed as a magazine issue: deep green pages, cream type, saffron accents, a condensed display face for headlines and an italic serif for pull quotes.

## Pages

| File | Contents |
| --- | --- |
| `index.html` | Name and photograph, welcome message, navigation, brief biography, featured projects, intro video, planner preview |
| `about.html` | Educational background, career aspirations, technical skills table, hobbies and interests |
| `projects.html` | Four projects with images, descriptions, links and a summary table |
| `planner.html` | Interactive academic planner: add, complete, filter and delete tasks |
| `contact.html` | Contact form with JavaScript validation, plus direct contact details |

## Folder structure

```
Isiaka-Portfolio/
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── README.md
├── css/
│   └── style.css        the single external stylesheet
├── js/
│   ├── main.js          mobile menu, active link, scroll reveals, footer year
│   ├── planner.js       task array, add / complete / delete, filters, storage
│   └── contact.js       form validation rules
├── images/              photograph, project covers, video poster
└── media/
    └── intro.mp4        the multimedia element on the homepage
```

Images are also embedded directly in the HTML so they always display, even if a file is renamed during download.

## How the brief is covered

**HTML.** Semantic structure throughout (`header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `figcaption`, `blockquote`, `time`, `dl`, `footer`). Forms on the planner and contact pages. Tables for skills and the project summary. Images with descriptive `alt` text. Internal and external hyperlinks. Ordered and unordered lists. A `<video>` element on the homepage.

**CSS.** One external stylesheet. A consistent colour scheme defined as custom properties. CSS Grid and Flexbox layouts. Styled navigation that becomes a full-screen menu on phones. Transitions on every interactive element and keyframe animations for the page load, marquee and planner. Breakpoints at 1080px, 880px and 640px, so every page works on a phone.

**JavaScript.** Event handling (click, submit, change, input, blur, keydown, resize). DOM manipulation (tasks are built and removed at runtime). Form validation (no empty fields, valid email format, digits-only phone number). Dynamic content (counters, progress bar and filters update live). Arrays and functions throughout. A complete task management system with browser storage.

## Run it locally

Double-click `index.html`, or serve the folder:

```bash
python -m http.server 8000
```

then open `http://localhost:8000`.

## Hosting on GitHub Pages

1. Upload the contents of this folder to the root of the repository, keeping the subfolders.
2. Open **Settings → Pages**.
3. Under **Source** choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After a minute the site is live at `https://tareed-tech.github.io/Isiaka-Portfolio/`.

## Notes

1. The contact form validates in the browser only and does not send email. The page says so.
2. The planner stores tasks in `localStorage`, so the list survives a reload in the same browser.
3. Fonts load from Google Fonts: Anton, Fraunces and Manrope.
