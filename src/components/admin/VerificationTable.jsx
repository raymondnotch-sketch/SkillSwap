import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Dialog from '../ui/Dialog';
import * as adminService from '../../services/admin';

export default function VerificationTable() {
  const [pendingList, setPendingList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [approving, setApproving] = useState({});
  const [rejecting, setRejecting] = useState({});

  useEffect(() => {
    async function load() {
      const data = await adminService.getPendingVerifications();
      setPendingList(Array.isArray(data) ? data : []);
    }
    load();
  }, []);

  const handleApprove = async (id) => {
    setApproving((p) => ({ ...p, [id]: true }));
    try {
      await adminService.approveVerification(id);
      setPendingList((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      console.warn('Approve failed:', e);
    } finally {
      setApproving((p) => ({ ...p, [id]: false }));
    }
  };

  const handleReject = async (id) => {
    setRejecting((p) => ({ ...p, [id]: true }));
    try {
      await adminService.rejectVerification(id);
      setPendingList((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      console.warn('Reject failed:', e);
    } finally {
      setRejecting((p) => ({ ...p, [id]: false }));
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-left">
              <th className="pb-3 pl-4 pr-3 font-medium text-neutral-500">User</th>
              <th className="hidden pb-3 px-3 font-medium text-neutral-500 sm:table-cell">University</th>
              <th className="hidden pb-3 px-3 font-medium text-neutral-500 md:table-cell">Submitted</th>
              <th className="hidden pb-3 px-3 font-medium text-neutral-500 lg:table-cell">Student ID</th>
              <th className="pb-3 pr-4 pl-3 font-medium text-neutral-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {pendingList.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-xs text-neutral-500">
                  No pending verifications.
                </td>
              </tr>
            ) : (
              pendingList.map((v) => (
                <tr key={v.id} className="transition-colors hover:bg-neutral-50/50">
                  <td className="py-3 pl-4 pr-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={v.full_name ? v.full_name.slice(0, 2).toUpperCase() : 'U'} size="sm" />
                      <div>
                        <p className="font-medium text-neutral-900">{v.full_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-3 px-3 text-neutral-600 sm:table-cell">{v.school}</td>
                  <td className="hidden py-3 px-3 text-neutral-500 md:table-cell">
                    {v.created_at ? new Date(v.created_at).toLocaleDateString() : 'Recent'}
                  </td>
                  <td className="hidden py-3 px-3 lg:table-cell">
                    {v.student_id_url ? (
                      <button
                        onClick={() => setSelectedId(v.student_id_url)}
                        className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-primary-600 transition-colors hover:bg-primary-50"
                      >
                        <Eye className="h-3 w-3" />
                        View ID
                      </button>
                    ) : (
                      <span className="text-xs text-neutral-400">No document</span>
                    )}
                  </td>
                  <td className="py-3 pr-4 pl-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        icon={XCircle}
                        onClick={() => handleReject(v.id)}
                        loading={rejecting[v.id]}
                      >
                        <span className="hidden sm:inline">Reject</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="success"
                        icon={CheckCircle}
                        onClick={() => handleApprove(v.id)}
                        loading={approving[v.id]}
                      >
                        <span className="hidden sm:inline">Approve</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog isOpen={!!selectedId} onClose={() => setSelectedId(null)} title="Student ID Preview" size="lg">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-48 w-full items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50">
            <p className="text-sm text-neutral-400">Student ID: {selectedId}</p>
          </div>
          <p className="text-xs text-neutral-500 text-center">
            This is a placeholder for the student ID image. In production, this would display the uploaded student ID photo for verification.
          </p>
        </div>
      </Dialog>
    </>
  );
}
