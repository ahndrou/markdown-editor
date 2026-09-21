export default function EmptyView() {
  return (
    <section className="grid gap-2">
      <h2 className="text-text-accent max-w-prose text-2xl">
        No content to show.{" "}
      </h2>
      <p className="text-text-primary max-w-prose">
        Create a new document using the 'New Document' button in the menu.
      </p>
    </section>
  );
}
