import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import { WishlistProvider } from "./context/WishlistContext";
import { LearningTimeProvider } from "./context/LearningTimeContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import MyLearning from "./pages/MyLearning";
import Downloads from "./pages/Downloads";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const hideLayout = ["/auth", "/login", "/signup"].includes(location.pathname.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:id/learn" element={<CourseDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WishlistProvider>
        <LearningTimeProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppContent />
          </BrowserRouter>
        </LearningTimeProvider>
      </WishlistProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
