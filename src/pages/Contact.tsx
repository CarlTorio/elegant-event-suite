import { MapPin, Phone, Mail, Clock, Facebook, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/forms/InquiryForm";

const Contact = () => {
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
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pb-20 section-rose">
          <div className="container mx-auto px-4 text-center">
            <div className="gold-line" />
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
              Contact Us
            </h1>
            <p className="text-gray-text text-lg max-w-2xl mx-auto">
              Get in touch with us to start planning your dream celebration
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-20 section-light">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">
                  SSO Events Planner
                </h2>
                <p className="text-gray-text mb-8">
                  We're here to help you create unforgettable moments. Reach out to us through any of the channels below, or send us a message using the form.
                </p>

                <div className="space-y-6 mb-8">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
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
                    className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="font-medium">Facebook</span>
                  </a>
                  <a
                    href="https://web.facebook.com/messages/t/178339349453317"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">Messenger</span>
                  </a>
                </div>

                {/* Map */}
                <div className="h-[300px] rounded-2xl overflow-hidden shadow-lg">
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

              {/* Inquiry Form */}
              <div>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="font-display text-2xl font-semibold mb-6">
                    Send Us a Message
                  </h2>
                  <InquiryForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
