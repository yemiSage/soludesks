import { Link, useParams } from 'react-router-dom';
import { cx } from '../lib/format';
import { getLegalDoc, legalDocs, type LegalBlock } from '../lib/legalData';

const LegalBlockView = ({ block }: { block: LegalBlock }) => {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-base leading-6 text-[#6c6c6c]">{block.text}</p>;
    case 'subheading':
      return <h3 className="text-xl leading-7 font-semibold text-[#1e1e1e]">{block.text}</h3>;
    case 'list':
      return (
        <ul className="flex flex-col gap-2 pl-6">
          {block.items.map((item) => (
            <li key={item} className="list-disc text-base leading-6 text-[#6c6c6c]">
              {item}
            </li>
          ))}
        </ul>
      );
    case 'labeledList':
      return (
        <ul className="flex flex-col gap-3 pl-6">
          {block.items.map((item) => (
            <li key={item.label} className="list-disc text-base leading-6 text-[#6c6c6c]">
              <span className="font-bold">{item.label}</span> {item.text}
            </li>
          ))}
        </ul>
      );
    case 'contact':
      return (
        <div className="flex flex-col gap-1.5 rounded-[14px] bg-[#f9fafb] p-6">
          <p className="text-base leading-6 font-semibold text-[#1e1e1e]">{block.name}</p>
          <p className="text-base leading-6 text-[#6c6c6c]">
            Email: <a href={`mailto:${block.email}`} className="text-primary-text">{block.email}</a>
          </p>
          {block.address ? <p className="text-base leading-6 text-[#6c6c6c]">Address: {block.address}</p> : null}
          {block.phone ? <p className="text-base leading-6 text-[#6c6c6c]">Phone: {block.phone}</p> : null}
        </div>
      );
    default:
      return null;
  }
};

export const Legal = () => {
  const { slug } = useParams();
  const doc = getLegalDoc(slug);

  return (
    <main className="pt-[var(--nav-h)]">
      <section className="flex flex-col items-center gap-9 gutter bg-[#f0f6fe] py-16 sm:py-20">
        <div className="flex flex-col items-center gap-6">
          <span className="rounded-full border border-primary-text bg-[var(--sematic-backgrounds-primarybackground-2)] px-4 py-[7px] text-sm leading-5 font-bold tracking-[0.35px] text-primary-text">
            Legal Notices
          </span>
          <div className="flex flex-col items-center gap-5 text-center">
            <h1 className="heading-display max-w-[820px] text-3xl leading-tight text-ink sm:text-[48px] sm:leading-[1.2]">
              We are <span className="text-secondary">committed</span> to <span className="text-primary-text">protecting</span> you and the security of your
              data.
            </h1>
            <p className="max-w-[519px] text-sm leading-[1.5] text-muted">
              Please review our terms of service and privacy policy to understand how we handle your information.
            </p>
          </div>
        </div>
        <a
          href="#footer"
          className="flex h-12 w-[218px] items-center justify-center rounded-lg border border-primary-text text-base font-medium text-primary-text"
        >
          Contact Us
        </a>
      </section>

      <nav className="flex flex-wrap items-center justify-center gap-8 gutter bg-[#f0f6fe] py-5 sm:gap-10">
        {legalDocs.map((item) => (
          <Link
            key={item.slug}
            to={`/legal/${item.slug}`}
            className={cx(
              'border-b-2 px-3 py-2 text-lg leading-7 font-medium tracking-[-0.5px] uppercase transition-colors',
              item.slug === doc.slug ? 'border-primary-text font-bold text-primary-text' : 'border-transparent text-muted hover:text-ink',
            )}
          >
            {item.tabLabel}
          </Link>
        ))}
      </nav>

      <section className="flex justify-center border-b border-[var(--sematic-backgrounds-secondarybackground-2)] gutter bg-[var(--sematic-backgrounds-secondarybackground-1)] py-12">
        <article className="flex w-full max-w-[745px] flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-lg leading-7 text-[#6c6c6c]">Last Updated: {doc.lastUpdated}</p>
            <p className="text-base leading-6 text-[#6c6c6c]">{doc.intro}</p>
          </div>

          {doc.sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-4">
              <h2 className="text-2xl leading-8 font-bold text-[#1e1e1e]">{section.heading}</h2>
              {section.blocks.map((block, index) => (
                <LegalBlockView key={index} block={block} />
              ))}
            </div>
          ))}
        </article>
      </section>
    </main>
  );
};
