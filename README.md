# Markdown Editor

## An in-browser editor for Markdown.

---

Create and edit Markdown directly in the browser with a real-time preview - no need for any installation - try it [here!](https://markdown-editor-ecru-six.vercel.app/)

Created as an implementation of the design by Frontend Masters, for the challenge ["In-browser markdown editor"](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9).

### Features

Create, save and rename documents, with actions persisted between sessions using the browser's localStorage.

Other features:

- Toggle between light and dark themes (setting is persisted between sessions also).
- Toggle full-screen preview of parsed Markdown.
- Responsive design with views for mobile, tablet and desktop.

### What is Markdown?

[Markdown](https://en.wikipedia.org/wiki/Markdown) is a lightweight mark up language, designed to be easily readable and editable in its raw form. Markup languages are used to specify the layout and formatting of text.

Markdown is widely used, allowing for the easy creation of good looking, well formatted documents by using some simple syntax. Many applications which allow for user-generated text content provide Markdown support as a means to create well-formatted, good looking content. GitHub for example supports Markdown; this readme is written in Markdown and was created using this application!

Here is a small section of raw Markdown:

```
# A heading

A paragraph

## A second-level heading

> A block quote.
```

The prefixes here denote (mark up) the formatting for the following text. For more information on the syntax and available formatting, check [here](https://www.markdownguide.org/basic-syntax/#blockquotes-1).

### Instructions for use

#### User

Simply visit the live website [here.](https://markdown-editor-ecru-six.vercel.app/) The application comes with a default Markdown document with some instructions to get you going with some basic Markdown syntax.

#### Dev

##### Prerequisites

This project uses NPM (Node Package Manager) to manage its dependencies. You can get this by installing Node.

---

With NPM installed, `git clone` this repo, navigate to the directory and run `npm install`. Once this has completed, run `npm run dev` to run the application on `localHost`.

### Implementation

Built using **React**, **Vite**, **TailwindCSS** and **Shadcn**.

**tw-merge** has been extended to work with the custom Tailwind theme used; I diverged from the normal naming conventions for font size theme variables, and so had to configure this so it doesn't produce conflicts between my color and font sizes utility classes - this was producing the effect that only one of the given applied classes was applied.

**react-markdown** was used to safely parse user-generated markdown and display it as HTML.

### Potential Improvements

#### Database

localStorage is currently used for persistence of documents between sessions. Using a proper database on the backend would allow for more reliable storage. The current implementation is prone to loss of data which can occur if the browser localStorage is reset. There is also no way to access documents between browsers.

#### Refactoring & Performance

The component structure could be refined and cleaned up somewhat. Also, whilst there are currently no visible performance issues, an exercise might be to improve performance by checking for and preventing unnecessary renders for example. This could be done using the React profiler in the browser dev tools.

#### Additional Features: Folders & Sorting

In real-world use cases, a user might have a lot of documents. Adding a folder/directory structure would allow for grouping of related documents. An ability to sort documents by creation date/name would also be useful.
