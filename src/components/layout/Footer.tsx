import { HashLink } from '../navigation/HashLink';

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <p className="d3" style={{ maxWidth: '18ch' }}>
              Built on Biology. Integrated Through Systems. Scaled for Human Potential.
            </p>
          </div>
          <div>
            <h5>Sagework</h5>
            <ul>
              <li>
                <HashLink to="discover">Discover Sagework</HashLink>
              </li>
              <li>
                <HashLink to="founder">Founder</HashLink>
              </li>
              <li>
                <HashLink to="work">Work with Sagework</HashLink>
              </li>
              <li>
                <HashLink to="contact">Contact us</HashLink>
              </li>
            </ul>
          </div>
          <div>
            <h5>Knowledge</h5>
            <ul>
              <li>
                <HashLink to="senses">The Five Senses</HashLink>
              </li>
              <li>
                <HashLink to="gutsy">Dr Gutsy</HashLink>
              </li>
              <li>
                <HashLink to="research">Research &amp; evidence</HashLink>
              </li>
            </ul>
          </div>
          <div>
            <h5>Connect</h5>
            <ul>
              <li>
                <span style={{ userSelect: 'all' }}>connect@sagework.in</span>
              </li>
              <li>
                <a
                  href="https://www.researchgate.net/profile/Shruti-Pai-3"
                  target="_blank"
                  rel="noopener"
                >
                  ResearchGate ↗
                </a>
              </li>
              <li>
                <a
                  href="https://shodhganga.inflibnet.ac.in/handle/10603/677114"
                  target="_blank"
                  rel="noopener"
                >
                  PhD thesis ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bigmark brand-logo" role="img" aria-label="sagework"></div>
        <div className="copy">
          <span>© 2026 Sagework. All rights reserved.</span>
          <span>Evidence-led advisory and design across biology, environment and behaviour.</span>
        </div>
      </div>
    </footer>
  );
}
