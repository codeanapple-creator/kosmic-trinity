import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GaneshaChat } from "@/components/ui/ganesha-chat";

import Home from "@/pages/home";
import About from "@/pages/about";
import Dharma from "@/pages/dharma";
import Artha from "@/pages/artha";
import Kaam from "@/pages/kaam";
import Storefront from "@/pages/storefront";
import Journal from "@/pages/journal";
import Abhivyakti from "@/pages/abhivyakti";
import Triveni from "@/pages/triveni";
import Disclaimer from "@/pages/disclaimer";
import Terms from "@/pages/terms";
import Booking from "@/pages/booking";
import BookingSuccess from "@/pages/booking-success";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/dharma" component={Dharma} />
          <Route path="/artha" component={Artha} />
          <Route path="/kaam" component={Kaam} />
          <Route path="/storefront" component={Storefront} />
          <Route path="/journal" component={Journal} />
          <Route path="/abhivyakti" component={Abhivyakti} />
          <Route path="/triveni" component={Triveni} />
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/terms" component={Terms} />
          <Route path="/booking" component={Booking} />
          <Route path="/booking/success" component={BookingSuccess} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <GaneshaChat />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
