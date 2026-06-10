import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { estimateRange } from '../utils';
import MagneticButton from './MagneticButton';
import { useApp } from '../context/AppContext';

const steps = ['Address', 'Property Type', 'Home Details', 'Condition', 'Contact'];

const initialForm = {
  address: '',
  propertyType: 'Estate',
  beds: 4,
  baths: 4,
  sqft: 4000,
  condition: 'Excellent',
  name: '',
  email: '',
  phone: '',
};

export default function ValuationWizard() {
  const { setValuationRequests, showToast } = useApp();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const range = useMemo(
    () => estimateRange({ sqft: Number(form.sqft), beds: Number(form.beds), baths: Number(form.baths), condition: form.condition }),
    [form],
  );

  const canProceed = () => {
    if (step === 0) return form.address.trim().length > 5;
    if (step === 4) return form.name && form.email && form.phone;
    return true;
  };

  const next = () => {
    if (!canProceed()) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const submit = (event) => {
    event.preventDefault();
    setValuationRequests((current) => [
      { ...form, estimateLow: range.low, estimateHigh: range.high, createdAt: new Date().toISOString() },
      ...current,
    ]);
    setSubmitted(true);
    showToast('Your private valuation request has been prepared.');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <form onSubmit={submit} className="rounded-[2rem] border border-charcoal/8 bg-white p-6 shadow-luxe md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Valuation Wizard</div>
            <h3 className="mt-2 font-display text-4xl text-charcoal">Request a Private Home Value</h3>
          </div>
          <div className="rounded-full bg-[var(--ivory)] px-4 py-2 text-sm font-semibold text-charcoal/70">
            Step {step + 1} of {steps.length}
          </div>
        </div>
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {steps.map((label, index) => (
            <div
              key={label}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] ${
                index <= step ? 'bg-charcoal text-white' : 'bg-sand text-charcoal/55'
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {step === 0 ? (
            <Field label="Property Address">
              <input value={form.address} onChange={(e) => setForm((c) => ({ ...c, address: e.target.value }))} className="input" placeholder="Street address" />
            </Field>
          ) : null}

          {step === 1 ? (
            <Field label="Property Type">
              <select value={form.propertyType} onChange={(e) => setForm((c) => ({ ...c, propertyType: e.target.value }))} className="input">
                {['Estate', 'Villa', 'Penthouse', 'Townhouse', 'Condo', 'Development Lot'].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Beds">
                <input type="number" min="0" value={form.beds} onChange={(e) => setForm((c) => ({ ...c, beds: e.target.value }))} className="input" />
              </Field>
              <Field label="Baths">
                <input type="number" min="0" value={form.baths} onChange={(e) => setForm((c) => ({ ...c, baths: e.target.value }))} className="input" />
              </Field>
              <Field label="Sq.Ft.">
                <input type="number" min="0" value={form.sqft} onChange={(e) => setForm((c) => ({ ...c, sqft: e.target.value }))} className="input" />
              </Field>
            </div>
          ) : null}

          {step === 3 ? (
            <Field label="Condition">
              <select value={form.condition} onChange={(e) => setForm((c) => ({ ...c, condition: e.target.value }))} className="input">
                {['Poor', 'Fair', 'Good', 'Excellent', 'New / Rebuilt'].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
          ) : null}

          {step === 4 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name">
                <input value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} className="input" />
              </Field>
              <Field label="Email">
                <input type="email" value={form.email} onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))} className="input" />
              </Field>
              <Field label="Phone">
                <input value={form.phone} onChange={(e) => setForm((c) => ({ ...c, phone: e.target.value }))} className="input md:col-span-2" />
              </Field>
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            className="rounded-full border border-charcoal/10 px-5 py-3 text-sm font-semibold text-charcoal/70 transition hover:border-gold hover:text-gold"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <MagneticButton type="button" onClick={next} className="bg-charcoal text-white">
              Continue
            </MagneticButton>
          ) : (
            <MagneticButton type="submit" className="bg-gold text-white">
              Submit Valuation Request
            </MagneticButton>
          )}
        </div>
      </form>

      <aside className="rounded-[2rem] border border-charcoal/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,245,239,0.96))] p-6 shadow-luxe md:p-8">
        <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Estimated Range</div>
        <div className="mt-4 font-display text-5xl text-charcoal">
          ${Math.round(range.low / 1000000)}M - ${Math.round(range.high / 1000000)}M
        </div>
        <p className="mt-4 text-sm leading-7 text-charcoal/70">
          This is a frontend-only, illustrative estimate based on the data you entered. It is meant to feel premium and
          directional, not replace a full comparative market analysis.
        </p>
        <div className="mt-8 space-y-3">
          {[
            ['Address', form.address || 'Pending'],
            ['Property Type', form.propertyType],
            ['Condition', form.condition],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
              <span className="text-xs uppercase tracking-[0.3em] text-charcoal/45">{label}</span>
              <span className="font-semibold text-charcoal">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-[1.6rem] bg-charcoal p-5 text-white">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-gold">
            <Check size={14} /> Private-client workflow
          </div>
          <p className="mt-3 text-sm leading-7 text-white/78">
            Once you submit the wizard, Kriscel Properties stores the request locally so your mock brokerage journey feels complete.
          </p>
        </div>
        {submitted ? (
          <div className="mt-5 rounded-[1.6rem] border border-gold/20 bg-gold/10 p-4 text-sm text-gold">
            Your private valuation request has been prepared.
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-charcoal/45">{label}</span>
      {children}
    </label>
  );
}
