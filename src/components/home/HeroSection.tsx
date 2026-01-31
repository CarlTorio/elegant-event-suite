import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/gallery/wedding-couple-1.png";

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Wedding celebration"
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 opacity-0 animate-fade-in-up">
          Creating Unforgettable Moments
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-6 opacity-0 animate-fade-in-up animation-delay-200">
          Your Dream Wedding Starts Here
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto opacity-0 animate-fade-in-up animation-delay-400">
          Full-service wedding and events planning in Batangas
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up animation-delay-600">
          <Link to="/packages" className="btn-hero-outline">
            View Packages
          </Link>
          <Link to="/book" className="btn-hero-solid">
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white scroll-indicator"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default HeroSection;
