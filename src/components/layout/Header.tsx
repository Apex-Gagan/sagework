import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '../../routing/NavigationContext';
import type { ViewName } from '../../routing/views';
import { HashLink } from '../navigation/HashLink';

const NAV_LINKS: { to: ViewName; label: string; sheetLabel?: string }[] = [
  { to: 'home', label: 'Home' },
  { to: 'discover', label: 'Discover', sheetLabel: 'Discover Sagework' },
  { to: 'founder', label: 'Founder' },
  { to: 'senses', label: 'Five Senses', sheetLabel: 'The Five Senses' },
  { to: 'gutsy', label: 'Dr Gutsy' },
  { to: 'research', label: 'Research & evidence' },
  { to: 'work', label: 'Work with Sagework' },
];

export function Header() {
  const { view, visit } = useNavigation();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sticky elements further down the page offset themselves by --navh.
  useLayoutEffect(() => {
    const setNavHeight = () =>
      document.documentElement.style.setProperty(
        '--navh',
        `${headerRef.current?.offsetHeight ?? 0}px`,
      );
    setNavHeight();
    window.addEventListener('resize', setNavHeight);
    return () => window.removeEventListener('resize', setNavHeight);
  }, []);

  useLayoutEffect(() => {
    setMenuOpen(false);
  }, [visit]);

  return (
    <header className={scrolled ? 'nav scrolled' : 'nav'} id="nav" ref={headerRef}>
      <div className="wrap nav-in">
        <HashLink to="home" className="logo" aria-label="Sagework home">
          <span className="brand-logo" role="img" aria-label="sagework"></span>
        </HashLink>
        <nav className="links" aria-label="Primary">
          {NAV_LINKS.map(({ to, label }) => (
            <HashLink key={to} to={to} className={view === to ? 'active' : undefined}>
              {label}
            </HashLink>
          ))}
        </nav>
        <HashLink
          to="contact"
          className={view === 'contact' ? 'btn btn-dark nav-cta active' : 'btn btn-dark nav-cta'}
        >
          Contact us
        </HashLink>
        <button
          className="burger"
          id="burger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="sheet"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
        </button>
      </div>
      <div className="wrap sheet" id="sheet" hidden={!menuOpen}>
        {NAV_LINKS.map(({ to, label, sheetLabel }) => (
          <HashLink key={to} to={to}>
            {sheetLabel ?? label}
          </HashLink>
        ))}
        <HashLink to="contact">Contact us</HashLink>
      </div>
    </header>
  );
}
