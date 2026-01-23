import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import {
    Code, Palette, TrendingUp, Camera, Music, Briefcase, Brain, Languages,
    Smartphone, Database, Layout, Shield, Globe, Cpu, BarChart, Settings
} from "lucide-react";

const allCategories = [
    {
        name: "Web Development",
        icon: Code,
        count: 156,
        description: "HTML, CSS, JavaScript, React, Node.js and more.",
        color: "from-blue-500/20 to-cyan-500/20",
        hoverColor: "text-blue-500",
    },
    {
        name: "Graphic Design",
        icon: Palette,
        count: 89,
        description: "Photoshop, Illustrator, Figma, and UI/UX design.",
        color: "from-pink-500/20 to-rose-500/20",
        hoverColor: "text-pink-500",
    },
    {
        name: "Business Strategy",
        icon: Briefcase,
        count: 124,
        description: "Leadership, entrepreneurship, and management.",
        color: "from-amber-500/20 to-orange-500/20",
        hoverColor: "text-amber-500",
    },
    {
        name: "Digital Marketing",
        icon: TrendingUp,
        count: 78,
        description: "SEO, social media, and content marketing.",
        color: "from-green-500/20 to-emerald-500/20",
        hoverColor: "text-green-500",
    },
    {
        name: "Mobile Apps",
        icon: Smartphone,
        count: 64,
        description: "iOS, Android, React Native, and Flutter.",
        color: "from-indigo-500/20 to-purple-500/20",
        hoverColor: "text-indigo-500",
    },
    {
        name: "Data Science",
        icon: Database,
        count: 92,
        description: "Python, Machine Learning, and Big Data.",
        color: "from-cyan-500/20 to-blue-500/20",
        hoverColor: "text-cyan-500",
    },
    {
        name: "Photography",
        icon: Camera,
        count: 45,
        description: "DSLR, lightning, and photo editing secrets.",
        color: "from-violet-500/20 to-purple-500/20",
        hoverColor: "text-violet-500",
    },
    {
        name: "Cybersecurity",
        icon: Shield,
        count: 38,
        description: "Ethical hacking, network security, and more.",
        color: "from-red-500/20 to-orange-500/20",
        hoverColor: "text-red-500",
    },
    {
        name: "Music Production",
        icon: Music,
        count: 67,
        description: "Mixing, mastering, and digital composition.",
        color: "from-rose-500/20 to-pink-500/20",
        hoverColor: "text-rose-500",
    },
    {
        name: "Artificial Intelligence",
        icon: Brain,
        count: 53,
        description: "Neural networks, AI ethics, and automation.",
        color: "from-purple-500/20 to-indigo-500/20",
        hoverColor: "text-purple-500",
    },
    {
        name: "International Languages",
        icon: Languages,
        count: 34,
        description: "Spanish, French, German, and Mandarin.",
        color: "from-teal-500/20 to-emerald-500/20",
        hoverColor: "text-teal-500",
    },
    {
        name: "Cloud Computing",
        icon: Globe,
        count: 42,
        description: "AWS, Azure, and Google Cloud hosting.",
        color: "from-sky-500/20 to-blue-500/20",
        hoverColor: "text-sky-500",
    }
];

const Categories = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="pt-32 pb-16 gradient-hero text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">Explore by Category</h1>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto">
                            Discover thousands of courses across dozens of specialized categories.
                            Find your next career-defining skill today.
                        </p>
                    </div>
                </section>

                {/* Categories Grid */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {allCategories.map((category, index) => (
                                <Link
                                    key={category.name}
                                    to={`/courses?category=${category.name.toLowerCase()}`}
                                    className="group animate-fade-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="relative h-full bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                                        {/* Background Glow */}
                                        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${category.color} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className={`w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${category.hoverColor}`}>
                                                <category.icon className="w-7 h-7" />
                                            </div>

                                            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                                                {category.name}
                                            </h3>

                                            <p className="text-muted-foreground mb-6 flex-grow">
                                                {category.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                <span className="text-sm font-semibold text-accent">
                                                    {category.count} Courses
                                                </span>
                                                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                                                    Browse →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Popular Tags / Topics */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-display font-bold mb-10">Popular Topics</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {["React", "Python", "UX Design", "Copywriting", "AWS", "Node.js", "Financial Analysis", "Public Speaking", "SEO", "Unity", "Photoshop", "Excel", "Data Visualization", "Swift"].map(topic => (
                                <Link
                                    key={topic}
                                    to={`/courses?search=${topic.toLowerCase()}`}
                                    className="px-6 py-2 rounded-full bg-card border border-border hover:border-accent hover:text-accent font-medium transition-all"
                                >
                                    {topic}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Categories;
