import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useApp } from '../context/AppContext';

const initialState = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  notes: '',
};

export default function TourModal() {
  const { tourModal, setTourModal, setTourRequests, showToast } = useApp();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  if (!tourModal) return null;

  const close = () => {
    setTourModal(null);
    setForm(initialState);
    setError('');
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.date) {
      setError('Please complete the required fields.');
      return;
    }

    setTourRequests((current) => [
      { ...form, propertyId: tourModal.id, propertyAddress: tourModal.address, createdAt: new Date().toISOString() },
      ...current,
    ]);
    showToast('Your private tour request has been prepared.');
    close();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[75] grid place-items-center bg-charcoal/35 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
      >
        <motion.div
          className="w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-luxe md:p-8"
          initial={{ y: 28, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 18, opacity: 0, scale: 0.98 }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.38em] text-gold">Schedule Private Tour</div>
              <h3 className="mt-2 font-display text-4xl text-charcoal">{tourModal.address}</h3>
            </div>
            <button type="button" onClick={close} className="grid h-10 w-10 place-items-center rounded-full bg-sand/70 text-charcoal">
              <X size={18} />
            </button>
          </div>

          <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
            {[
              ['Name', 'name'],
              ['Email', 'email'],
              ['Phone', 'phone'],
              ['Preferred Date', 'date'],
              ['Preferred Time', 'time'],
            ].map(([label, key]) => (
              <label key={key} className={key === 'time' ? 'md:col-span-1' : ''}>
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.32em] text-charcoal/50">{label}</span>
                <input
                  type={key === 'email' ? 'email' : key === 'date' ? 'date' : key === 'time' ? 'time' : 'text'}
                  value={form[key]}
                  onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                  className="w-full rounded-2xl border border-charcoal/10 bg-[var(--ivory)] px-4 py-3 outline-none transition focus:border-gold"
                />
              </label>
            ))}
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.32em] text-charcoal/50">Notes</span>
              <textarea
                rows="4"
                value={form.notes}
                onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                className="w-full rounded-3xl border border-charcoal/10 bg-[var(--ivory)] px-4 py-3 outline-none transition focus:border-gold"
                placeholder="Share timing, interests, or privacy preferences."
              />
            </label>
            {error ? <p className="md:col-span-2 text-sm text-red-600">{error}</p> : null}
            <div className="md:col-span-2 flex justify-end">
              <MagneticButton type="submit" className="bg-charcoal text-white">
                Request Private Tour
              </MagneticButton>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
