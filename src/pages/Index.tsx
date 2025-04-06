
import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import TrustedBy from "@/components/landing/TrustedBy";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <div className="pt-16"> {/* Added padding to account for fixed navbar */}
        <Hero />
        <TrustedBy />
        <Features />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
