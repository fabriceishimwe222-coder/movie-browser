# Keazy Movie Hub

A React movie & series browser built with Vite and React Router. Content lives in `src/data/movies.js`; favorites and comments are saved in the browser with localStorage. No API or account is required.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

The production files are written to `dist/`. The app includes a home page with featured/latest sections, genre browsing, Movies and Series catalogs with sorting, movie/series detail pages with download links and episodes, a saved watchlist, comments, support/donation pages, and static info pages (About, Contact, Privacy, Terms, Disclaimer, How It Works).

## Add video playback

On a movie's detail page, choose a local video file with the **Choose a video file** button to play it in your browser. The file is not uploaded or added to the build. This works with files on your device, including a large file such as `Carter.mp4`.

You can also set a movie's `videoSrc` in `src/data/movies.js` to a direct URL to a supported video file, or to a file served from the app. For example, put a video in `public/videos/` and use its public path:

```js
videoSrc: "/videos/example.mp4",
```

A movie without a URL still lets you select a local file on its detail page. The app does not host or provide movie files.