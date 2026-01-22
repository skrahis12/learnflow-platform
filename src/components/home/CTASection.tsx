import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative bg-card rounded-3xl p-12 lg:p-16 overflow-hidden border border-border shadow-card">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Limited Time Offer
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Start Learning Today
              <br />
              <span className="text-accent">Your Future Awaits</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Get unlimited access to all courses with our premium membership. 
              No commitments, cancel anytime.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button variant="accent" size="xl" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              ✓ 7-day free trial &nbsp; ✓ No credit card required &nbsp; ✓ Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
