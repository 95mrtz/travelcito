import { FC } from 'react';

interface CantItemsProps {
  count: number;
  total: number;
}

const CantItems: FC<CantItemsProps> = ({ count, total }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <section
      className="w-full max-w-4xl mx-auto px-4 py-3"
      aria-live="polite"
      aria-label={`${count} de ${total} ítems empacados`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Progreso
        </span>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {count} / {total}
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </section>
  );
};

export default CantItems;
