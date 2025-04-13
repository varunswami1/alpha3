import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import TrustedBy from "@/components/landing/TrustedBy";
import Footer from "@/components/landing/Footer";
import GardeningInfo from "@/components/landing/GardeningInfo";
import Testimonials from "@/components/landing/Testimonials";
import GardeningStats from "@/components/landing/GardeningStats";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <div className="pt-16">
        {" "}
        {/* Added padding to account for fixed navbar */}
        <Hero />
        <GardeningInfo />
        <Testimonials />
        <GardeningStats />
        <TrustedBy />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
