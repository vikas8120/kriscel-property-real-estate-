import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Villa3D from '../components/Villa3D';
import MagneticButton from '../components/MagneticButton';
import { developmentsData } from '../data/developmentsData';

export default function NewDevelopments() {
  const [selected, setSelected] = useState(developmentsData[0]);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
      <SectionHeading
        eyebrow="New Developments"
        title="Modern luxury launches with immersive presentation and project details."
        description="Each development feels like a premium launch page with visual depth, amenities, and an inquiry-first approach."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="grid gap-5">
          {developmentsData.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelected(project)}
              className={`overflow-hidden rounded-[1.8rem] border bg-white text-left shadow-luxe transition ${
                selected.id === project.id ? 'border-gold' : 'border-charcoal/8'
              }`}
            >
              <div className="grid md:grid-cols-[0.95fr_1.05fr]">
                <img src={project.image} alt={project.name} className="h-full min-h-[260px] w-full object-cover" />
                <div className="p-6">
                  <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">{project.city}</div>
                  <h3 className="mt-3 font-display text-4xl text-charcoal">{project.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal/70">{project.description}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Info label="Price From" value={project.priceFrom} />
                    <Info label="Completion" value={project.completion} />
                    <Info label="Floor Plan" value={project.floorPlan} />
                    <Info label="Amenity Count" value={project.amenities.length} />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-charcoal/8 bg-white p-6 shadow-luxe">
            <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">3D Building Preview</div>
            <div className="mt-4 overflow-hidden rounded-[1.6rem] bg-[var(--ivory)]">
              <Villa3D compact fallbackImage={selected.image} className="min-h-[360px]" />
            </div>
          </div>
          <div className="rounded-[2rem] bg-charcoal p-6 text-white shadow-luxe">
            <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">Amenities</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.amenities.map((amenity) => (
                <span key={amenity} className="rounded-full bg-white/10 px-3 py-2 text-sm text-white">
                  {amenity}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-white/72">
              Project inquiry flows can be attached to floor-plan downloads, direct developer contact, or a private launch list.
            </p>
            <div className="mt-6 flex gap-3">
              <MagneticButton className="bg-gold text-white">Request Inquiry</MagneticButton>
              <MagneticButton className="border border-white/12 bg-white/8 text-white">View Floor Plan</MagneticButton>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-[var(--ivory)] px-4 py-3">
      <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-charcoal/45">{label}</div>
      <div className="mt-1 font-semibold text-charcoal">{value}</div>
    </div>
  );
}
