import SectionHeading from '../components/SectionHeading';
import ValuationWizard from '../components/ValuationWizard';

export default function HomeValuation() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
      <SectionHeading
        eyebrow="Home Valuation"
        title="A premium, multi-step private valuation experience."
        description="This wizard stores requests locally and computes a directional estimate based on the property details entered."
      />
      <div className="mt-10">
        <ValuationWizard />
      </div>
    </div>
  );
}
