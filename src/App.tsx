import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tentang from "./pages/Tentang";
import Penyakit from "./pages/Penyakit";
import Pencegahan from "./pages/Pencegahan";
import Konsultasi from "./pages/Konsultasi";
import Kontak from "./pages/Kontak";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/penyakit" element={<Penyakit />} />
		  <Route path="/Pencegahan" element={<Pencegahan />} />
		  <Route path="/konsultasi" element={<Konsultasi />} />
          <Route path="/kontak" element={<Kontak />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
