# Student Portfolio and Academic Management Website

My term project for COS 106, Introduction to Web Technologies, at Miva Open University.

**Live site:** https://tareed-tech.github.io/Isiaka-Portfolio/

Five pages built with HTML, CSS and JavaScript. No frameworks and no build step.

## Pages

| File | What it holds |
| --- | --- |
| `index.html` | Photo, welcome message, biography, featured projects, intro video |
| `about.html` | Education, career goals, skills table, hobbies |
| `projects.html` | Four projects with images and a summary table |
| `planner.html` | Task planner: add, complete, filter and delete |
| `contact.html` | Contact form with validation |

## Structure

```
css/style.css     one stylesheet for all five pages
js/main.js        navigation and scroll effects
js/planner.js     the task planner
js/contact.js     form validation
images/           photo, project covers, video poster
media/intro.mp4   the video on the homepage
```

## Notes on the build

The planner keeps tasks in a single array and redraws the list whenever that array changes. Adding, completing and deleting are separate functions. The list is saved to `localStorage` after every change, so it is still there when you come back.

The contact form checks each field with a regular expression: the name must be letters, the email must match a standard address pattern, and the phone number must be 10 to 15 digits with nothing else. The rules are commented in `js/contact.js`. Validation runs when you leave a field and again when you submit.

The layout uses CSS Grid and Flexbox with three breakpoints. On phones the navigation becomes a full-screen menu.

The form only validates. It does not send email, and the page says so.

## Running it

Open `index.html` in a browser, or run `python -m http.server 8000` in this folder and go to `http://localhost:8000`.

---

Isiaka Opeyemi
l.isiaka8925@miva.edu.ng
