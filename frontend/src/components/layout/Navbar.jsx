import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, User } from "lucide-react";
import QurioLogo from "@/components/ui/QurioLogo";
import { useTheme } from "next-themes";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { currentUser } = useAuth();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  const location = useLocation();
  const navLinks = [
    { name: "Courses", href: "/courses" },
    { name: "Categories", href: "/categories" },
    { name: "Resources", href: "/resources" },
    { name: "Dashboard", href: "/dashboard" },
  ];
  const isActive = (path) => location.pathname === path;
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-105">
              <QurioLogo className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70">
              Qurio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${isActive(link.href)
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground"
            >
              {mounted && (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            </Button>
            {currentUser ? (
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="hover:bg-accent/10">
                  <User className="w-5 h-5 text-foreground" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth" state={{ mode: "signup" }}>
                <Button variant="accent" size="sm">
                  Get Started
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-fade-up">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block py-2 text-base font-medium ${isActive(link.href)
                  ? "text-accent"
                  : "text-muted-foreground"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted && (theme === "dark" ? (
                  <>
                    <Sun className="w-4 h-4" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" /> Dark Mode
                  </>
                ))}
              </Button>
              {currentUser ? (
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <User className="w-4 h-4" /> Go to Profile
                  </Button>
                </Link>
              ) : (
                <Link to="/auth" state={{ mode: "signup" }} onClick={() => setIsOpen(false)}>
                  <Button variant="accent" className="w-full">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
