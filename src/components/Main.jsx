import { useState } from "react";
import EmptyView from "./EmptyView";
import MarkdownRenderer from "./MarkdownRenderer";
import PreviewToggle from "./PreviewToggle";

export default function Main({ markdown, setMarkdown }) {
  const [editorOpen, setEditorOpen] = useState(true);

  return markdown === null ? (
    <main className="bg-background grid content-center justify-center">
      <EmptyView />
    </main>
  ) : (
    <main className="grid w-full grid-cols-[1fr_2rem_1fr_2rem]">
      <PreviewToggle
        fullWidthPreview={editorOpen}
        setPreviewVisible={setEditorOpen}
        className="col-start-4"
      />

      {editorOpen && (
        <section className="bg-background">
          <h2 className="bg-background-header text-text-secondary text-heading-s p-3 uppercase">
            Markdown
          </h2>
          <textarea
            className="text-text-primary no-resize field-sizing-content w-full wrap-anywhere focus:outline-none"
            onChange={(e) => setMarkdown(e.target.value)}
            value={markdown}
          ></textarea>
        </section>
      )}

      <section className="bg-background">
        <h2 className="bg-background-header text-text-secondary text-heading-s p-3 uppercase">
          Preview
        </h2>
        <MarkdownRenderer markdown={markdown} />
      </section>
    </main>
  );
}
