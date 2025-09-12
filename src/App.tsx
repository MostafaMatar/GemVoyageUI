import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import { LoadingSpinner } from "@/components/ui/loading";
import { LazyErrorBoundary } from "@/components/ui/LazyErrorBoundary";

// Lazy load all page components
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BrowsePage = lazy(() => import("./pages/BrowsePage"));
const GemDetailPage = lazy(() => import("./pages/GemDetailPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const CreateGemPage = lazy(() => import("./pages/CreateGemPage"));
const EmailConfirmation = lazy(() => import("./pages/EmailConfirmation"));
const CompleteProfile = lazy(() => import("./components/CompleteProfile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LazyErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/browse" element={<Layout><BrowsePage /></Layout>} />
                <Route path="/gem/:id" element={<Layout><GemDetailPage /></Layout>} />
                <Route path="/login" element={<Layout><LoginPage /></Layout>} />
                <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
                <Route path="/create" element={<Layout><CreateGemPage /></Layout>} />
                <Route path="/email-confirmation" element={<Layout><EmailConfirmation /></Layout>} />
                <Route path="/complete-profile" element={<Layout><CompleteProfile /></Layout>} />
                <Route path="/edit-profile" element={<Layout><EditProfile /></Layout>} />
                <Route path="/terms" element={<Layout><TermsOfServicePage /></Layout>} />
                <Route path="/privacy" element={<Layout><PrivacyPolicyPage /></Layout>} />
                <Route path="/sitemap" element={<Layout><SitemapPage /></Layout>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </LazyErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
