import { Link } from "react-router-dom";
import { Facebook, MessageCircle, Phone } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Logo */}
          <h3 className="font-display text-2xl md:text-3xl font-semibold mb-6">
            SSO Events Planner
          </h3>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6 mb-6">
            {quickLinks.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <Link
                  to={link.path}
                  className="text-white/80 hover:text-white transition-colors text-sm md:text-base"
                >
                  {link.name}
                </Link>
                {index < quickLinks.length - 1 && (
                  <span className="text-white/40 ml-2 md:ml-6">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <a
              href="https://web.facebook.com/ssoeventsplanner"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://web.facebook.com/messages/t/178339349453317"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-center gap-2 mb-6 text-white/80">
            <Phone className="h-4 w-4" />
            <span>0929 297 7638</span>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-6">
            {/* Powered by */}
            <p className="text-white/40 text-xs mb-2">
              Powered by LogiCode.PH
            </p>

            {/* Copyright */}
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} SSO Events Planner. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
