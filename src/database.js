/*
 * A toy database which uses localStorage.
 *
 * This app also uses localStorage for storing theme settings,
 * and so this class intends to act as an interface which isolates
 * the database part and acts as a nice interface.
 */

import { getCurrentDate } from "./utils/generalUtils";

// localStorage also contains other, non-database properties such as
// theme settings. This prefix should prevent collisions with those.
const PREFIX = "DB:";

/**
 * Adds a new, empty document to the database.
 * @param name Name to be given to the new document.
 */
export function addNewDocument(name) {
  const newDocument = {
    name: name,
    createdAt: getCurrentDate(),
    content: "# New Document",
  };

  addDocument(newDocument);
}

/**
 * Adds a default document into the database.
 */
export function initialize() {
  const defaultDocument = {
    name: "welcome.md",
    createdAt: getCurrentDate(),
    content:
      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
  };

  addDocument(defaultDocument);
}

function addDocument(documentObj) {
  localStorage.setItem(createID(), JSON.stringify(documentObj));
}

function createID() {
  // Math.random is fine in a toy project like this one. Security isn't a concern.
  // Exponent is just to remove the fractional part.
  return `${PREFIX}${Math.random() * 10 ** 17}`;
}
