import ContentViewGroup from "./ContentViewGroup";
import EmptyView from "./EmptyView";
import PreviewToggle from "./PreviewToggle";

export default function Main({
  fullWidthPreview,
  setFullWidthPreview,
  currentFileIndex,
  markdown,
  setMarkdown,
  gridPosition,
}) {
  const gridClasses = `col-start-${gridPosition.col} row-start-${gridPosition.row}`;
  return markdown === null ? (
    <main className="bg-background grid content-center justify-center">
      <EmptyView />
    </main>
  ) : (
    <main
      className={`${gridClasses} grid w-full grid-cols-[1fr_2rem_1fr_2rem]`}
    >
      <PreviewToggle
        fullWidthPreview={fullWidthPreview}
        setPreviewVisible={setFullWidthPreview}
        className="col-start-4"
      />

      <ContentViewGroup
        key={currentFileIndex}
        fullWidthPreview={fullWidthPreview}
        fileIndex={currentFileIndex}
        markdown={markdown}
        setMarkdown={setMarkdown}
      />
    </main>
  );
}
