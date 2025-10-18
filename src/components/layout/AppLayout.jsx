import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

/**
 * AppLayout Component
 * This component serves as the main layout wrapper for the entire application.
 * It renders the Header, the main content area (via React Router's Outlet), and the Footer.
 * This ensures a consistent structure across all pages.
 */
const AppLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
