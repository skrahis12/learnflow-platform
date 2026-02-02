import { Link } from "react-router-dom";
import { GraduationCap, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
const Footer = () => {
  const footerLinks = {
    platform: [
      { name: "Browse Courses", href: "/courses" },
      { name: "Categories", href: "/categories" },
      { name: "Become an Instructor", href: "/teach" },
      { name: "Pricing", href: "/pricing" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];
  return (<footer className="bg-card border-t border-border">
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/logo.png" alt="Qurio Icon" className="w-full h-full object-contain" />
            </div>
            <div className="h-8 flex items-center">
              <img src="/brand-text.png" alt="Qurio" className="h-[70%] object-contain dark:brightness-200 brightness-0" />
            </div>
          </Link>
          <p className="text-muted-foreground text-sm mb-6 max-w-xs">
            Empowering learners worldwide with premium education. Master new skills and advance your career.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (<a key={social.label} href={social.href} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200" aria-label={social.label}>
              <social.icon className="w-4 h-4" />
            </a>))}
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Platform</h4>
          <ul className="space-y-3">
            {footerLinks.platform.map((link) => (<li key={link.name}>
              <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.name}
              </Link>
            </li>))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Company</h4>
          <ul className="space-y-3">
            {footerLinks.company.map((link) => (<li key={link.name}>
              <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.name}
              </Link>
            </li>))}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Support</h4>
          <ul className="space-y-3">
            {footerLinks.support.map((link) => (<li key={link.name}>
              <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.name}
              </Link>
            </li>))}
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2024 Qurio. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Made with ❤️ for learners everywhere
        </p>
      </div>
    </div>
  </footer>);
};
export default Footer;
