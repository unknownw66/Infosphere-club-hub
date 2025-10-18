import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Spinner from "./components/ui/Spinner";

// Lazy load page components for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const ClubsPage = lazy(() => import("./pages/ClubsPage"));
const ClubDetailPage = lazy(() => import("./pages/ClubDetailPage"));
const MembersPage = lazy(() => import("./pages/MembersPage"));
const CoordinatorsPage = lazy(() => import("./pages/CoordinatorsPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const AnnouncementsPage = lazy(() => import("./pages/AnnouncementsPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,        // 5 minutes
      refetchInterval: 5 * 60 * 1000,   // Auto-refresh every 5 minutes
      refetchOnWindowFocus: true,     // Refetch when the window is focused
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><Spinner /></div>}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="clubs" element={<ClubsPage />} />
              <Route path="clubs/:clubId" element={<ClubDetailPage />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="coordinators" element={<CoordinatorsPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="announcements" element={<AnnouncementsPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
