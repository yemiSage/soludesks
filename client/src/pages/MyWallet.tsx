import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Export, Filter, MoneyRecive, WalletAdd1, Wallet2 } from 'iconsax-react';
import { formatPrice } from '../lib/format';
import { transactions, walletBalance } from '../lib/walletData';

export const MyWallet = () => {
  const navigate = useNavigate();

  return (
    <main className="pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)] pb-16">
      <div className="shell flex flex-col gap-3">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-5 self-start">
          <span className="flex items-center justify-center rounded-full bg-primary-text p-2.5 text-white">
            <ArrowLeft size={24} variant="Linear" color="currentColor" />
          </span>
          <h1 className="text-2xl leading-8 font-medium text-ink">My Wallet</h1>
        </button>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col justify-between gap-8 rounded-2xl border-[1.5px] border-line-strong bg-gradient-to-b from-[#0a60e1] to-[#0847a6] p-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-white/90">Total Balance</p>
                <p className="text-[36px] leading-[44px] font-bold tracking-[-0.72px] text-white">{formatPrice(walletBalance)}</p>
              </div>
              <span className="flex size-12 items-center justify-center rounded-[10px] bg-white/10">
                <Wallet2 size={24} variant="Linear" color="#fdfdfd" />
              </span>
            </div>
            <button type="button" className="flex items-center justify-center gap-3.5 rounded-lg bg-white py-3 text-sm font-medium text-primary-text">
              <WalletAdd1 size={16} variant="Linear" color="currentColor" />
              Fund Wallet
            </button>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border-[1.5px] border-line-strong p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg leading-7 font-semibold text-ink">Transaction History</h2>
                <p className="text-sm text-muted">Recent wallet activity</p>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" className="flex items-center gap-1.5 rounded-md border border-line-strong px-3 py-2 text-sm text-ink">
                  <Filter size={16} variant="Linear" color="currentColor" />
                  Filter
                </button>
                <button type="button" className="flex items-center gap-1.5 rounded-md border border-line-strong px-3 py-2 text-sm text-ink">
                  <Export size={16} variant="Linear" color="currentColor" />
                  Export
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {transactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between gap-4 rounded-[14px] border border-line-soft px-4 py-3">
                  <div className="flex flex-1 items-center gap-4">
                    <span className={`flex size-12 shrink-0 items-center justify-center rounded-[14px] ${txn.credit ? 'bg-[#f0fdf4]' : 'bg-[#fef2f2]'}`}>
                      {txn.credit ? (
                        <MoneyRecive size={20} variant="Linear" color="#008236" />
                      ) : (
                        <Wallet2 size={20} variant="Linear" color="#e7000b" />
                      )}
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-base text-[#1e1e1e]">{txn.title}</p>
                      <p className="text-xs text-[#6c6c6c]">
                        {txn.who} • {txn.date} • {txn.txnId}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <p className={`text-lg ${txn.credit ? 'text-[#008236]' : 'text-[#e7000b]'}`}>
                      {txn.credit ? '+' : ''}${txn.amount}
                    </p>
                    <span className="rounded-lg bg-[#00850019] px-2 py-1 text-xs text-[#008236]">completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
