import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { ContactPage } from './pages/ContactPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { DrGutsyPage } from './pages/DrGutsyPage';
import { FiveSensesPage } from './pages/FiveSensesPage';
import { FounderPage } from './pages/FounderPage';
import { HomePage } from './pages/HomePage';
import { ResearchPage } from './pages/ResearchPage';
import { WorkPage } from './pages/WorkPage';
import { NavigationProvider } from './routing/NavigationProvider';

// Every page stays mounted and `View` hides the inactive ones. That keeps form
// input, accordions, the film position and the WebGL scenes alive between pages.
export function App() {
  return (
    <NavigationProvider>
      <Header />
      <main>
        <HomePage />
        <FounderPage />
        <DiscoverPage />
        <FiveSensesPage />
        <DrGutsyPage />
        <ResearchPage />
        <WorkPage />
        <ContactPage />
      </main>
      <Footer />
    </NavigationProvider>
  );
}
