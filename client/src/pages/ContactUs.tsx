import { useState } from 'react';
import { CallCalling, Location, TickCircle } from 'iconsax-react';
import { Faq } from '../components/home/Faq';
import { TrustBar } from '../components/business/TrustBar';
import { useAuth } from '../lib/auth';
import { inputClass } from '../lib/inputStyle';

const addresses = ['456, Adetokunbo Ademola Cres, Wuse 2, Abuja, Nigeria', '789, Herbert Macaulay Way, Central Business District, Abuja, Nigeria'];
const phones = ['+234 90 1234 5678', '+234 80 8765 4321', '+1 555 0100'];
const socials = ['/assets/icons/social-1.svg', '/assets/icons/social-2.svg', '/assets/icons/social-3.svg'];

export const ContactUs = () => {
  const { isAuthenticated } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const canSend = Boolean(
    subject.trim() && message.trim() && (isAuthenticated || (firstName.trim() && lastName.trim() && email.trim())),
  );

  const send = () => {
    if (!canSend) return;
    setSent(true);
    setFirstName('');
    setLastName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <main className="pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)]">
      <section className="shell flex flex-col items-center gap-10 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-20">
        <div className="flex w-full max-w-[693px] flex-col gap-6">
          <span className="w-fit rounded-full border border-primary-text bg-[var(--sematic-backgrounds-primarybackground-2)] px-4 py-1.5 text-sm font-bold tracking-[0.35px] text-primary-text">
            Contact Us
          </span>
          <div className="flex flex-col gap-5">
            <h1 className="heading-display text-[34px] leading-[1.2] text-ink sm:text-[52px]">
              We are <span className="text-secondary">always ready</span> to help you get started and answer your questions
            </h1>
            <p className="max-w-[519px] text-sm leading-[1.5] text-muted">
              Have questions or need assistance? Reach out to our support team via email or live chat. We&apos;re here to help!
            </p>
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-[520px] shrink-0 overflow-hidden rounded-[28px] border-[3px] border-[#f2f2f2] shadow-xl">
          <img src="/assets/contact/hero.jpg" alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </section>

      <TrustBar />

      <section className="shell py-16 lg:py-[120px]">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex w-full flex-col justify-between gap-8 rounded-[32px] bg-[#f8fafc] p-8 lg:flex-1">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl leading-9 font-bold text-ink">We&apos;ll love to hear from you</h2>
                <p className="text-sm text-[#8c8c8c]">Kindly fill in your details below</p>
              </div>

              {sent ? (
                <div className="flex items-center gap-3 rounded-lg bg-[#f0fdf4] p-4 text-sm text-[#008236]">
                  <TickCircle size={20} variant="Bold" color="currentColor" />
                  Thanks — your message has been sent. We&apos;ll get back to you shortly.
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {!isAuthenticated ? (
                    <>
                      <div className="flex flex-col gap-5 sm:flex-row">
                        <label className="flex flex-1 flex-col gap-1.5">
                          <span className="text-sm font-medium text-ink">
                            First Name <span className="text-[#ff5025]">*</span>
                          </span>
                          <input
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            placeholder="Enter first name"
                            className={inputClass}
                          />
                        </label>
                        <label className="flex flex-1 flex-col gap-1.5">
                          <span className="text-sm font-medium text-ink">
                            Last Name <span className="text-[#ff5025]">*</span>
                          </span>
                          <input
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            placeholder="Enter last name"
                            className={inputClass}
                          />
                        </label>
                      </div>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-ink">
                          Email <span className="text-[#ff5025]">*</span>
                        </span>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="Enter email address"
                          className={inputClass}
                        />
                      </label>
                    </>
                  ) : null}
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-ink">
                      Subject <span className="text-[#ff5025]">*</span>
                    </span>
                    <input
                      value={subject}
                      onChange={(event) => setSubject(event.target.value)}
                      placeholder="Enter subject"
                      className="h-10 rounded-lg border border-line-strong bg-white px-4 text-sm text-ink placeholder:text-[#8c8c8c] focus:border-primary-text focus:outline-none"
                    />
                  </label>
                  <label className="flex h-[209px] flex-col gap-1.5">
                    <span className="text-sm font-medium text-ink">
                      Message <span className="text-[#ff5025]">*</span>
                    </span>
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Type in your message here"
                      className="flex-1 resize-none rounded-lg border border-line-strong bg-white px-4 py-3 text-sm text-ink placeholder:text-[#8c8c8c] focus:border-primary-text focus:outline-none"
                    />
                  </label>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={send}
              disabled={!canSend}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-primary-text text-base font-medium text-white transition-opacity disabled:opacity-30"
            >
              Send Message
            </button>
          </div>

          <div className="flex w-full flex-col justify-between gap-8 rounded-[20px] bg-primary-text p-8 text-white lg:flex-1">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2.5">
                <h3 className="text-[30px] leading-9 font-bold">Address</h3>
                {addresses.map((address) => (
                  <div key={address} className="flex items-center gap-2.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Location size={16} variant="Linear" color="currentColor" />
                    </span>
                    <p className="text-sm">{address}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-[30px] leading-9 font-bold">Contact</h3>
                {phones.map((phone) => (
                  <div key={phone} className="flex items-center gap-2.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <CallCalling size={16} variant="Linear" color="currentColor" />
                    </span>
                    <p className="text-sm">{phone}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-[30px] leading-9 font-bold">Stay Connected</h3>
              <div className="flex items-center gap-3">
                {socials.map((icon) => (
                  <a key={icon} href="#" className="flex size-10 items-center justify-center rounded-full bg-white/10">
                    <img src={icon} alt="" className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq />
    </main>
  );
};
