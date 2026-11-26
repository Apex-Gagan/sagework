import { HashLink } from '../../components/navigation/HashLink';

/** The scientist behind Dr Gutsy, and how it relates to Sagework. */
export function GutsyScientist() {
  return (
    <div className="sec paper">
      <div className="wrap two">
        <div className="c-l">
          <p className="label">Meet the scientist behind Dr Gutsy</p>
          <h2 className="d2">Dr Shruti Pai</h2>
          <HashLink to="about" section="founder" className="btn btn-dark">
            Meet the founder <span className="arr">→</span>
          </HashLink>
        </div>
        <div className="c-r">
          <p className="lede" style={{ color: 'var(--ink)' }}>
            A business leader, clinical nutrition scientist, gut microbiome researcher and human
            systems designer.
          </p>
          <p className="grey">
            Her research background includes maternal and infant gut microbiome science, nutrition,
            growth and body composition, and her professional experience spans food systems,
            healthcare, education, hospitality and environmental design. Through Dr Gutsy, she
            brings this perspective into public education: asking questions, examining assumptions
            and helping people understand the connections behind health information.
          </p>
          <div className="bord" style={{ marginTop: '32px' }}>
            <p className="label">Part of Sagework</p>
            <h3 className="h4">Public understanding. Practical application.</h3>
            <p className="grey">
              The two share a scientific foundation while serving different purposes: public
              understanding through Dr Gutsy, and organisational advisory and design through
              Sagework.
            </p>
            <div className="row">
              <HashLink to="about" className="ul">
                About Sagework <span className="arr">→</span>
              </HashLink>
              <HashLink to="what-we-do" className="ul">
                Work with Sagework <span className="arr">→</span>
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
