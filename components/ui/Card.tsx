type CardProps = {
  children: React.ReactNode;
  className?: string;
  /** Staggers the entrance so the dashboard assembles top-left to bottom-right. */
  delay?: number;
  as?: "section" | "div";
  ariaLabel?: string;
};

export function Card({
  children,
  className = "",
  delay = 0,
  as: Tag = "section",
  ariaLabel,
}: CardProps) {
  return (
    <Tag
      aria-label={ariaLabel}
      className={`syn-rise rounded-2xl border border-subtle bg-raised p-4 shadow-[var(--shadow-card)] transition-colors duration-300 hover:border-strong ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function CardTitle({
  children,
  aside,
  id,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h2
        id={id}
        className="font-display text-[15px] font-medium uppercase tracking-[0.14em] text-primary"
      >
        {children}
      </h2>
      {aside ? <span className="text-[12px] text-muted">{aside}</span> : null}
    </div>
  );
}
