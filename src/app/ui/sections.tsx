import { cardLift, noticePanel } from "./styles";

export function TextSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-11 first:mt-0">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 h-1 w-14 rounded-full bg-gradient-to-r from-[#234b35] via-[#719477] to-[#c5dba9]" />
      <div className="mt-4 space-y-3 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
        {children}
      </div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-sm leading-7 text-gray-600 sm:text-base"
        >
          <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#dcead0] to-[#eef4e6] text-[10px] font-bold text-[#315e43] shadow-[0_2px_6px_rgba(28,54,34,0.07)]">
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${noticePanel} relative mt-7 overflow-hidden`}>
      <span
        className="cuk-blob right-[-6%] top-[-70%] h-[150px] w-[150px] opacity-30"
        style={{ background: "#a2bd70" }}
        aria-hidden
      />
      <div className="relative text-sm sm:text-base">{children}</div>
    </div>
  );
}

export function StatGrid({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <div className="mt-9 grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className={`${cardLift} cuk-sheen-host relative overflow-hidden text-center sm:text-left`}
        >
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#234b35] via-[#719477] to-[#c5dba9]" />
          <p className="bg-gradient-to-r from-[#234b35] to-[#5d8a5b] bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
            {item.value}
          </p>
          <p className="mt-2 text-sm leading-6 text-gray-500">{item.label}</p>
          <span className="cuk-sheen rounded-3xl" aria-hidden />
        </div>
      ))}
    </div>
  );
}

export function CardGrid({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item.title}
          className={`${cardLift} cuk-sheen-host relative overflow-hidden`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#eaf2e0] to-[#f7f9f1] text-xs font-bold text-[#315e43] ring-1 ring-[#e0e8d6]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-base font-semibold text-[#26382a] sm:text-lg">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-500">{item.body}</p>
          <span className="cuk-sheen rounded-3xl" aria-hidden />
        </div>
      ))}
    </div>
  );
}

export function Table({
  head,
  rows,
}: {
  head: string[];
  rows: string[][];
}) {
  return (
    <div className="mt-7 overflow-x-auto rounded-3xl border border-[#e2e7dc] bg-white shadow-[0_10px_30px_rgba(28,54,34,0.06)]">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-[#1d3d2b] via-[#234b35] to-[#315e43] text-white">
            {head.map((cell) => (
              <th
                key={cell}
                className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[1.4px]"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[0]}
              className="border-b border-[#eef0e9] transition last:border-0 odd:bg-[#fbfcf7] hover:bg-[#f2f7ec]"
            >
              {row.map((cell) => (
                <td key={cell} className="px-4 py-3.5 align-top text-gray-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
