import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Dialog from './ui/Dialog';
import Select from './ui/Select';
import Textarea from './ui/Textarea';
import Button from './ui/Button';

export default function ReportUserModal({ isOpen, onClose, userName = 'User' }) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setReason('');
      setDescription('');
      onClose();
    }, 800);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Report User" size="md">
      <div className="space-y-4">
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Report {userName}</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Your report will be reviewed by our moderation team. False reports may result in account restrictions.
            </p>
          </div>
        </div>

        <Select
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="">Select a reason...</option>
          <option value="inappropriate">Inappropriate Behavior</option>
          <option value="harassment">Harassment</option>
          <option value="spam">Spam or Scam</option>
          <option value="fake">Fake Profile</option>
          <option value="no-show">Repeated No-Shows</option>
          <option value="offensive">Offensive Content</option>
          <option value="other">Other</option>
        </Select>

        <Textarea
          label="Description"
          placeholder="Please provide details about what happened..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          helper="Include any relevant details such as dates, messages, or session IDs."
          rows={4}
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            variant="danger"
            onClick={handleSubmit}
            loading={submitting}
            disabled={!reason}
          >
            Submit Report
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
