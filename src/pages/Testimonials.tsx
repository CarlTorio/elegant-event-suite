import { Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const testimonials = [
  {
    quote:
      "Sobrang satisfied kami sa service ng SSO Events! Lahat ng details ng wedding namin, sila na bahala. Stress-free kami sa special day namin. Highly recommended!",
    name: "Maria Santos",
    event: "Wedding 2024",
  },
  {
    quote:
      "From prenup to wedding day, todo assist ang team ni SSO. Ang ganda ng coordination, on-time lahat. Thank you for making our dream wedding come true!",
    name: "John and Angela Reyes",
    event: "Wedding 2024",
  },
  {
    quote:
      "Hindi ko inexpect na ganito kaganda ang magiging debut ko. Ang daming freebies at sobrang accommodating ng team. Worth it ang every peso!",
    name: "Patricia Dela Cruz",
    event: "Debut 2024",
  },
  {
    quote:
      "Maraming salamat SSO Events! Kahit last minute ang changes namin, nag-adjust kayo agad. Super professional ng team nyo.",
    name: "Roberto and Cristina Mendoza",
    event: "Wedding 2023",
  },
  {
    quote:
      "Napakaganda ng coordination at sobrang bait ng team. Lahat ng guests namin impressed sa venue setup. Will definitely recommend SSO Events!",
    name: "Anna Marie Garcia",
    event: "Wedding 2024",
  },
  {
    quote:
      "Ang galing ng SSO Events! Yung corporate event namin naging successful dahil sa kanila. Very organized and professional ang approach.",
    name: "Tech Solutions Inc.",
    event: "Corporate Event 2024",
  },
];

const Testimonials = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pb-20 section-rose">
          <div className="container mx-auto px-4 text-center">
            <div className="gold-line" />
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
              What Our Clients Say
            </h1>
            <p className="text-gray-text text-lg max-w-2xl mx-auto">
              Real stories from couples and families who trusted us with their special celebrations
            </p>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-12 md:py-20 section-light">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 card-hover"
                >
                  {/* Quote Mark */}
                  <span className="quote-mark block">"</span>

                  {/* Quote */}
                  <p className="text-foreground italic mb-6 leading-relaxed">
                    {testimonial.quote}
                  </p>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Name */}
                  <p className="font-display text-lg font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-text text-sm">{testimonial.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-20 section-rose">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Ready to Create Your Own Story?
            </h2>
            <p className="text-gray-text text-lg max-w-2xl mx-auto mb-8">
              Let us help you plan an unforgettable celebration that your guests will talk about for years.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/inquiry" className="btn-hero-solid">
                Send Inquiry
              </a>
              <a href="/book" className="btn-hero-outline !border-primary !text-primary hover:!bg-primary hover:!text-white">
                Book Appointment
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;
