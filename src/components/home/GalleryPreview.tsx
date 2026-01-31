import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

import gallery1 from "@/assets/gallery/debut-1.png";
import gallery2 from "@/assets/gallery/wedding-venue-1.png";
import gallery3 from "@/assets/gallery/wedding-setup-1.png";
import gallery4 from "@/assets/gallery/wedding-aisle-1.png";
import gallery5 from "@/assets/gallery/wedding-entrance-1.png";
import gallery6 from "@/assets/gallery/outdoor-reception-1.png";

const GalleryPreview = () => {
  const images = [
    { src: gallery1, alt: "Debut celebration" },
    { src: gallery2, alt: "Wedding venue setup" },
    { src: gallery3, alt: "Wedding stage setup" },
    { src: gallery4, alt: "Wedding aisle decoration" },
    { src: gallery5, alt: "Wedding entrance" },
    { src: gallery6, alt: "Outdoor reception" },
  ];

  return (
    <section className="section-rose py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="gold-line" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Our Gallery
          </h2>
          <p className="text-gray-text text-lg max-w-2xl mx-auto">
            A glimpse of the magical moments we've helped create
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {images.map((image, index) => (
            <div
              key={index}
              className={`gallery-item ${
                index === 0 || index === 3 ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover rounded-xl ${
                  index === 0 || index === 3 ? "h-64 md:h-full" : "h-40 md:h-56"
                }`}
              />
              <div className="gallery-overlay rounded-xl">
                <Eye className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/gallery">
            <Button variant="default" className="rounded-full px-8">
              View Full Gallery
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
