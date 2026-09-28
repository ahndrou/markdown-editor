// react-markdown is used for efficient parsing and rendering of
// markdown into React components.
import MarkdownParser from "react-markdown";

import "../styles/markdown-styles.css";

export default function MarkdownRenderer({ markdown }) {
  return (
    <div className="rendered-markdown">
      <MarkdownParser>{markdown}</MarkdownParser>
    </div>
  );
}
