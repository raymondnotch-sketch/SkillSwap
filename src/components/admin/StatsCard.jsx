import Card from '../ui/Card';

export default function StatsCard({ icon: Icon, label, value, trend, color = 'text-neutral-900' }) {
  return (
    <Card hover className="p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        {trend && (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            trend.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-neutral-900">{value}</p>
      <p className="mt-1 text-sm text-neutral-500">{label}</p>
    </Card>
  );
}
