import { useState } from 'react';
import { Export, MoneyRecive, Wallet2, WalletAdd1, WalletMinus } from 'iconsax-react';
import { PortalLayout } from '../../components/portal/PortalLayout';
import { ReceiptDrawer, WithdrawDrawer } from '../../components/trainer/WalletDrawers';
import { cx, formatPrice } from '../../lib/format';
import { transactions, walletBalance, type Transaction } from '../../lib/walletData';

export const TrainerWallet = () => {
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [receipt, setReceipt] = useState<Transaction | null>(null);

  return (
    <PortalLayout role="trainer">
      <div className="flex flex-col gap-6 gutter page-y">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">My Wallet</h1>
          <p className="text-sm text-muted">Manage Funds and Financials</p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div className="flex h-fit flex-col gap-8 rounded-2xl bg-gradient-to-b from-[#0a60e1] to-[#0847a6] p-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-white/90">Total Balance</p>
                <p className="text-[32px] leading-[40px] font-bold tracking-[-0.72px] text-white">{formatPrice(walletBalance)}</p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-[10px] bg-white/10">
                <Wallet2 size={22} variant="Linear" color="#fdfdfd" />
              </span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setWithdrawOpen(true)}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-white/15 text-sm font-medium text-white"
              >
                <WalletMinus size={16} variant="Linear" color="currentColor" />
                Withdraw from wallet
              </button>
              <button type="button" className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-white text-sm font-medium text-primary-text">
                <WalletAdd1 size={16} variant="Linear" color="currentColor" />
                Fund Wallet
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-line-soft p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg leading-7 font-semibold text-ink">Transaction History</h2>
                <p className="text-sm text-muted">Recent wallet activity</p>
              </div>
              <button type="button" className="flex h-11 items-center gap-1.5 rounded-md border border-line-strong px-3 text-sm text-ink">
                <Export size={16} variant="Linear" color="currentColor" />
                Export
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {transactions.map((txn) => (
                <button
                  key={txn.id}
                  type="button"
                  onClick={() => setReceipt(txn)}
                  className="flex items-center justify-between gap-4 rounded-[14px] border border-line-soft px-4 py-3 text-left hover:border-primary"
                >
                  <span className="flex flex-1 items-center gap-4">
                    <span className={cx('flex size-11 shrink-0 items-center justify-center rounded-[14px]', txn.credit ? 'bg-[#f0fdf4]' : 'bg-[#fef2f2]')}>
                      {txn.credit ? <MoneyRecive size={20} variant="Linear" color="#008236" /> : <Wallet2 size={20} variant="Linear" color="#e7000b" />}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-sm text-[#1e1e1e]">{txn.title}</span>
                      <span className="text-xs text-[#6c6c6c]">
                        {txn.date} • {txn.txnId}
                      </span>
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className={cx('text-base font-medium', txn.credit ? 'text-[#008236]' : 'text-[#e7000b]')}>
                      {txn.credit ? '+' : ''}
                      {formatPrice(txn.amount)}
                    </span>
                    <span className="rounded-lg bg-[#00850019] px-2 py-1 text-xs text-[#008236]">completed</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <WithdrawDrawer open={withdrawOpen} onClose={() => setWithdrawOpen(false)} balance={walletBalance} />
      <ReceiptDrawer transaction={receipt} onClose={() => setReceipt(null)} />
    </PortalLayout>
  );
};
