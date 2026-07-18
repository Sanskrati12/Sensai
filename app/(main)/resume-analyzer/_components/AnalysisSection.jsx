import TipCard from "./TipCard";

export default function AnalysisSection({
  title,
  section,
}) {
  return (
    <div className="rounded-xl border p-6 space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <span className="text-xl font-semibold">
          {section.score}/100
        </span>
      </div>

      <div className="space-y-3">
        {section.tips.map((tip, index) => (
          <TipCard
            key={index}
            tip={tip}
          />
        ))}
      </div>

    </div>
  );
}