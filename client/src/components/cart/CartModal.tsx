import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Trash, Wallet3 } from 'iconsax-react';
import { Drawer } from '../ui/Drawer';
import { useCollections } from '../../hooks/useCollections';
import { api } from '../../lib/api';
import { useAuth } from '../../lib/auth';
import { cx, formatPrice } from '../../lib/format';
import { useToast } from '../../lib/toast';
import { walletBalance } from '../../lib/walletData';

type Props = { open: boolean; onClose: () => void };

const SERVICE_CHARGE = 500;
const VAT_RATE = 0.075;

type PaymentMethod = 'wallet' | 'card';

export const CartModal = ({ open, onClose }: Props) => {
  const navigate = useNavigate();
  const { collections, toggleCart } = useCollections();
  const { requireAuth, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const { data } = useQuery({ queryKey: ['courses', 'all'], queryFn: () => api.courses({ limit: 48 }), enabled: open });
  const [method, setMethod] = useState<PaymentMethod>('wallet');

  const items = (data?.items ?? []).filter((course) => collections.cart.includes(course.id));
  const subtotal = collections.cartTotalNgn;
  const vat = Math.round(subtotal * VAT_RATE);
  const total = subtotal + SERVICE_CHARGE + vat;
  const effectiveMethod: PaymentMethod = isAuthenticated ? method : 'card';
  const needsFunding = effectiveMethod === 'wallet' && walletBalance < total;

  const pay = () =>
    requireAuth('checkout', () => {
      if (needsFunding) {
        onClose();
        navigate('/my-wallet');
        return;
      }
      items.forEach((course) => toggleCart(course.id));
      onClose();
      showToast('Payment successful — enjoy your new courses!');
    });

  return (
    <Drawer open={open} onClose={onClose} titleId="cart-modal-title" title="My Cart" maxWidthClassName="sm:max-w-[1000px]">
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <p className="text-base font-medium text-ink">Your cart is empty</p>
          <p className="text-sm text-muted">Browse courses and add the ones you want to learn next.</p>
          <Link to="/explore" onClick={onClose} className="flex h-11 items-center justify-center rounded-lg border border-primary-text px-6 text-sm font-medium text-primary-text">
            Explore courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-ink">Items</span>
              <span className="text-base font-semibold text-ink">Price</span>
            </div>
            {items.map((course) => (
              <div key={course.id} className="flex items-start justify-between gap-4">
                <div className="flex flex-1 items-start gap-3">
                  <Link to={`/courses/${course.slug}`} onClick={onClose} className="relative h-[82px] w-[88px] shrink-0 overflow-hidden rounded-xl">
                    <img src={course.image} alt="" className="absolute inset-0 size-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                  </Link>
                  <div className="flex flex-1 flex-col gap-2">
                    <Link to={`/courses/${course.slug}`} onClick={onClose} className="text-sm leading-5 font-semibold text-ink hover:text-primary-text">
                      {course.title}
                    </Link>
                    <p className="line-clamp-3 text-xs leading-[18px] text-muted">{course.summary}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-base font-bold text-ink">{formatPrice(course.priceNgn)}</span>
                  <button type="button" onClick={() => toggleCart(course.id)} aria-label={`Remove ${course.title} from cart`} className="text-muted hover:text-[#ff5025]">
                    <Trash size={18} variant="Linear" color="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-10 rounded-xl bg-[#fafafa] px-5 pt-5 pb-8">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-ink">Summary</span>
                <span className="text-base font-semibold text-ink">Price</span>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted">Subtotal</span>
                  <span className="text-base font-semibold text-ink">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted">Service Charge</span>
                  <span className="text-base font-semibold text-ink">{formatPrice(SERVICE_CHARGE)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted">VAT</span>
                  <span className="text-base font-semibold text-ink">{formatPrice(vat)}</span>
                </div>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">Promo Code</span>
                <input
                  placeholder="Enter code"
                  className="h-10 rounded-lg border border-line-strong bg-white px-4 text-sm text-ink placeholder:text-[#8c8c8c] focus:border-primary-text focus:outline-none"
                />
              </label>
            </div>

            <div className="flex flex-col gap-5">
              <span className="text-base font-semibold text-ink">Payment Method</span>
              <div className="flex flex-col gap-5">
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => setMethod('wallet')}
                    className={cx(
                      'flex items-center gap-2 rounded-xl border p-3 text-left',
                      effectiveMethod === 'wallet' ? 'border-[#ff5025] bg-[#ffa189]/10' : 'border-line-strong',
                    )}
                  >
                    <span className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-[#ffa189]/40">
                      <Wallet3 size={23} variant="Linear" color="#202020" />
                    </span>
                    <span className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-ink">Wallet ({formatPrice(walletBalance)})</span>
                      <span className="text-xs text-muted">Pay using your soludesk wallet</span>
                    </span>
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={cx(
                    'flex items-center gap-2 rounded-xl border p-3 text-left',
                    effectiveMethod === 'card' ? 'border-[#ff5025] bg-[#ffa189]/10' : 'border-line-strong',
                  )}
                >
                  <span className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-line-strong">
                    <Card size={23} variant="Linear" color="#202020" />
                  </span>
                  <span className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-ink">Card/Bank Transfer</span>
                    <span className="text-xs text-muted">Pay securely via bank transfer or card</span>
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted">Total</span>
                <span className="text-2xl leading-8 font-semibold text-ink">{formatPrice(total)}</span>
              </div>
              <button type="button" onClick={pay} className="flex h-11 w-full items-center justify-center rounded-lg bg-primary-text text-base font-medium text-white">
                {!isAuthenticated ? 'Proceed to Checkout' : needsFunding ? 'Fund Wallet' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};
