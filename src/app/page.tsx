import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Domains from "@/components/Domains";
import IPShowcase from "@/components/IPShowcase";
import Journey from "@/components/Journey";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Manifesto />
      <Domains />
      <IPShowcase />
      <Journey />
      <Stats />
      <Footer />
    </main>
  );
}