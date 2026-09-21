import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Link
        href="/dashboard"
        className="rounded-lg bg-action px-4 py-2.5 text-[13px] font-semibold text-[color:var(--text-on-cyan)] transition-colors duration-200 hover:bg-[color:var(--action-hover)]"
      >
        Open Synceri
      </Link>
    </div>
  );
}
