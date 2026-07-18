export default function TipCard({ tip }) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        tip.type === "good"
          ? "border-green-500"
          : "border-yellow-500"
      }`}
    >
      <h4 className="font-semibold">
        {tip.type === "good" ? "✅ " : "⚠ "}
        {tip.tip}
      </h4>

      {tip.explanation && (
        <p className="text-sm text-muted-foreground mt-2">
          {tip.explanation}
        </p>
      )}
    </div>
  );
}