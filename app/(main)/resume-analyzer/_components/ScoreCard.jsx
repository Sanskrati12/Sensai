export default function ScoreCard({ title, score }) {
  return (
    <div className="rounded-xl border bg-card p-6 text-center">
      <h3 className="text-sm text-muted-foreground">
        {title}
      </h3>

      <h1 className="text-5xl font-bold mt-2">
        {score}
      </h1>
    </div>
  );
}