import { card, noticePanel } from "./styles";

export function TextSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
        {children}
      </div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-7 text-gray-600 sm:text-base">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a2bd70]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return <div className={`${noticePanel} mt-6 text-sm sm:text-base`}>{children}</div>;
}

export function StatGrid({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className={`${card} text-center sm:text-left`}>
          <p className="text-2xl font-bold text-[#234b35] sm:text-3xl">{item.value}</p>
          <p className="mt-2 text-sm text-gray-500">{item.label}</p>
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
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-3xl border border-[#e6e8df] bg-white p-5">
          <h3 className="text-base font-semibold text-[#26382a]">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-500">{item.body}</p>
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
    <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e6e8df] bg-white">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-[#e6e8df] bg-[#f6f8f3]">
            {head.map((cell) => (
              <th key={cell} className="px-4 py-3 font-semibold text-[#26382a]">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-[#eef0e9] last:border-0">
              {row.map((cell) => (
                <td key={cell} className="px-4 py-3 align-top text-gray-600">
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
