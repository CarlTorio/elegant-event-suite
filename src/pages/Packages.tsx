import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Packages = () => {
  const mainPackage = {
    name: "250K All-In Package",
    price: 250000,
    badge: "FLASH SALE",
    validity: "Until end of month — Applicable for next year",
    inclusions: [
      "Gown and Suit (Made to Own)",
      "Photo and Video Coverage",
      "Hair and Make Up Artist",
      "100 Pax 4 Main Courses (Upgrade Set Up)",
      "Sounds and Lights",
      "Souvenir for 10 Pax",
      "Invitation (50 pcs)",
      "Cake (3 Tier)",
      "Hotel Accommodation",
      "Bridal Car",
      "Host",
      "On The Day Coordinator",
      "Flower for Full Entourage",
      "Flower Church Arrangement",
    ],
    freebies: [
      "4 pcs Gallery (12x18 in size)",
      "25 Pax Meal (Breakfast or Lunch)",
      "Photobooth Unlimited Hours",
      "Prenuptial with Save the Date Video",
      "Props for Prenup",
      "1 Set Outfit for Prenup",
      "Mannequin",
      "Wedding Wands",
      "Selphy Mirror",
      "Robe",
    ],
  };

  const otherPackages = [
    {
      name: "Intimate Package",
      description: "Perfect for small, intimate celebrations with up to 50 guests",
      startingPrice: 120000,
      features: [
        "50 Pax Catering",
        "Photo & Video Coverage",
        "Basic Flowers & Decor",
        "Sound System",
        "Coordinator",
      ],
    },
    {
      name: "Premium Package",
      description: "Elevated experience for those who want extra special touches",
      startingPrice: 350000,
      features: [
        "150 Pax Catering",
        "Premium Photo & Video",
        "Luxury Decor Setup",
        "LED Wall",
        "Full Coordination Team",
      ],
    },
    {
      name: "Debut Package",
      description: "Make your 18th birthday celebration unforgettable",
      startingPrice: 100000,
      features: [
        "Gown & Styling",
        "Photo & Video",
        "Catering for 50 Pax",
        "Sounds & Lights",
        "18 Roses/Candles Setup",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pb-20 section-rose">
          <div className="container mx-auto px-4 text-center">
            <div className="gold-line" />
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
              Our Packages
            </h1>
            <p className="text-gray-text text-lg max-w-2xl mx-auto">
              Complete wedding and events packages tailored to make your celebration perfect
            </p>
          </div>
        </section>

        {/* Featured Package */}
        <section className="py-12 md:py-20 section-light">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-8 md:p-12 text-white text-center">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    {mainPackage.badge}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
                    {mainPackage.name}
                  </h2>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl md:text-6xl font-bold">
                      &#8369;{mainPackage.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-white/80 mt-4">{mainPackage.validity}</p>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-12">
                    {/* Inclusions */}
                    <div>
                      <h3 className="font-display text-2xl font-semibold mb-6 text-primary">
                        Inclusions
                      </h3>
                      <ul className="space-y-3">
                        {mainPackage.inclusions.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-gray-text">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Freebies */}
                    <div>
                      <h3 className="font-display text-2xl font-semibold mb-6 text-accent">
                        Freebies
                      </h3>
                      <ul className="space-y-3">
                        {mainPackage.freebies.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-gray-text">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-12">
                    <Link to="/inquiry">
                      <Button variant="default" className="w-full rounded-full text-lg py-6">
                        Inquire About This Package
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Packages */}
        <section className="py-12 md:py-20 section-rose">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
                Other Packages
              </h2>
              <p className="text-gray-text">
                Choose the perfect package for your celebration
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {otherPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
                >
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-2xl font-semibold mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-text text-sm mb-4">{pkg.description}</p>
                    <p className="text-3xl font-bold text-primary mb-6">
                      &#8369;{pkg.startingPrice.toLocaleString()}
                      <span className="text-sm font-normal text-gray-text ml-1">
                        starting
                      </span>
                    </p>

                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-accent" />
                          <span className="text-gray-text">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/inquiry">
                      <Button variant="outline" className="w-full rounded-full">
                        Inquire Now
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Package CTA */}
        <section className="py-12 md:py-20 section-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Need a Custom Package?
            </h2>
            <p className="text-gray-text text-lg max-w-2xl mx-auto mb-8">
              We can create a personalized package tailored to your specific needs and budget.
              Contact us to discuss your dream celebration.
            </p>
            <Link to="/contact">
              <Button variant="default" className="rounded-full px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Packages;
