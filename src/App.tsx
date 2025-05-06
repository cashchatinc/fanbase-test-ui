import { Feed } from 'components/feed';
import { Layout, MobileNavigation, RightPanel, Sidebar } from 'components/layout';
import { useTheme } from 'contexts';
import { useState } from 'react';

export default function App() {
  const [activePage, setActivePage] = useState<
    'home' | 'explore' | 'notifications' | 'messages' | 'profile'
  >('home');
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <Layout>
        <div className="flex min-h-screen w-full">
          {/* Left Sidebar - hidden on mobile */}
          <div className="hidden md:block md:w-64 lg:w-72 shrink-0">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
          </div>

          {/* Main Content */}
          <main className="flex-1 border-x border-gray-200 dark:border-gray-800">
            <Feed activePage={activePage} />
          </main>

          {/* Right Panel - hidden on smaller screens */}
          <div className="hidden lg:block lg:w-80 xl:w-96 shrink-0">
            <RightPanel />
          </div>
        </div>

        {/* Mobile Navigation - visible only on mobile */}
        <div className="block md:hidden fixed bottom-0 left-0 right-0 z-10">
          <MobileNavigation activePage={activePage} setActivePage={setActivePage} />
        </div>
      </Layout>
    </div>
  );
}
