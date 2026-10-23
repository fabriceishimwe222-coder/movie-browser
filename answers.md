# React Project Answers

**What is the difference between props and state?**

Props are values a parent passes into a component. State is data a component owns and updates over time, causing React to render the new value.

**Why does every item in `map()` need a key?**

A key gives each rendered item a stable identity so React can match items between renders and update the correct elements efficiently.

**What does `Outlet` do?**

`Outlet` marks where the active child route renders inside a shared layout. The navigation and footer can stay in place while the page content changes.

**Why does the favorites state live in `App` and not in `Home`?**

Both Discover and Watchlist need the same favorites. Keeping state in their shared parent, `App`, lets it pass the current list and update function to both pages.
