import { HashLink } from '../../components/navigation/HashLink';

/** The challenge, and Sagework's answer to it, in brief. */
export function ChallengeSection() {
  return (
    <div className="sec">
      <div className="wrap two">
        <div className="c-l">
          <p className="label">The challenge</p>
          <h2 className="d2">Modern systems are changing faster than human biology.</h2>
          <p className="grey">
            Sagework begins with the system itself, not with the effects once they appear.
          </p>
          <HashLink to="approach" section="adaptation-gap" className="ul">
            The Human Adaptation Gap <span className="arr">→</span>
          </HashLink>
        </div>
        <div className="c-r">
          <p className="label">About Sagework</p>
          <p className="d3">Health is shaped by systems.</p>
          <p className="lede" style={{ color: 'var(--ink)' }}>
            Biology does not operate in isolation. Nutrition, the gut microbiome, the built
            environment and human behaviour interact continuously, influencing health, resilience
            and performance.
          </p>
          <HashLink to="about" className="ul">
            About Sagework <span className="arr">→</span>
          </HashLink>
        </div>
      </div>
    </div>
  );
}
