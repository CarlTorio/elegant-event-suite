import { Link } from "react-router-dom";
import ctaImage from "@/assets/gallery/wedding-aisle-1.png";

const CTASection = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={ctaImage}
          alt="Beautiful wedding setup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
          Ready to Plan Your Dream Event?
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Let us help you create memories that will last a lifetime. Book your consultation today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/inquiry" className="btn-hero-outline">
            Send Inquiry
          </Link>
          <Link to="/book" className="btn-hero-solid">
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
