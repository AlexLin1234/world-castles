import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/constants';
import type { CastleCategory } from '@/lib/schema';

interface Props {
  category: CastleCategory;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({ category, size = 'sm' }: Props) {
  const color = CATEGORY_COLORS[category];
  const label = CATEGORY_LABELS[category];

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
      style={{
        background: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
