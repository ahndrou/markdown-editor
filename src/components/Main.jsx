import ContentViewGroup from "./ContentViewGroup";
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
  return (
    <main
      className={`${gridClasses} grid w-full grid-cols-[1fr_2rem_1fr_2rem]`}
    >
      {markdown !== null ? (
        <>
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
        </>
      ) : (
        <span>Empty</span>
      )}
    </main>
  );
}
