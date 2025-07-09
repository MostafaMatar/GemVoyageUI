import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import BrowsePage from "./pages/BrowsePage";
import GemDetailPage from "./pages/GemDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateGemPage from "./pages/CreateGemPage";
import EmailConfirmation from "./pages/EmailConfirmation";
import CompleteProfile from "./components/CompleteProfile";
import EditProfile from "./pages/EditProfile";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AdsRedirect from "./components/AdsRedirect";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/ads.txt" element={<AdsRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
