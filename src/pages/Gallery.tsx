import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import gallery1 from "@/assets/gallery/debut-1.png";
import gallery2 from "@/assets/gallery/wedding-venue-1.png";
import gallery3 from "@/assets/gallery/wedding-setup-1.png";
import gallery4 from "@/assets/gallery/wedding-aisle-1.png";
import gallery5 from "@/assets/gallery/wedding-entrance-1.png";
import gallery6 from "@/assets/gallery/outdoor-reception-1.png";
import gallery7 from "@/assets/gallery/wedding-couple-1.png";
import gallery8 from "@/assets/gallery/debut-2.png";
import gallery9 from "@/assets/gallery/wedding-reception-1.png";

type Category = "all" | "weddings" | "debuts" | "corporate";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const galleryItems = [
    { src: gallery1, alt: "Debut celebration", category: "debuts" },
    { src: gallery2, alt: "Wedding venue setup", category: "weddings" },
    { src: gallery3, alt: "Wedding stage setup", category: "weddings" },
    { src: gallery4, alt: "Wedding aisle decoration", category: "weddings" },
    { src: gallery5, alt: "Wedding entrance", category: "weddings" },
    { src: gallery6, alt: "Outdoor reception", category: "weddings" },
    { src: gallery7, alt: "Wedding couple celebration", category: "weddings" },
    { src: gallery8, alt: "Debut princess theme", category: "debuts" },
    { src: gallery9, alt: "Wedding reception venue", category: "weddings" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const categories: { value: Category; label: string }[] = [
    { value: "all", label: "All" },
    { value: "weddings", label: "Weddings" },
    { value: "debuts", label: "Debuts" },
    { value: "corporate", label: "Corporate" },
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
              Our Gallery
            </h1>
            <p className="text-gray-text text-lg max-w-2xl mx-auto">
              Browse through our collection of beautifully crafted events and celebrations
            </p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 bg-white sticky top-20 z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat.value
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground hover:bg-primary/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 md:py-20 section-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setLightboxImage(item.src)}
                  className="gallery-item aspect-square md:aspect-auto"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="gallery-overlay rounded-xl">
                    <span className="text-white font-medium">View</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-text">No images found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Gallery image"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
