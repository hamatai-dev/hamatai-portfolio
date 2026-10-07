const ITEMS = [
  { label: 'Web Development', tone: 'text-paper' },
  { label: 'Mobile Apps', tone: 'text-paper' },
  { label: 'AI Consulting', tone: 'text-muted italic' },
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden}>
      {ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-12">
          <span
            className={`whitespace-nowrap font-display text-5xl leading-none tracking-[-0.02em] lg:text-7xl ${item.tone}`}
          >
            {item.label}
          </span>
          <span className="text-4xl text-accent" aria-hidden>
            ✳
          </span>
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line bg-ink py-8 lg:py-[19px]">
      <div className="animate-marquee flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
