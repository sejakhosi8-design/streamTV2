StreamTV - Principles of Web Design group project

Start at index.html (the Home page). Signing in is optional (demo only): any valid details are accepted.

Pages:   index.html (Home), browse.html, mylist.html, about.html, signin.html, signup.html
Styles:  streamtv.css
Data:    movies.json (loaded with the Fetch API), movies.js (built-in fallback copy - keep both the same)
Scripts: nav.js (Sign in / Log out, Back button support, header search), validate.js (name rules),
         data.js (fetch + loading/error messages + video links), list.js (My List + localStorage),
         cards.js (movie cards and the details/video pop-up, used on every page),
         home.js, browse.js, mylist.js, about.js, script.js (sign up), signin.js (sign in)
Images:  STREAMTV.webp (logo), hero.jpg (hero banner) and the 12 poster .jpg files, all in the main folder

Note: browsers block fetch() when a page is opened straight from a folder (file://). The site then shows the
built-in catalogue and a message. Fetch works normally on the hosted website or a local server (VS Code Live Server).
