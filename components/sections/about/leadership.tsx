import * as React from "react";
import { ArtSlot } from "@/components/ui/art-slot";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import {
  DIRECTORY_ART,
  LEADERSHIP_DIRECTORY,
  type DirectoryEntry,
} from "@/data/about";
import {
  LEADERSHIP_DEPARTMENTS,
  LEADERSHIP_ROLES,
} from "@/data/leadership";

function DirectoryCard({
  entry,
  index,
}: {
  entry: DirectoryEntry;
  index: number;
}): React.ReactElement {
  const published = entry.confirmed && Boolean(entry.name);

  return (
    <article className="group relative flex h-full flex-col border border-ink/12 bg-white">
      <div
        className="relative aspect-[4/5] overflow-hidden"
        style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              index % 2 === 0
                ? "linear-gradient(180deg, #F4F9EC 0%, #EAF1DE 50%, #DDEBC4 100%)"
                : "linear-gradient(180deg, #F8FCEF 0%, #EAF1DE 58%, #D8E6BE 100%)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(62% 48% at 50% 90%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 76%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <ArtSlot
            name={DIRECTORY_ART[index % DIRECTORY_ART.length]}
            size={220}
            color="ink"
            className="translate-y-3 opacity-80"
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute left-3 top-8 select-none font-serif text-[5rem] font-medium leading-none text-ink/12"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/12"
          style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
          aria-hidden="true"
        />
        <p className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-2 border-t border-ink/10 bg-white/80 px-3 py-2 font-mono text-[7px] uppercase tracking-[0.16em] text-ink/70">
          <span>Portrait slot</span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </p>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-crimson-text">
          {entry.office}
        </p>
        <h3 className="mt-2 max-w-[22ch] font-serif text-[clamp(1.25rem,2vw,1.65rem)] font-medium leading-[1.05] tracking-[-0.02em]">
          {entry.title}
        </h3>
        <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.55] text-deep-green">
          {entry.responsibility}
        </p>

        <div className="mt-auto border-t border-ink/10 pt-3">
          <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-ink/45">
            {published ? "Directory entry" : "Awaiting approval"}
          </p>
          <p className="mt-1 font-sans text-[14px] leading-[1.5] text-deep-green">
            {published ? entry.name : "Name and photograph to be published."}
          </p>
        </div>
      </div>
    </article>
  );
}

/**
 * AboutLeadership — two role descriptions, a ministry structure diagram, and
 * the directory grid. The grid is complete; the records are not invented.
 */
export function AboutLeadership(): React.ReactElement {
  const [chiefPastor, executiveSecretary] = LEADERSHIP_ROLES;

  return (
    <section
      id="leadership"
      data-section="about-leadership"
      data-header-theme="light"
      className="relative bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 06 — Our leadership</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            Spiritual oversight and shared service
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 06 / 06
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-6 md:mt-14 md:gap-x-6">
          <h2 className="col-span-12 max-w-[11ch] font-serif text-[clamp(2.7rem,7vw,6.6rem)] font-medium leading-[0.9] tracking-[-0.05em] md:col-span-7">
            The people who <span className="italic">serve.</span>
          </h2>
          <p className="col-span-12 max-w-[40ch] text-[16px] leading-[1.62] text-deep-green md:col-span-4 md:col-start-9 md:text-[17px]">
            Forever Life and Grace Mission is guided by spiritual leadership
            committed to the Word, the vision, and the spiritual development of
            its members.
          </p>
        </div>

        {/* ── Two offices ── */}
        <div className="mt-10 grid gap-3 border-t border-ink/20 pt-6 md:mt-14 md:grid-cols-2 md:gap-6">
          {[chiefPastor, executiveSecretary].map((role, index) => (
            <article
              key={role.id}
              className="group flex h-full flex-col border border-ink/12 bg-mist p-5 md:p-7"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-crimson-text">
                  Office {String(index + 1).padStart(2, "0")}
                </p>
                <span
                  aria-hidden="true"
                  className="font-serif text-[2.6rem] font-medium leading-none tracking-[-0.06em] text-ink/15"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-7 max-w-[15ch] font-serif text-[clamp(1.9rem,3.6vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.035em]">
                {role.title}
              </h3>
              <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.62] text-deep-green md:text-[16px]">
                {role.description}
              </p>
              {role.id === "executive-secretary" ? (
                <p className="mt-auto max-w-[42ch] border-t border-ink/12 pt-4 text-[14px] leading-[1.6] text-deep-green md:mt-8">
                  The Executive Secretary works with the Chief Pastor, ministry
                  leaders, and relevant departments to coordinate and implement
                  church activities.
                </p>
              ) : (
                <p className="mt-auto max-w-[42ch] border-t border-ink/12 pt-4 text-[14px] leading-[1.6] text-deep-green md:mt-8">
                  The office holds the ministry to its divine mandate and
                  doctrinal foundations.
                </p>
              )}
            </article>
          ))}
        </div>

        {/* ── Ministry structure diagram ── */}
        <div className="mt-14 border-t border-ink/20 pt-8 md:mt-20 md:pt-10">
          <div className="grid gap-5 md:grid-cols-12 md:items-end">
            <h3 className="font-serif text-[clamp(1.9rem,4.2vw,3.6rem)] font-medium leading-[0.98] tracking-[-0.035em] md:col-span-6">
              The ministry <span className="italic">structure.</span>
            </h3>
            <p className="max-w-[42ch] text-[15px] leading-[1.62] text-deep-green md:col-span-5 md:col-start-8 md:text-[16px]">
              The church operates through ministry leaders, departmental
              coordinators, fellowship leaders, and dedicated members who carry
              the spiritual and administrative life of the ministry.
            </p>
          </div>

          <div className="relative mt-7 overflow-hidden border border-ink/12 bg-mist p-5 text-ink md:mt-9 md:p-8">
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-full max-w-[420px] border border-ink/20 bg-white px-5 py-4 text-center">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-deep-green">
                    Oversight
                  </p>
                  <p className="mt-1 font-serif text-[clamp(1.2rem,2.2vw,1.6rem)] font-medium leading-tight tracking-[-0.02em]">
                    Chief Pastor
                  </p>
                </div>

                <span aria-hidden="true" className="block h-6 w-px bg-brand-green" />

                <div className="w-full max-w-[520px] border border-ink/20 bg-white px-5 py-4 text-center">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-deep-green">
                    Coordination
                  </p>
                  <p className="mt-1 font-serif text-[clamp(1.2rem,2.2vw,1.6rem)] font-medium leading-tight tracking-[-0.02em]">
                    Church Executive Secretary
                  </p>
                </div>

                <span aria-hidden="true" className="block h-6 w-px bg-brand-green" />

                <div className="w-full border-t border-ink/15 pt-5">
                  <p className="text-center font-mono text-[8px] uppercase tracking-[0.2em] text-deep-green">
                    Ministry and departmental leadership
                  </p>

                  <ul className="mt-4 grid grid-cols-1 gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
                    {LEADERSHIP_DEPARTMENTS.map((department, index) => (
                      <li
                        key={department}
                        className="flex min-h-[74px] items-start gap-2.5 bg-white px-3 py-3"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 block h-1.5 w-1.5 shrink-0 bg-brand-green"
                        />
                        <div>
                          <span className="block font-mono text-[7px] uppercase tracking-[0.16em] text-ink/45">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="mt-1 block text-[13px] leading-[1.45] text-ink/85">
                            {department}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-ink/12 pt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/50">
              <span>One house · shared service</span>
              <span>Structure, not a directory of names</span>
            </div>
          </div>
        </div>

        {/* ── Directory grid ── */}
        <div className="mt-14 md:mt-20">
          <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink/15 pb-4">
            <h3 className="font-serif text-[clamp(1.9rem,4.2vw,3.6rem)] font-medium leading-[0.98] tracking-[-0.035em]">
              The <span className="italic">directory.</span>
            </h3>
            <p className="max-w-[34ch] font-mono text-[8.5px] uppercase leading-[1.8] tracking-[0.16em] text-ink/35 md:text-right">
              Names, photographs, titles, and responsibilities appear after
              approval from the Chief Pastor.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-8 lg:grid-cols-3 lg:gap-5">
            {LEADERSHIP_DIRECTORY.map((entry, index) => (
              <DirectoryCard key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
