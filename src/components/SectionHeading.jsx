export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  eyebrowClassName = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex max-w-3xl flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow ? (
        <div className={`text-[11px] font-bold uppercase tracking-[0.4em] text-gold ${eyebrowClassName}`}>
          {eyebrow}
        </div>
      ) : null}
      <h2 className={`font-display text-4xl leading-none text-charcoal md:text-6xl ${titleClassName}`}>{title}</h2>
      {description ? (
        <p className={`max-w-2xl text-sm leading-7 text-charcoal/72 md:text-base ${descriptionClassName}`}>{description}</p>
      ) : null}
    </div>
  );
}
