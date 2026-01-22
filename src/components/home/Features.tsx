import { 
  PlayCircle, 
  Award, 
  Users, 
  Zap, 
  Shield, 
  Clock 
} from "lucide-react";

const features = [
  {
    icon: PlayCircle,
    title: "HD Video Streaming",
    description: "Crystal clear video quality with adaptive streaming for any connection speed.",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description: "Earn recognized certificates upon completion to showcase your achievements.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals with real-world experience.",
  },
  {
    icon: Zap,
    title: "Interactive Learning",
    description: "Quizzes, assignments, and projects to reinforce your learning.",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Your data and progress are protected with enterprise-grade security.",
  },
  {
    icon: Clock,
    title: "Lifetime Access",
    description: "Once enrolled, access your courses forever at your own pace.",
  },
];

const Features = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Built for Modern Learners
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Everything you need for an exceptional learning experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center mb-6 shadow-lg group-hover:shadow-glow transition-shadow duration-300">
                <feature.icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
