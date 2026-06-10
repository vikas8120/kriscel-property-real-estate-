import SectionHeading from '../components/SectionHeading';

const team = [
  ['Mara Ellison', 'Founder / Principal Broker'],
  ['Julian Hart', 'Private Client Advisor'],
  ['Isla Navarro', 'Market Strategist'],
  ['Amina Rahal', 'Global Development'],
];

export default function About() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
      <SectionHeading
        eyebrow="About Broker"
        title="A luxury brokerage profile with founder story, awards, and global presence."
        description="The page feels like a polished personal brand site with a cinematic portrait panel, values, and a premium network narrative."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[2rem] bg-white shadow-luxe">
          <img
            src="https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=1200&q=80"
            alt="Broker portrait"
            className="h-[420px] w-full rounded-t-[2rem] object-cover"
          />
          <div className="p-6 md:p-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Founder Story</div>
            <p className="mt-4 text-sm leading-7 text-charcoal/72">
              Kriscel Properties represents a refined approach to luxury real estate: discreet, highly curated, and focused on
              client trust. The storytelling is intentionally cinematic, balancing editorial elegance with practical tools.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] bg-charcoal p-6 text-white shadow-luxe">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Values</div>
            <div className="mt-4 space-y-4 text-sm leading-7 text-white/72">
              <p>Discretion in every interaction.</p>
              <p>Deep market knowledge across global luxury corridors.</p>
              <p>Client-first advisory, from representation to negotiations.</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-charcoal/8 bg-white p-6 shadow-luxe">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Awards and Recognition</div>
            <div className="mt-4 grid gap-3">
              {['Top Luxury Brokerage Concept', 'Private Client Excellence', 'Global Market Advisor'].map((item) => (
                <div key={item} className="rounded-2xl bg-[var(--ivory)] px-4 py-3 text-sm font-semibold text-charcoal">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-charcoal/8 bg-white p-6 shadow-luxe">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Team</div>
            <div className="mt-4 grid gap-3">
              {team.map(([name, role]) => (
                <div key={name} className="flex items-center justify-between rounded-2xl bg-[var(--ivory)] px-4 py-3">
                  <div>
                    <div className="font-semibold text-charcoal">{name}</div>
                    <div className="text-xs uppercase tracking-[0.28em] text-charcoal/45">{role}</div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gold/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
