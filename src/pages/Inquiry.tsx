import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/forms/InquiryForm";

const Inquiry = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pb-20 section-rose">
          <div className="container mx-auto px-4 text-center">
            <div className="gold-line" />
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
              Package Inquiry
            </h1>
            <p className="text-gray-text text-lg max-w-2xl mx-auto">
              Tell us about your dream event and we'll get back to you within 24 hours
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 md:py-20 section-light">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <InquiryForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Inquiry;
