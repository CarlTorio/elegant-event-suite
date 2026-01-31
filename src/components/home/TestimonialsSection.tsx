import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

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
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-light py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="gold-line" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-text text-lg max-w-2xl mx-auto">
            Real stories from couples who trusted us with their special day
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Card */}
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">
              {/* Quote Mark */}
              <span className="quote-mark block mb-4">"</span>

              {/* Quote */}
              <p className="text-lg md:text-xl text-foreground italic mb-8 leading-relaxed">
                {testimonials[currentIndex].quote}
              </p>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Name */}
              <p className="font-display text-xl font-semibold">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-gray-text text-sm">
                {testimonials[currentIndex].event}
              </p>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-primary/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
