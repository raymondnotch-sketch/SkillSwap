import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Calendar, Mail, Building2, CheckCircle2, X, ExternalLink } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

const verificationQueue = [
  {
    id: 1,
    studentName: 'Sarah Kim',
    avatar: 'SK',
    university: 'Stanford University',
    email: 'sarah.kim@stanford.edu',
    submittedDate: '2026-07-05',
    documentType: 'Student ID Card',
    status: 'pending',
  },
  {
    id: 2,
    studentName: 'James Chen',
    avatar: 'JC',
    university: 'MIT',
    email: 'james.chen@mit.edu',
    submittedDate: '2026-07-05',
    documentType: 'Enrollment Letter',
    status: 'pending',
  },
  {
    id: 3,
    studentName: 'Maria Garcia',
    avatar: 'MG',
    university: 'Harvard University',
    email: 'maria.garcia@harvard.edu',
    submittedDate: '2026-07-04',
    documentType: 'Student ID Card',
    status: 'pending',
  },
  {
    id: 4,
    studentName: 'Emily Davis',
    avatar: 'ED',
    university: 'UC Berkeley',
    email: 'emily.davis@berkeley.edu',
    submittedDate: '2026-07-04',
    documentType: 'Transcript',
    status: 'pending',
  },
  {
    id: 5,
    studentName: 'Alex Johnson',
    avatar: 'AJ',
    university: 'Yale University',
    email: 'alex.johnson@yale.edu',
    submittedDate: '2026-07-03',
    documentType: 'Student ID Card',
    status: 'pending',
  },
];

export default function VerificationQueue() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All', count: 5 },
    { key: 'pending', label: 'Pending', count: 5 },
    { key: 'approved', label: 'Approved', count: 0 },
    { key: 'rejected', label: 'Rejected', count: 0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 px-8 py-10"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Queue Header with Count Badge */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <ShieldCheck className="h-10 w-10 text-amber-600" />
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
              Verification Queue
            </h1>
            <Badge className="bg-amber-100 text-amber-700 ring-2 ring-amber-200 px-5 py-2 text-base font-bold">
              {verificationQueue.length} Pending
            </Badge>
          </div>
          <p className="text-lg text-neutral-600">
            Review student verification submissions and approve or reject applications
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card className="p-6 shadow-xs border-neutral-200 bg-white">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-amber-50 p-4">
                <ShieldCheck className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-neutral-900">{verificationQueue.length}</p>
                <p className="text-sm font-medium text-neutral-600 mt-1">Pending Reviews</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-xs border-neutral-200 bg-white">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-50 p-4">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-neutral-900">142</p>
                <p className="text-sm font-medium text-neutral-600 mt-1">Approved This Week</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-xs border-neutral-200 bg-white">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-rose-50 p-4">
                <X className="h-8 w-8 text-rose-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-neutral-900">8</p>
                <p className="text-sm font-medium text-neutral-600 mt-1">Rejected This Week</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Pending Verification Cards */}
        <div className="space-y-6">
          {verificationQueue.map((verification, index) => (
            <motion.div
              key={verification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="p-8 shadow-xs border-neutral-200 bg-white hover:border-neutral-300 transition-colors">
                <div className="space-y-6">
                  {/* Header Section */}
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-5">
                      <Avatar initials={verification.avatar} size="xl" className="ring-4 ring-neutral-100" />
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-neutral-900">{verification.studentName}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-neutral-400" />
                            <span className="font-medium">{verification.university}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-neutral-400" />
                            <span className="font-medium">{verification.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 ring-1 ring-amber-200 px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                      <span className="mr-2 h-2 w-2 rounded-full bg-amber-500 inline-block animate-pulse" />
                      {verification.status}
                    </Badge>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="h-5 w-5 text-neutral-400" />
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                          Document Type
                        </p>
                      </div>
                      <p className="text-lg font-bold text-neutral-900">{verification.documentType}</p>
                      <button className="mt-3 flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                        View Document
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="h-5 w-5 text-neutral-400" />
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                          Submitted Date
                        </p>
                      </div>
                      <p className="text-lg font-bold text-neutral-900">
                        {new Date(verification.submittedDate).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                      <p className="mt-2 text-sm text-neutral-600">
                        {Math.floor((new Date() - new Date(verification.submittedDate)) / (1000 * 60 * 60 * 24))} days ago
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 py-4 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      Approve Verification
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 py-4 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <X className="h-5 w-5" />
                      Reject Verification
                    </Button>
                  </div>

                  {/* Additional Actions */}
                  <div className="flex gap-3 border-t-2 border-neutral-100 pt-5">
                    <button className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors">
                      <Mail className="h-4 w-4" />
                      Contact Student
                    </button>
                    <span className="text-neutral-200">|</span>
                    <button className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors">
                      <FileText className="h-4 w-4" />
                      Request More Info
                    </button>
                    <span className="text-neutral-200">|</span>
                    <button className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                      View Full Profile
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State (hidden when there are items) */}
        {verificationQueue.length === 0 && (
          <Card className="p-16 text-center shadow-xs border-neutral-200 bg-white">
            <ShieldCheck className="mx-auto h-16 w-16 text-neutral-300 mb-6" />
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">All Caught Up!</h3>
            <p className="text-base text-neutral-600">
              There are no pending verifications to review at this time.
            </p>
          </Card>
        )}
      </div>

      <Card className="p-0">
        <VerificationTable />
      </Card>
    </motion.div>
  );
}
