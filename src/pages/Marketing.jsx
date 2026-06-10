import SectionHeading from '../components/SectionHeading';
import MagneticButton from '../components/MagneticButton';

const items = [
  ['Photography', 'Editorial stills that feel like a magazine spread.'],
  ['Cinematic Video', 'Wide, slow, atmospheric property video cuts.'],
  ['Drone Tours', 'Aerial perspectives for estates and waterfront homes.'],
  ['3D Walkthroughs', 'Immersive digital tours that guide buyer imagination.'],
  ['Private Buyer Network', 'Select distribution to qualified client pools.'],
  ['Global Syndication', 'International reach with a luxury presentation layer.'],
];

export default function Marketing() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
      <SectionHeading
        eyebrow="Marketing"
        title="Bespoke marketing designed to feel as polished as the property itself."
        description="This page emphasizes process, imagery, and premium deliverables instead of generic service-list copy."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] overflow-hidden bg-white shadow-luxe">
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury interior"
            className="h-[420px] w-full object-cover"
          />
          <div className="p-6 md:p-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Cinematic Property Video</div>
            <p className="mt-4 text-sm leading-7 text-charcoal/72">
              The visual language balances warm light, dramatic framing, and a restrained luxury aesthetic.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-charcoal p-6 text-white shadow-luxe md:p-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Marketing Process</div>
          <div className="mt-6 space-y-4">
            {[
              'Pre-launch strategy and positioning',
              'Production and editorial asset creation',
              'Private network launch and buyer outreach',
              'Social, print, and international syndication',
              'Reporting, feedback, and optimized relaunch',
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-2xl bg-white/8 px-4 py-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-white">{index + 1}</div>
                <span className="text-sm leading-6 text-white/78">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map(([title, description]) => (
          <div key={title} className="rounded-[1.8rem] border border-charcoal/8 bg-white p-6 shadow-luxe">
            <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">{title}</div>
            <p className="mt-4 text-sm leading-7 text-charcoal/70">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[2rem] bg-[linear-gradient(135deg,rgba(248,245,239,0.95),rgba(255,255,255,0.96))] p-8 shadow-luxe">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Ready to launch</div>
            <h2 className="mt-3 font-display text-5xl text-charcoal">Bespoke campaign planning.</h2>
          </div>
          <MagneticButton className="bg-charcoal text-white">Request Marketing Plan</MagneticButton>
        </div>
      </div>
    </div>
  );
}
