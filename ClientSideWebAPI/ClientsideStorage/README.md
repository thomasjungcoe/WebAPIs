Client-side Storage

Modern web browsers support a number of ways for websites to sotre data on user's computer -- with the user's permission -- then retrieve it when necessary.
This lets you persist data for long-term sotrage, save sites or documents for offline use,
retain user-specific settings for your site, and more.

Objectives:

To learn how to use client-side storage APIs to store application data.

Client-Side Storage?

Most modern websites are 'dynamic' -- they store data on the server using some kind of database (server-side storage), then run server-side code to retrieve needed data, insert it into static page template, and serve the resulting HTML to the client to be displayed by the user's browser.

Client-side storage works in a simliar principle, but different uses.
It consists of JS APIs that allow you to store data on the client and then retrieve it when needed.

- Personalizing ste preferences (user's settings and whatn not)
- Persisting previous site activity (storing contents of shopping cart from previous session, user loggin etc.)
- Saving data and assets locally so a site will be quicker (and potetntially less expensive) to download, and be usable without a netowrk connection
- Saving web application generated documents locally when used offline.

Old School: Cookies

Earliest days of the web, sites have used "cookies" to store information to personalize user experience on websites. There are 'easier' ways to store user data. However, cookies are still used commonly to store data related to user personalization and state., e.g. session IDs and access token.

New School: Web Storage and IndexedDB

- The Web Storage API provides a mechanism for storing and retrieving smaller, data items consisting of a name and coresponding value (user's name, logged in state, background color, etc).
- The IndexedDB provides browser with a complete database system for storing complex data (audio and video)

The Cache API

The Cache API is designed for storing HTTP responses to specific requests, and is very useful for doing thigns like storing web assets offline so the site can subsequently be used without a network connection. The Cache API is usually used in combination with the 'Service Worker API', although it doesn't have to be.

Storing Simple data -- web storage

you store simple name/value pairs of data (limtied to strings, numbers, etc) and retrieve these values when needed.

Basic Syntax
