const STEPS = [
  {
    name: 'Listen',
    text: 'Begin with a question or experience people recognise, taking its context seriously rather than rushing to an explanation.',
  },
  {
    name: 'Investigate',
    text: 'Examine the evidence, question assumptions and distinguish what is established from what remains uncertain.',
  },
  {
    name: 'Explain',
    text: 'Use clear language, relatable stories and visual explanations to make the science understandable without losing its meaning.',
  },
  {
    name: 'Connect',
    text: 'Show what the evidence may mean in everyday life, what it does not establish and when a question needs qualified professional care.',
  },
];

/** How Dr Gutsy approaches a question, and what readers can expect. */
export function GutsyMethod() {
  return (
    <>
      <div className="sec dark">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="label">How Dr Gutsy approaches a question</p>
              <h2 className="d2">Listen. Investigate. Explain. Connect.</h2>
            </div>
          </div>
          <div className="grid g4">
            {STEPS.map(({ name, text }, i) => (
              <div key={name}>
                <p className="muted small">{`Step ${i + 1}`}</p>
                <h3 className="d3">{name}</h3>
                <p className="muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sec">
        <div className="wrap two">
          <div className="c-l">
            <p className="label">What you can expect</p>
            <ul className="checks">
              <li>Questions drawn from everyday life.</li>
              <li>Scientific explanations in clear, accessible language.</li>
              <li>Stories and visuals that make complex ideas easier to follow.</li>
              <li>Practical observations and questions to inform everyday decisions.</li>
              <li>Visible sources and honest explanations of uncertainty.</li>
            </ul>
          </div>
          <div className="c-r">
            <div className="tile" style={{ padding: 'clamp(28px,3.4vw,44px)' }}>
              <span className="k">Clear science. Honest boundaries.</span>
              <p style={{ color: 'var(--ink)', fontSize: '1.05rem' }}>
                Dr Gutsy is grounded in evidence-led science. We explain what research supports,
                where uncertainty remains and why findings may not apply equally to everyone.
              </p>
              <p>
                <strong style={{ fontWeight: '600', color: 'var(--ink)' }}>
                  The platform provides health education.
                </strong>
                {
                  ' It does not diagnose conditions, prescribe treatment or replace individual medical care.'
                }
              </p>
              <p>
                We do not use fear, shame or promises of a cure to make an explanation more
                compelling. Where a question requires personal assessment, we encourage qualified
                professional care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
