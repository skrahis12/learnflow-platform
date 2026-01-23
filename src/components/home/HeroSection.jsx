import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Users, BookOpen, Award, ArrowRight, Code } from "lucide-react";
const HeroSection = () => {
  const stats = [
    { icon: Users, value: "50K+", label: "Active Students" },
    { icon: BookOpen, value: "500+", label: "Courses" },
    { icon: Award, value: "95%", label: "Success Rate" },
  ];
  return (<section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 gradient-hero opacity-95" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,127,80,0.15),transparent_50%)]" />

    {/* Decorative elements */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />

    <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-foreground/10 border border-accent-foreground/20 mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent-foreground">
              New courses added weekly
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-accent-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Unlock Your
            <br />
            <span className="relative">
              Learning Potential
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 150 4 298 10" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-accent-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Master new skills with world-class instructors. Join thousands of learners transforming their careers through premium online education.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/courses">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Explore Courses
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat) => (<div key={stat.label} className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                <stat.icon className="w-5 h-5 text-accent" />
                <span className="text-2xl md:text-3xl font-bold text-accent-foreground">
                  {stat.value}
                </span>
              </div>
              <span className="text-sm text-accent-foreground/60">{stat.label}</span>
            </div>))}
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative hidden lg:block animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative">
            {/* Main card */}
            <div className="bg-card/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-accent-foreground/10">
              <div className="aspect-video bg-black rounded-2xl mb-4 flex items-center justify-center overflow-hidden relative group/hero">
                <video
                  src="https://assets.mixkit.co/videos/preview/mixkit-monitor-with-green-programming-code-typing-in-terminal-42353-large.mp4"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-md flex items-center justify-center border border-white/30 animate-pulse">
                    <Code className="w-8 h-8 text-accent" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded-full w-3/4 overflow-hidden relative text-xs">
                  <div className="absolute inset-0 bg-accent/20 animate-pulse" />
                </div>
                <div className="h-3 bg-muted rounded-full w-1/2 overflow-hidden relative text-xs">
                  <div className="absolute inset-0 bg-accent/10 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-6 -right-6 bg-card rounded-2xl p-4 shadow-xl border border-border animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Certificate</p>
                  <p className="text-xs text-muted-foreground">Upon completion</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-6 bg-card rounded-2xl p-4 shadow-xl border border-border animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (<div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 border-2 border-card" />))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">2.5K+ enrolled</p>
                  <p className="text-xs text-muted-foreground">this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>);
};
export default HeroSection;
