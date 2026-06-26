import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
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

      <div className="mt-10">
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
