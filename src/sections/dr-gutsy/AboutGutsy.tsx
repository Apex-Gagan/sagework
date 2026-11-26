import { sectionId } from '../../routing/views';

/** What Dr Gutsy is, and the character behind it. */
export function AboutGutsy() {
  return (
    <section id={sectionId('dr-gutsy', 'about')} className="anchor sec s paper">
      <div className="wrap two">
        <div className="c-l">
          <p className="label">About Dr Gutsy</p>
          <h2 className="d2">Every stage of a woman's life deserves clear science.</h2>
        </div>
        <div className="c-r">
          <p className="lede" style={{ color: 'var(--ink)' }}>
            Dr Gutsy is Sagework's women's health education platform, founded by Dr Shruti Pai. It
            brings curiosity, scientific rigour and clear communication to hormonal health and the
            transitions across the female life course.
          </p>
          <p className="grey">
            From puberty and periods to fertility, pregnancy, perimenopause and menopause, Dr Gutsy
            looks at what the evidence shows, what remains uncertain and where women's experiences
            and the available information do not yet match. It draws on Dr Shruti's background in
            clinical nutrition and the gut microbiome, and on Sagework's WISE women's health series.
          </p>
          <h3 className="d3" style={{ marginTop: '40px' }}>
            Meet the character behind the questions
          </h3>
          <p className="grey">
            Dr Gutsy is a character created by Dr Shruti Pai to bring health education to life.
            Curious, empathetic and occasionally witty, Dr Gutsy listens to everyday questions,
            investigates the evidence and turns complex explanations into stories people can follow.
          </p>
        </div>
      </div>
    </section>
  );
}
