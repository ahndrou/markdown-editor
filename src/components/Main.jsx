import { useState } from "react";
import EmptyView from "./EmptyView";
import MarkdownRenderer from "./MarkdownRenderer";
import { ShowPreviewIcon, HidePreviewIcon } from "./SVGComponents.jsx";

export default function Main({ markdown, setMarkdown }) {
  const [editorOpen, setEditorOpen] = useState(true);

  return markdown === null ? (
    <main className="bg-background grid h-full content-center justify-center">
      <EmptyView />
    </main>
  ) : (
    <main
      className={`grid h-full ${editorOpen ? "grid-cols-2" : ""} grid-rows-[auto_1fr]`}
    >
      {editorOpen && (
        <section className="bg-background border-border row-span-2 row-start-1 grid grid-rows-subgrid border-e">
          <h2 className="bg-background-header text-text-secondary text-heading-s row-start-1 p-4 uppercase">
            Markdown
          </h2>
          <textarea
            className="text-text-primary no-resize field-sizing-content w-full p-4 wrap-anywhere focus:outline-none"
            onChange={(e) => setMarkdown(e.target.value)}
            value={markdown}
          ></textarea>
        </section>
      )}

      <section className="bg-background col-start-2 row-span-2 row-start-1 grid grid-rows-subgrid">
        <h2 className="bg-background-header text-text-secondary text-heading-s row-start-1 p-4 uppercase">
          Preview
        </h2>
        <div className="p-4">
          <MarkdownRenderer markdown={markdown} />
        </div>
      </section>

      <button
        className="group bg-background-header col-start-2 row-start-1 cursor-pointer justify-self-end p-3"
        onClick={() => setEditorOpen(!editorOpen)}
      >
        {editorOpen ? (
          <HidePreviewIcon className="fill-text-secondary group-hover:fill-orange" />
        ) : (
          <ShowPreviewIcon className="fill-text-secondary group-hover:fill-orange" />
        )}
      </button>
    </main>
  );
}
