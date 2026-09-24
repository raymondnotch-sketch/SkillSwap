import { useState, useEffect } from 'react';
import { AlertTriangle, Eye, ShieldOff, Ban, VolumeX, CheckCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import * as adminService from '../../services/admin';

export default function ReportsTable() {
  const [reportsList, setReportsList] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await adminService.getReports();
      setReportsList(Array.isArray(data) ? data : []);
    }
    load();
  }, []);

  const handleResolve = async (id, status = 'resolved') => {
    await adminService.resolveReport(id, status);
    setReportsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-100 text-left">
            <th className="pb-3 pl-4 pr-3 font-medium text-neutral-500">Reporter</th>
            <th className="pb-3 px-3 font-medium text-neutral-500">Reported</th>
            <th className="hidden pb-3 px-3 font-medium text-neutral-500 sm:table-cell">Reason</th>
            <th className="hidden pb-3 px-3 font-medium text-neutral-500 md:table-cell">Priority</th>
            <th className="hidden pb-3 px-3 font-medium text-neutral-500 lg:table-cell">Status</th>
            <th className="pb-3 pr-4 pl-3 font-medium text-neutral-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {reportsList.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-8 text-center text-xs text-neutral-500">
                No reports found.
              </td>
            </tr>
          ) : (
            reportsList.map((r) => (
              <tr key={r.id} className="transition-colors hover:bg-neutral-50/50">
                <td className="py-3 pl-4 pr-3">
                  <p className="font-medium text-neutral-900">{r.reporter_id || r.reporter || 'User'}</p>
                  <p className="text-xs text-neutral-500">{r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Recent'}</p>
                </td>
                <td className="py-3 px-3 font-medium text-neutral-900">{r.reported_id || r.reported || 'User'}</td>
                <td className="hidden py-3 px-3 text-neutral-600 sm:table-cell">{r.reason}</td>
                <td className="hidden py-3 px-3 md:table-cell">
                  <Badge color="warning" variant="solid">{r.priority || 'normal'}</Badge>
                </td>
                <td className="hidden py-3 px-3 lg:table-cell">
                  <Badge color={r.status === 'resolved' ? 'success' : 'primary'} variant="outline">{r.status || 'open'}</Badge>
                </td>
                <td className="py-3 pr-4 pl-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" icon={Eye} onClick={() => setExpanded(expanded === r.id ? null : r.id)} aria-label="View details" />
                    {r.status !== 'resolved' && (
                      <Button variant="ghost" size="icon" icon={CheckCircle} onClick={() => handleResolve(r.id, 'resolved')} aria-label="Resolve report" />
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
