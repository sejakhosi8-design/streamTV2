StreamTV - Principles of Web Design group project

Start at index.html (sign up). Demo login: any valid details are accepted.

Pages:   index.html, signin.html, home.html, browse.html, mylist.html, about.html
Styles:  streamtv.css
Data:    movies.json (loaded with the Fetch API), movies.js (built-in fallback copy - keep both the same)
Scripts: data.js (fetch + loading/error messages), list.js (My List + localStorage), home.js, browse.js,
         mylist.js, about.js, guard.js (login wall), script.js (sign up), signin.js (sign in)
Images:  STREAMTV.webp (logo), images/hero.jpg (hero banner), images/posters/ (12 posters, lowercase names)

Note: browsers block fetch() when a page is opened straight from a folder (file://). The site then shows the
built-in catalogue and a message. Fetch works normally on the hosted website or a local server (VS Code Live Server).
