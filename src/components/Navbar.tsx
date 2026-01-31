import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Packages", path: "/packages" },
    { name: "Gallery", path: "/gallery" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    if (path.startsWith("/#")) {
      const element = document.getElementById(path.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navClasses = isHomePage
    ? isScrolled
      ? "nav-solid"
      : "nav-transparent"
    : "nav-solid";

  const textClasses = isHomePage && !isScrolled ? "text-white" : "text-foreground";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Left Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${textClasses}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Center Logo */}
            <Link
              to="/"
              className={`font-display text-2xl md:text-3xl font-semibold tracking-wide ${textClasses}`}
            >
              SSO Events Planner
            </Link>

            {/* Right Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.slice(4).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${textClasses}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/book">
                <Button variant="default" className="rounded-full px-6">
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 ${textClasses}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-xl font-semibold">
                SSO Events Planner
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="text-lg font-medium py-2 border-b border-border hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8">
              <Link to="/book" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="default" className="w-full rounded-full">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
