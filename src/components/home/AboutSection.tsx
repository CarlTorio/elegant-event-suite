import { Heart, Award, Users } from "lucide-react";
import aboutImage from "@/assets/gallery/wedding-venue-1.png";

const AboutSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Passionate Planning",
      description: "We pour our hearts into every detail of your special day.",
    },
    {
      icon: Award,
      title: "Experienced Team",
      description: "Years of experience creating memorable celebrations.",
    },
    {
      icon: Users,
      title: "Personal Touch",
      description: "Every event is unique, just like you and your story.",
    },
  ];

  return (
    <section id="about" className="section-rose py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={aboutImage}
              alt="Beautiful wedding venue setup"
              className="rounded-2xl shadow-xl w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 hidden md:block">
              <p className="font-display text-4xl font-bold text-primary">100+</p>
              <p className="text-gray-text text-sm">Events Planned</p>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <div className="gold-line !mx-0" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              About SSO Events Planner
            </h2>
            <p className="text-gray-text text-lg mb-8 leading-relaxed">
              Based in Batangas City, SSO Events Planner is your trusted partner 
              in creating unforgettable celebrations. From intimate gatherings to 
              grand weddings, we bring your vision to life with meticulous attention 
              to detail and heartfelt dedication.
            </p>

            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-text">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
