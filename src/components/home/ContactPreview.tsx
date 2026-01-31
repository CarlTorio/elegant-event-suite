import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactPreview = () => {
  const contactInfo = [
    {
      icon: MapPin,
      label: "Address",
      value: "Calicanto, Batangas City, Philippines, 4200",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "0929 297 7638",
    },
    {
      icon: Mail,
      label: "Email",
      value: "ssoeventsplanner@gmail.com",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Monday - Saturday, 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <section className="section-rose py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="gold-line !mx-0" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Get In Touch
            </h2>
            <p className="text-gray-text text-lg mb-8">
              Ready to start planning your dream event? Contact us today and let's make your vision a reality.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-text">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-8">
              <a
                href="https://web.facebook.com/ssoeventsplanner"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <Facebook className="h-5 w-5" />
                <span className="text-sm font-medium">Facebook</span>
              </a>
              <a
                href="https://web.facebook.com/messages/t/178339349453317"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Messenger</span>
              </a>
            </div>

            <Link to="/contact">
              <Button variant="default" className="rounded-full px-8">
                View Full Contact Page
              </Button>
            </Link>
          </div>

          {/* Map */}
          <div className="h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.893055682877!2d121.05595081482976!3d13.759131090342635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd0f8e8e8e8e8d%3A0x8e8e8e8e8e8e8e8e!2sCalicanto%2C%20Batangas%20City%2C%20Batangas!5e0!3m2!1sen!2sph!4v1625000000000!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SSO Events Planner Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPreview;
