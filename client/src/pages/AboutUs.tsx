import { FinalCta } from '../components/home/FinalCta';

const sections = [
  {
    heading: 'The pattern',
    body: 'Training lived in one platform. Support tickets in another. Attendance in spreadsheets. Maintenance on WhatsApp. Performance data scattered across dashboards that never quite aligned. Growth was happening, but the infrastructure supporting it wasn’t designed for scale.',
  },
  {
    heading: 'What we did',
    body: 'So we began asking a different kind of question: What would it look like if organizations and individuals didn’t have to piece everything together themselves? What if the tools that power workforce development, service delivery, operational management, and performance tracking were designed as one cohesive ecosystem from the start? That question became Soludesk.',
  },
  {
    heading: 'Our solution',
    body: 'Soludesk is being built as a unified operating system for growth, a platform that houses workforce training and certification, attendance systems, omnichannel support operations, maintenance and asset management, and structured performance insights in one environment. Not as scattered modules, but as connected systems that understand each other. Because real growth is not one-dimensional. It requires structure, visibility, and alignment. We believe Africa is full of talent, ambition, and innovation. What has often been missing is scalable, locally relevant infrastructure that can support that ambition at enterprise level while remaining accessible to emerging teams and institutions. Soludesk is our response to that gap, African-first in context, global in standard.',
  },
  {
    heading: 'For whom',
    body: 'It is designed for organizations that want their operations and workforce aligned, institutions building structured digital ecosystems, businesses tired of juggling five disconnected platforms, and professionals who want credible, opportunity-linked growth. If you are building something, scaling something, or trying to run something better, Soludesk was created with you in mind. We are still early, and that is intentional. We are onboarding our first communities gradually, refining thoughtfully, and building with care. We are looking for forward-thinking teams, institutions, and individuals who want early access — not just to use a product, but to help shape the infrastructure that supports modern work and learning. If this resonates with you, we would love to have you join us.',
  },
];

export const AboutUs = () => (
  <main className="pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)]">
    <section className="shell flex flex-col items-center gap-6 py-14 text-center lg:py-20">
      <span className="w-fit rounded-full border border-primary-text bg-[var(--sematic-backgrounds-primarybackground-2)] px-4 py-1.5 text-sm font-bold tracking-[0.35px] text-primary-text">
        Join The Waitlist
      </span>
      <div className="flex flex-col items-center gap-5">
        <h1 className="heading-display text-[34px] leading-[1.2] text-ink sm:text-[52px]">
          Soludesk- <span className="text-secondary">Our Story</span>
        </h1>
        <p className="max-w-[519px] text-sm leading-[1.5] text-muted">Join the Soludesk The future of structured growth is being built now.</p>
      </div>
    </section>

    <div className="flex flex-col">
      <section className="shell border-t border-line-soft py-10">
        <p className="max-w-[1024px] text-base leading-7 text-muted">
          We didn&apos;t start Soludesk because we wanted to build another software product. We started because we kept seeing the same
          pattern everywhere we looked. Organizations were growing, teams were expanding, institutions were digitizing, yet the systems
          underneath that growth were disconnected, fragile, and stitched together with multiple tools that didn&apos;t truly speak to
          each other.
        </p>
      </section>

      {sections.map((section) => (
        <section key={section.heading} className="shell border-t border-line-soft py-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl leading-[30px] font-bold text-ink">{section.heading}</h2>
            <p className="max-w-[1024px] text-base leading-7 text-muted">{section.body}</p>
          </div>
        </section>
      ))}
    </div>

    <FinalCta />
  </main>
);
