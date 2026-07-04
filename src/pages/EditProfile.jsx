import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Camera, X, Plus, Check } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import { useAuth } from '../hooks/useAuth';

export default function EditProfile() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({
    firstName: 'Alex',
    lastName: 'Chen',
    email: user?.email || 'alex@skillswap.dev',
    university: 'Stanford University',
    department: 'Computer Science',
    academicLevel: 'Senior',
    bio: 'Passionate computer science student with a love for teaching and learning.',
  });

  const [skillsOffered, setSkillsOffered] = useState(['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Git']);
  const [skillsWanted, setSkillsWanted] = useState(['Python', 'UI/UX Design', 'Node.js', 'GraphQL']);
  const [newOfferedSkill, setNewOfferedSkill] = useState('');
  const [newWantedSkill, setNewWantedSkill] = useState('');
  const [availability, setAvailability] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [idPreview, setIdPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day) => {
    setAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addSkill = (type) => {
    if (type === 'offered' && newOfferedSkill.trim()) {
      setSkillsOffered((prev) => [...prev, newOfferedSkill.trim()]);
      setNewOfferedSkill('');
    } else if (type === 'wanted' && newWantedSkill.trim()) {
      setSkillsWanted((prev) => [...prev, newWantedSkill.trim()]);
      setNewWantedSkill('');
    }
  };

  const removeSkill = (type, skill) => {
    if (type === 'offered') setSkillsOffered((prev) => prev.filter((s) => s !== skill));
    else setSkillsWanted((prev) => prev.filter((s) => s !== skill));
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleIdSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setIdPreview(URL.createObjectURL(file));
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Profile updated successfully');
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-3xl mx-auto"
    >
      <div className="space-y-6">
        <Card>
          <h2 className="text-sm font-semibold text-neutral-900 mb-1">Profile Photo</h2>
          <p className="text-xs text-neutral-500 mb-4">This will be displayed on your profile.</p>
          <div className="flex items-center gap-4">
            <div className="relative">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="h-20 w-20 rounded-full object-cover" />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <Camera className="h-8 w-8" />
                </div>
              )}
            </div>
            <label className="cursor-pointer">
              <Button variant="outline" size="sm" icon={Upload} as="span">Upload Photo</Button>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoSelect} />
            </label>
            {photoPreview && (
              <Button variant="ghost" size="sm" icon={X} onClick={() => setPhotoPreview(null)}>Remove</Button>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="First Name" value={form.firstName} onChange={handleChange('firstName')} />
            <Input label="Last Name" value={form.lastName} onChange={handleChange('lastName')} />
            <Input label="Email" type="email" value={form.email} onChange={handleChange('email')} disabled />
            <Input label="University" value={form.university} onChange={handleChange('university')} />
            <Input label="Department" value={form.department} onChange={handleChange('department')} />
            <Select label="Academic Level" value={form.academicLevel} onChange={handleChange('academicLevel')}>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Graduate">Graduate</option>
              <option value="PhD">PhD</option>
            </Select>
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">Bio</h2>
          <Textarea
            label="About Me"
            value={form.bio}
            onChange={handleChange('bio')}
            helper={`${form.bio.length}/500 characters`}
            rows={4}
          />
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">Availability</h2>
          <p className="text-xs text-neutral-500 mb-3">Select the days you are available for sessions.</p>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors ${
                  availability.includes(day)
                    ? 'border-primary-300 bg-primary-50 text-primary-700'
                    : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {availability.includes(day) && <Check className="h-3.5 w-3.5" />}
                {day}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">Skills Offered</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {skillsOffered.map((skill) => (
              <Badge key={skill} color="primary" variant="outline">
                <span className="flex items-center gap-1">
                  {skill}
                  <button onClick={() => removeSkill('offered', skill)} className="ml-0.5 rounded-full hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill..."
              value={newOfferedSkill}
              onChange={(e) => setNewOfferedSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill('offered')}
            />
            <Button variant="outline" size="icon" icon={Plus} onClick={() => addSkill('offered')} />
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">Skills Wanted</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {skillsWanted.map((skill) => (
              <Badge key={skill} color="secondary" variant="outline">
                <span className="flex items-center gap-1">
                  {skill}
                  <button onClick={() => removeSkill('wanted', skill)} className="ml-0.5 rounded-full hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill..."
              value={newWantedSkill}
              onChange={(e) => setNewWantedSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill('wanted')}
            />
            <Button variant="outline" size="icon" icon={Plus} onClick={() => addSkill('wanted')} />
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">Student ID Verification</h2>
          <p className="text-xs text-neutral-500 mb-4">Upload your student ID to get verified.</p>
          {idPreview ? (
            <div className="mb-4">
              <img src={idPreview} alt="Student ID" className="h-32 rounded-xl border object-cover" />
              <button onClick={() => setIdPreview(null)} className="mt-2 text-xs text-danger-600 hover:text-danger-700">
                Remove
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-neutral-200 p-6 transition-colors hover:border-primary-300 hover:bg-primary-50/30">
              <Upload className="h-6 w-6 text-neutral-400" />
              <p className="text-sm text-neutral-500">Click to upload your student ID</p>
              <input type="file" accept="image/*" className="hidden" onChange={handleIdSelect} />
            </label>
          )}
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Link to="/profile">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSave} loading={saving}>Save Changes</Button>
        </div>
      </div>
    </motion.div>
  );
}
