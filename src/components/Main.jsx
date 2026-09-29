import { useEffect, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import { ShowPreviewIcon, HidePreviewIcon } from "./SVGComponents.jsx";
import { getMarkdownFile } from "@/utils/localStorageUtils";

export default function Main({
  currentFileName,
  contentModifiedRef,
  markdownRef,
}) {
  const [editorOpen, setEditorOpen] = useState(true);

  const [markdown, setMarkdown] = useState(
    () => getMarkdownFile(currentFileName).content,
  );

  useEffect(() => {
    setMarkdown(
      JSON.parse(localStorage.getItem(currentFileName))?.content ?? null,
    );
    contentModifiedRef.current = false;
  }, [currentFileName]);

  useEffect(() => {
    markdownRef.current = markdown;
  }, [markdown]);

  function modifyDocumentContent(newContent) {
    if (newContent !== markdown) {
      contentModifiedRef.current = true;
    }
    setMarkdown(newContent);
  }

  return markdown === null ? (
    <main className="bg-background grid h-full content-center justify-center gap-2">
      <h2 className="text-text-accent max-w-prose text-2xl">
        No content to show.{" "}
      </h2>
      <p className="text-text-primary max-w-prose">
        Create a new document using the 'New Document' button in the menu.
      </p>
    </main>
  ) : (
    <main
      className={`grid h-full ${editorOpen ? "grid-cols-2" : "grid-cols-1"} grid-rows-[auto_1fr]`}
    >
      {editorOpen && (
        <section className="bg-background border-border row-span-2 row-start-1 grid grid-rows-subgrid border-e">
          <h2 className="bg-background-header text-text-secondary text-heading-s row-start-1 p-4 uppercase">
            Markdown
          </h2>
          <textarea
            className="text-text-primary no-resize field-sizing-content w-full p-4 wrap-anywhere focus:outline-none"
            onChange={(e) => modifyDocumentContent(e.target.value)}
            value={markdown}
          ></textarea>
        </section>
      )}

      <section className="bg-background col-end-[-1] row-span-2 row-start-1 grid grid-rows-subgrid">
        <h2 className="bg-background-header text-text-secondary text-heading-s row-start-1 p-4 uppercase">
          Preview
        </h2>
        <div className="p-4">
          <MarkdownRenderer markdown={markdown} />
        </div>
      </section>

      <button
        className="group bg-background-header col-end-[-1] row-start-1 cursor-pointer justify-self-end p-3"
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
