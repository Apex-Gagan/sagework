import { sectionId } from '../../routing/views';

/** The Human Adaptation Gap: why the approach exists. */
export function AdaptationGap() {
  return (
    <section id={sectionId('approach', 'adaptation-gap')} className="anchor sec paper">
      <div className="wrap two">
        <div className="c-l">
          <p className="label">The Human Adaptation Gap</p>
          <h2 className="d2">Modern systems are changing faster than human biology.</h2>
          <div className="chart-card">
            <svg
              viewBox="0 0 420 240"
              role="img"
              aria-label="Conceptual diagram: modern demands rise while human biology stays nearly level, opening the Human Adaptation Gap"
            >
              <line x1="20" y1="210" x2="410" y2="210" stroke="#E3E4DE"></line>
              <path
                d="M20 170 C 150 166 240 150 310 104 S 390 30 410 22 L410 152 C 300 156 200 162 20 170 Z"
                fill="#C7D99E"
                fillOpacity=".55"
              ></path>
              <path
                d="M20 170 C 150 166 240 150 310 104 S 390 30 410 22"
                fill="none"
                stroke="#59750B"
                strokeWidth="2"
              ></path>
              <path
                d="M20 170 C 200 162 300 156 410 152"
                fill="none"
                stroke="#76786F"
                strokeWidth="2"
                strokeDasharray="5 6"
              ></path>
              <text x="226" y="62">
                Modern demands
              </text>
              <text x="250" y="178">
                Human biology
              </text>
              <text x="336" y="118" style={{ fill: '#59750B', fontWeight: '600' }}>
                The gap
              </text>
              <text x="20" y="230">
                Past
              </text>
              <text x="380" y="230">
                Today
              </text>
            </svg>
            <p className="small grey" style={{ margin: '8px 0 0' }}>
              Conceptual illustration, not plotted data.
            </p>
          </div>
        </div>
        <div className="c-r">
          <p className="lede" style={{ color: 'var(--ink)' }}>
            Artificial light extends the day. Digital systems compete for attention. Food
            environments prioritise convenience. Buildings can disconnect people from movement,
            nature and restorative rhythms.
          </p>
          <p>
            Work and education often demand continuous performance without creating the conditions
            that sustain it. This mismatch is associated with disrupted sleep, fatigue, persistent
            stress, reduced concentration, poorer metabolic health and slower recovery.
          </p>
          <p>
            <strong style={{ fontWeight: '600' }}>
              Sagework examines this as the Human Adaptation Gap:
            </strong>
            {
              ' the distance between what modern systems demand from people and what human biology needs to function well.'
            }
          </p>
          <p className="grey">
            Many health solutions focus on the individual after the effects appear. Sagework begins
            with the system itself. People do not live in silos. Nutrition cannot be separated from
            the environment in which people eat. Behaviour cannot be separated from the biological,
            social and structural conditions that make it possible. Space is not simply a backdrop.
            It is an active input into how people feel, behave and recover.
          </p>
        </div>
      </div>
    </section>
  );
}
