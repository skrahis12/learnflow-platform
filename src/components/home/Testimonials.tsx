import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alexandra Rivera",
    role: "Software Engineer at Google",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content: "LearnHub transformed my career. The web development bootcamp gave me the skills I needed to land my dream job. The instructors are world-class!",
    rating: 5,
  },
  {
    name: "Marcus Thompson",
    role: "UX Designer at Apple",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    content: "The UI/UX course was incredibly comprehensive. I went from a complete beginner to designing professional interfaces in just 3 months.",
    rating: 5,
  },
  {
    name: "Sarah Kim",
    role: "Data Scientist at Netflix",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    content: "The machine learning course exceeded my expectations. Real-world projects and expert guidance made complex concepts easy to understand.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-28 gradient-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,127,80,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Success Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-2">
            What Our Students Say
          </h2>
          <p className="text-primary-foreground/70 mt-3 max-w-xl mx-auto">
            Join thousands of satisfied learners who've transformed their careers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group bg-card/10 backdrop-blur-xl rounded-2xl p-8 border border-primary-foreground/10 hover:border-accent/30 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-10 h-10 text-accent/40 mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                ))}
              </div>

              <p className="text-primary-foreground/90 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
                />
                <div>
                  <h4 className="font-semibold text-primary-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-primary-foreground/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
