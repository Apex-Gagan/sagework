import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { SHOW_PENDING_CONTENT } from '../../config/launch';
import { SERVICES } from '../../data/services';
import { useNavigation } from '../../routing/NavigationContext';
import { HashLink } from '../navigation/HashLink';

const EMPTY = { name: '', email: '', org: '', role: '', country: '', type: '', msg: '' };
type Field = keyof typeof EMPTY | 'consent';
type TextField = keyof typeof EMPTY;

const REQUIRED: TextField[] = ['name', 'email', 'type', 'msg'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Business enquiries name a service, so "Discuss …" links elsewhere can preselect one. */
const BUSINESS_TYPES = SERVICES.map(({ name }) => name);
const OTHER_TYPES = ['Research', 'Collaboration', 'Speaking', 'Media', 'General enquiry'];

function validate(field: TextField, rawValue: string): string {
  const value = rawValue.trim();
  if (!value) return 'Please complete this field.';
  if (field === 'email' && !EMAIL_PATTERN.test(value)) return 'Please enter a valid email address.';
  return '';
}

interface FieldRowProps {
  field: Field;
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  full?: boolean;
  children: ReactNode;
}

function FieldRow({ field, label, required, help, error, full, children }: FieldRowProps) {
  return (
    <div className={full ? 'fw full' : 'fw'}>
      <label htmlFor={`f-${field}`}>
        {required ? `${label} ` : label}
        {required && <span className="req">*</span>}
      </label>
      {children}
      {help && (
        <span className="help" id={`h-${field}`}>
          {help}
        </span>
      )}
      {required && (
        <span className="err" id={`e-${field}`}>
          {error}
        </span>
      )}
    </div>
  );
}

/**
 * The enquiry form. Frontend only for now: it validates and shows the confirmation, but nothing
 * is sent anywhere until a submission service is connected in `submit`.
 */
export function EnquiryForm() {
  const { view, visit, takeIntent } = useNavigation();
  const [values, setValues] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const hasSent = useRef(false);

  // "Discuss …" links elsewhere on the site preselect the enquiry type.
  useEffect(() => {
    if (view !== 'contact') return;
    const enquiry = takeIntent('enquiry');
    if (enquiry) setValues((current) => ({ ...current, type: enquiry }));
  }, [view, visit, takeIntent]);

  const focusField = (field: Field) =>
    formRef.current?.querySelector<HTMLElement>(`#f-${field}`)?.focus();

  useLayoutEffect(() => {
    if (sent) {
      hasSent.current = true;
      successRef.current?.focus();
    } else if (hasSent.current) {
      focusField('name');
    }
  }, [sent]);

  const change = (field: TextField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Partial<Record<Field, string>> = Object.fromEntries(
      REQUIRED.map((field) => [field, validate(field, values[field])]),
    );
    nextErrors.consent = consent ? '' : 'Please confirm you have read the Privacy Notice.';
    setErrors(nextErrors);
    const firstInvalid = ([...REQUIRED, 'consent'] as Field[]).find((field) => nextErrors[field]);
    if (firstInvalid) focusField(firstInvalid);
    // Connect the submission service here. Until then the enquiry stays in the browser.
    else setSent(true);
  };

  const startAgain = () => {
    setValues(EMPTY);
    setConsent(false);
    setSent(false);
  };

  const control = (field: TextField) => ({
    className: 'inp',
    id: `f-${field}`,
    value: values[field],
    'aria-invalid': errors[field] ? true : undefined,
    onChange: (event: { target: { value: string } }) => change(field, event.target.value),
  });

  const input = (field: TextField, props: InputHTMLAttributes<HTMLInputElement>) => (
    <input {...control(field)} {...props} />
  );

  const privacyNotice = SHOW_PENDING_CONTENT ? (
    <HashLink to="privacy" className="ul">
      Privacy Notice
    </HashLink>
  ) : (
    'Privacy Notice'
  );

  return (
    <>
      <form id="enq" noValidate hidden={sent} onSubmit={submit} ref={formRef}>
        <h2 className="d3">Tell us what you have in mind</h2>
        <p className="grey small">
          {
            'Tell us what you are working on, whom it is for and what you want to achieve. If you are unsure which service fits, choose General enquiry. Fields marked '
          }
          <span style={{ color: 'var(--forest)' }}>*</span> are required.
        </p>
        <div className="fg" style={{ marginTop: '22px' }}>
          <FieldRow field="name" label="Full name" required error={errors.name}>
            {input('name', { autoComplete: 'name', 'aria-describedby': 'e-name' })}
          </FieldRow>
          <FieldRow
            field="email"
            label="Email address"
            required
            help="Use the address where you would like us to reply."
            error={errors.email}
          >
            {input('email', {
              type: 'email',
              autoComplete: 'email',
              'aria-describedby': 'h-email e-email',
            })}
          </FieldRow>
          <FieldRow field="org" label="Organisation">
            {input('org', { autoComplete: 'organization' })}
          </FieldRow>
          <FieldRow field="role" label="Role">
            {input('role', { autoComplete: 'organization-title' })}
          </FieldRow>
          <FieldRow field="country" label="Country or region">
            {input('country', { autoComplete: 'country-name' })}
          </FieldRow>
          <FieldRow field="type" label="Enquiry type" required error={errors.type}>
            <select {...control('type')} aria-describedby="e-type">
              <option value="">Select one option</option>
              <optgroup label="Business enquiry">
                {BUSINESS_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </optgroup>
              {OTHER_TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </FieldRow>
          <FieldRow
            field="msg"
            label="Your message"
            required
            full
            help="Please share project information only. Avoid including medical records or confidential personal information."
            error={errors.msg}
          >
            <textarea
              {...control('msg')}
              aria-describedby="h-msg e-msg"
              placeholder="What are you working on, who is it for and what would you like to achieve? Include timing if relevant."
            />
          </FieldRow>
          <div className="fw full consent">
            <label className="check" htmlFor="f-consent">
              <input
                type="checkbox"
                id="f-consent"
                checked={consent}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby="e-consent"
                onChange={(event) => {
                  setConsent(event.target.checked);
                  setErrors((current) => ({ ...current, consent: '' }));
                }}
              />
              <span>
                {
                  'I agree to Sagework using these details to respond to my enquiry, as described in the '
                }
                {privacyNotice}. <span className="req">*</span>
              </span>
            </label>
            <span className="err" id="e-consent">
              {errors.consent}
            </span>
          </div>
        </div>
        <div className="ffoot">
          <p>
            For information about how your enquiry and contact details are handled, please read our{' '}
            {privacyNotice}.
          </p>
          <button className="btn btn-dark" type="submit">
            Send enquiry <span className="arr">→</span>
          </button>
        </div>
      </form>
      <div className="success" id="success" hidden={!sent} tabIndex={-1} ref={successRef}>
        <div className="tick">
          <svg width="24" height="24" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 8.5l2.5 2.5L12 5.5" fill="none" stroke="#fff" strokeWidth="1.8" />
          </svg>
        </div>
        <h2 className="d3">Thank you for contacting Sagework.</h2>
        <p>Your enquiry has been received. We will review your message and respond by email.</p>
        <button className="btn btn-line" id="again" onClick={startAgain}>
          Send another enquiry
        </button>
      </div>
    </>
  );
}
