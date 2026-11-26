import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CONTACT_LINK, PRIMARY_NAV, type NavGroup } from '../../data/navigation';
import { useNavigation } from '../../routing/NavigationContext';
import { HashLink } from '../navigation/HashLink';

function Chevron() {
  return (
    <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Desktop entry: the label opens the page; hovering or focusing shows its sections. */
function MenuGroup({ group, active }: { group: NavGroup; active: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const hasMenu = Boolean(group.items?.length);

  return (
    <div
      className={['navg', active && 'active', open && 'open'].filter(Boolean).join(' ')}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') close();
      }}
    >
      <HashLink to={group.to} className="navg-link" onNavigate={close}>
        {group.label}
      </HashLink>
      {hasMenu && (
        <>
          <button
            className="navg-toggle"
            aria-label={`${group.label} sections`}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <Chevron />
          </button>
          <div className="navg-menu glass">
            {group.items!.map((item) => (
              <HashLink key={item.label} to={item.to} section={item.section} onNavigate={close}>
                {item.label}
              </HashLink>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Header() {
  const { view, visit } = useNavigation();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

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

  const isActive = (group: NavGroup) => group.views.includes(view);

  return (
    <header
      className={['nav', scrolled && 'scrolled', menuOpen && 'menu-open'].filter(Boolean).join(' ')}
      id="nav"
      ref={headerRef}
    >
      <div className="wrap nav-in">
        <HashLink to="home" className="logo" aria-label="Sagework home">
          <span className="brand-logo" role="img" aria-label="sagework"></span>
        </HashLink>
        <nav className="links" aria-label="Primary">
          {PRIMARY_NAV.map((group) => (
            <MenuGroup key={group.label} group={group} active={isActive(group)} />
          ))}
        </nav>
        <HashLink
          to={CONTACT_LINK.to}
          className={view === 'contact' ? 'btn btn-dark nav-cta active' : 'btn btn-dark nav-cta'}
        >
          {CONTACT_LINK.label}
        </HashLink>
        <button
          className="burger"
          id="burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="sheet"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
        </button>
      </div>
      <div className="wrap sheet" id="sheet" hidden={!menuOpen}>
        {PRIMARY_NAV.map((group) => {
          const open = expanded === group.label;
          return (
            <div key={group.label} className={open ? 'sheet-group open' : 'sheet-group'}>
              <div className="sheet-row">
                <HashLink to={group.to} className={isActive(group) ? 'active' : undefined}>
                  {group.label}
                </HashLink>
                {group.items?.length ? (
                  <button
                    className="sheet-toggle"
                    aria-label={`${group.label} sections`}
                    aria-expanded={open}
                    onClick={() => setExpanded(open ? null : group.label)}
                  >
                    <Chevron />
                  </button>
                ) : null}
              </div>
              {open && (
                <div className="sheet-items">
                  {group.items!.map((item) => (
                    <HashLink key={item.label} to={item.to} section={item.section}>
                      {item.label}
                    </HashLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <HashLink to={CONTACT_LINK.to} className="btn btn-dark sheet-cta">
          {CONTACT_LINK.label} <span className="arr">→</span>
        </HashLink>
      </div>
    </header>
  );
}
