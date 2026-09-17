import { useState } from 'react';
import { Bank, TickCircle } from 'iconsax-react';
import { Drawer } from '../ui/Drawer';
import { cx, formatPrice } from '../../lib/format';
import { trainerPayoutAccounts } from '../../lib/trainerData';
import type { Transaction } from '../../lib/walletData';

export const WithdrawDrawer = ({ open, onClose, balance }: { open: boolean; onClose: () => void; balance: number }) => {
  const [amount, setAmount] = useState('');
  const [accountId, setAccountId] = useState(trainerPayoutAccounts.find((account) => account.isDefault)?.id ?? '');
  const [done, setDone] = useState(false);

  const close = () => {
    onClose();
    window.setTimeout(() => {
      setAmount('');
      setDone(false);
    }, 300);
  };

  const submit = () => {
    if (!amount.trim() || Number(amount) <= 0 || !accountId) return;
    setDone(true);
  };

  return (
    <Drawer
      open={open}
      onClose={close}
      titleId="withdraw-title"
      title="Withdraw Earnings"
      footer={
        done ? null : (
          <>
            <button type="button" onClick={close} className="flex h-[38px] items-center justify-center rounded-lg border border-primary-text px-6 text-base text-primary-text sm:h-[43px]">
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={!amount.trim() || Number(amount) <= 0}
              className="flex h-[38px] w-[212px] items-center justify-center rounded-lg bg-primary text-base font-medium text-white transition-opacity disabled:opacity-50 sm:h-[43px]"
            >
              Continue
            </button>
          </>
        )
      }
    >
      {done ? (
        <div className="flex w-full flex-col items-center gap-3 py-12 text-center">
          <TickCircle size={56} variant="Bold" color="#00b884" />
          <p className="text-xl font-semibold text-ink">Withdrawal Initiated</p>
          <p className="max-w-[320px] text-sm leading-5 text-muted">
            Your withdrawal request is being processed. You&apos;ll receive a notification once the funds are available in your account.
          </p>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col gap-[6px]">
            <span className="text-sm leading-5 font-medium text-ink">Amount to Withdraw</span>
            <div className="flex h-10 w-full items-stretch overflow-hidden rounded-lg border border-line bg-white focus-within:border-primary">
              <span className="flex w-10 shrink-0 items-center justify-center border-r border-line text-sm text-muted">₦</span>
              <input
                value={amount}
                onChange={(event) => setAmount(event.target.value.replace(/[^\d.]/g, ''))}
                inputMode="decimal"
                placeholder="0"
                className="w-full flex-1 px-4 text-sm leading-5 text-ink placeholder:text-[var(--sematic-buttons-greysolid-1)] focus:outline-none"
              />
            </div>
            <span className="text-xs text-muted">Avl Bal: {formatPrice(balance)}</span>
          </div>

          <div className="flex w-full flex-col gap-3">
            <span className="text-sm leading-5 font-medium text-ink">Select Account</span>
            {trainerPayoutAccounts.map((account) => (
              <button
                key={account.id}
                type="button"
                onClick={() => setAccountId(account.id)}
                className={cx(
                  'flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors',
                  accountId === account.id ? 'border-primary bg-[var(--sematic-backgrounds-primarybackground-2)]' : 'border-line-strong',
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={cx('flex size-10 shrink-0 items-center justify-center rounded-full', accountId === account.id ? 'bg-primary text-white' : 'bg-line-soft text-muted')}>
                    <Bank size={20} variant="Bold" color="currentColor" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-ink">{account.holder}</span>
                    <span className="text-xs text-muted">
                      {account.bank} | {account.number}
                    </span>
                  </span>
                </span>
                {account.isDefault ? <span className="rounded-full border border-line-strong px-2.5 py-1 text-xs text-muted">Default</span> : null}
              </button>
            ))}
          </div>
        </div>
      )}
    </Drawer>
  );
};

export const ReceiptDrawer = ({ transaction, onClose }: { transaction: Transaction | null; onClose: () => void }) => (
  <Drawer
    open={Boolean(transaction)}
    onClose={onClose}
    titleId="receipt-title"
    title="Transaction Receipt"
    footer={
      <>
        <button type="button" onClick={onClose} className="flex h-[38px] items-center justify-center rounded-lg border border-primary-text px-6 text-base text-primary-text sm:h-[43px]">
          Cancel
        </button>
        <button type="button" className="flex h-[38px] w-[212px] items-center justify-center rounded-lg bg-primary text-base font-medium text-white sm:h-[43px]">
          Download Receipt
        </button>
      </>
    }
  >
    {transaction ? (
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col items-center gap-1 pt-4 text-center">
          <p className={cx('text-3xl font-bold', transaction.credit ? 'text-[#008236]' : 'text-ink')}>
            {transaction.credit ? '+ ' : ''}
            {formatPrice(transaction.amount)}
          </p>
          <p className="text-sm text-muted">{transaction.date}</p>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-line-soft py-4 text-sm">
            <span className="text-muted">Status</span>
            <span className="font-semibold text-[#008236]">Successful</span>
          </div>
          <div className="flex items-center justify-between border-b border-line-soft py-4 text-sm">
            <span className="text-muted">Transaction ID</span>
            <span className="text-muted">{transaction.txnId}</span>
          </div>
        </div>
      </div>
    ) : null}
  </Drawer>
);
