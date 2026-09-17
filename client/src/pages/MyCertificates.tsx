import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DocumentDownload } from 'iconsax-react';
import { Pagination } from '../components/ui/Pagination';
import { certificates } from '../lib/certificatesData';
import { useToast } from '../lib/toast';

const PAGE_SIZE = 4;

export const MyCertificates = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(certificates.length / PAGE_SIZE));
  const visible = certificates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)] pb-16">
      <div className="shell flex flex-col gap-3">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-5 self-start">
          <span className="flex items-center justify-center rounded-full bg-primary-text p-2.5 text-white">
            <ArrowLeft size={24} variant="Linear" color="currentColor" />
          </span>
          <h1 className="text-2xl leading-8 font-medium text-ink">My Certificates</h1>
        </button>

        {visible.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {visible.map((certificate) => (
              <div key={certificate.id} className="flex flex-col overflow-hidden rounded-xl border border-line-strong">
                <img src={certificate.image} alt="" className="h-[204px] w-full object-cover" />
                <div className="flex flex-col">
                  <p className="p-3 text-base font-semibold text-ink">{certificate.title}</p>
                  <button
                    type="button"
                    onClick={() => showToast('Certificate download starting…')}
                    className="flex items-center justify-center gap-2 border-t border-line-soft p-3 text-sm text-primary-text"
                  >
                    <DocumentDownload size={24} variant="Linear" color="currentColor" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-sm text-muted">You haven&apos;t earned any certificates yet.</p>
        )}

        <div className="flex flex-col items-center gap-3 p-4 sm:flex-row sm:justify-between">
          <span className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-muted">Show {PAGE_SIZE}/page</span>
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </div>
    </main>
  );
};
