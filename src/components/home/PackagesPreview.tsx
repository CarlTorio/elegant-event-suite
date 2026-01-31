import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PackagesPreview = () => {
  const inclusions = [
    "Gown and Suit (Made to Own)",
    "Photo and Video Coverage",
    "Hair and Make Up Artist",
    "100 Pax 4 Main Courses (Upgrade Set Up)",
    "Sounds and Lights",
    "Hotel Accommodation",
    "Bridal Car",
    "Host & On The Day Coordinator",
  ];

  const freebies = [
    "Prenuptial with Save the Date Video",
    "Photobooth Unlimited Hours",
    "4 pcs Gallery (12x18 in size)",
    "25 Pax Meal (Breakfast or Lunch)",
    "Props for Prenup",
    "Selphy Mirror",
  ];

  return (
    <section className="section-light py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="gold-line" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Our Packages
          </h2>
          <p className="text-gray-text text-lg max-w-2xl mx-auto">
            Complete wedding packages designed to make your special day perfect
          </p>
        </div>

        {/* Featured Package Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden card-hover">
            {/* Badge & Price Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-6 md:p-8 text-white text-center">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                FLASH SALE
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">
                250K All-In Package
              </h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl md:text-5xl font-bold">&#8369;250,000</span>
              </div>
              <p className="text-white/80 mt-2 text-sm">
                Valid until end of month — Applicable for next year
              </p>
            </div>

            {/* Inclusions & Freebies */}
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Inclusions */}
                <div>
                  <h4 className="font-display text-xl font-semibold mb-4 text-primary">
                    Inclusions
                  </h4>
                  <ul className="space-y-3">
                    {inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-gray-text">{item}</span>
                      </li>
                    ))}
                    <li className="text-primary text-sm font-medium">
                      + More inclusions...
                    </li>
                  </ul>
                </div>

                {/* Freebies */}
                <div>
                  <h4 className="font-display text-xl font-semibold mb-4 text-accent">
                    Freebies
                  </h4>
                  <ul className="space-y-3">
                    {freebies.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-text">{item}</span>
                      </li>
                    ))}
                    <li className="text-accent text-sm font-medium">
                      + More freebies...
                    </li>
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/packages" className="flex-1">
                  <Button variant="outline" className="w-full rounded-full">
                    View Full Details
                  </Button>
                </Link>
                <Link to="/inquiry" className="flex-1">
                  <Button variant="default" className="w-full rounded-full">
                    Inquire Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesPreview;
