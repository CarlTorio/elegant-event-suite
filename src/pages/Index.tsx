import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import PackagesPreview from "@/components/home/PackagesPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactPreview from "@/components/home/ContactPreview";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <PackagesPreview />
        <GalleryPreview />
        <TestimonialsSection />
        <CTASection />
        <ContactPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
