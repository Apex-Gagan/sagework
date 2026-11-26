import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Pending } from './components/shared/Pending';
import { AboutPage } from './pages/AboutPage';
import { ApproachPage } from './pages/ApproachPage';
import { ContactPage } from './pages/ContactPage';
import { DrGutsyPage } from './pages/DrGutsyPage';
import { HomePage } from './pages/HomePage';
import { KnowledgePage } from './pages/KnowledgePage';
import { LegalPage } from './pages/LegalPage';
import { NewsPage } from './pages/NewsPage';
import { SitemapPage } from './pages/SitemapPage';
import { WhatWeDoPage } from './pages/WhatWeDoPage';
import { NavigationProvider } from './routing/NavigationProvider';

// Every page stays mounted and `View` hides the inactive ones. That keeps form
// input, accordions, the film position and the WebGL scenes alive between pages.
export function App() {
  return (
    <NavigationProvider>
      <Header />
      <main>
        <HomePage />
        <AboutPage />
        <ApproachPage />
        <WhatWeDoPage />
        <KnowledgePage />
        <DrGutsyPage />
        <ContactPage />
        <SitemapPage />
        <Pending>
          <NewsPage />
          <LegalPage page="privacy" />
          <LegalPage page="terms" />
          <LegalPage page="disclaimer" />
        </Pending>
      </main>
      <Footer />
    </NavigationProvider>
  );
}
