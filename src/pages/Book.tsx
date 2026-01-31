import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppointmentForm from "@/components/forms/AppointmentForm";

const Book = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pb-20 section-rose">
          <div className="container mx-auto px-4 text-center">
            <div className="gold-line" />
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
              Book an Appointment
            </h1>
            <p className="text-gray-text text-lg max-w-2xl mx-auto">
              Schedule a consultation with our team to discuss your event details
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 md:py-20 section-light">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <AppointmentForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Book;
