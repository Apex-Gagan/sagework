import { EnquiryForm } from '../components/contact/EnquiryForm';
import { View } from '../components/layout/View';
import { HashLink } from '../components/navigation/HashLink';
import { CopyButton } from '../components/shared/CopyButton';

export function ContactPage() {
  return (
    <View name="contact">
      <div className="hero" style={{ paddingBottom: '40px' }}>
        <div className="wrap two" style={{ alignItems: 'end', rowGap: 0 }}>
          <div style={{ gridColumn: '1 / span 9' }}>
            <p className="label">Contact us</p>
            <h1 className="d1">Start a conversation with Sagework.</h1>
          </div>
          <div style={{ gridColumn: '1 / span 6' }}>
            <p className="lede">
              Have a project, challenge or collaboration in mind? Tell us what you are working on
              and where Sagework could help. We welcome enquiries from leaders, institutions,
              founders, researchers and organisations.
            </p>
          </div>
        </div>
      </div>
      <div className="sec" style={{ paddingTop: '20px' }}>
        <div className="wrap cgrid">
          <div className="formcard">
            <EnquiryForm />
          </div>
          <aside className="side">
            <div>
              <h3>What happens next</h3>
              <p className="grey" style={{ margin: 0 }}>
                We will review your message and respond by email. If the enquiry is a fit for
                Sagework, we can arrange a conversation to clarify the opportunity and next steps.
              </p>
            </div>
            <div>
              <h3>Connect directly</h3>
              <p className="grey" style={{ margin: 0 }}>
                Prefer to email? Write to
              </p>
              <div className="email">
                <code>connect@sagework.in</code>
                <CopyButton value="connect@sagework.in" />
              </div>
            </div>
            <div>
              <p className="grey">
                For public health education, explore Dr Gutsy. For publications and supporting
                sources, visit Research &amp; evidence.
              </p>
              <div className="row">
                <HashLink to="gutsy" className="ul">
                  Explore Dr Gutsy <span className="arr">→</span>
                </HashLink>
                <HashLink to="research" className="ul">
                  Research &amp; evidence <span className="arr">→</span>
                </HashLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </View>
  );
}
