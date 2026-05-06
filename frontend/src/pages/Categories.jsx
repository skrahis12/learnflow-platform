import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CourseCard from "@/components/courses/CourseCard";
import {
    Code, Palette, TrendingUp, Camera, Music, Briefcase, Brain, Languages,
    Smartphone, Database, Layout, Shield, Globe, Cpu, BarChart, Settings, ChevronRight
} from "lucide-react";

const allCategories = [
    {
        name: "Web Development",
        icon: Code,
        count: 156,
        description: "HTML, CSS, JavaScript, React, Node.js and more.",
        color: "from-blue-500/20 to-cyan-500/20",
        hoverColor: "text-blue-500",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-laptop-34460-large.mp4",
    },
    {
        name: "Graphic Design",
        icon: Palette,
        count: 89,
        description: "Photoshop, Illustrator, Figma, and UI/UX design.",
        color: "from-pink-500/20 to-rose-500/20",
        hoverColor: "text-pink-500",
        image: "https://images.unsplash.com/photo-1626785774573-4b7993125651?w=800&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hand-sketching-a-logo-on-a-digital-tablet-42544-large.mp4",
    },
    {
        name: "Business Strategy",
        icon: Briefcase,
        count: 124,
        description: "Leadership, entrepreneurship, and management.",
        color: "from-amber-500/20 to-orange-500/20",
        hoverColor: "text-amber-500",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },
    {
        name: "Digital Marketing",
        icon: TrendingUp,
        count: 78,
        description: "SEO, social media, and content marketing.",
        color: "from-green-500/20 to-emerald-500/20",
        hoverColor: "text-green-500",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
        name: "Mobile Apps",
        icon: Smartphone,
        count: 64,
        description: "iOS, Android, React Native, and Flutter.",
        color: "from-indigo-500/20 to-purple-500/20",
        hoverColor: "text-indigo-500",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    },
    {
        name: "Data Science",
        icon: Database,
        count: 92,
        description: "Python, Machine Learning, and Big Data.",
        color: "from-cyan-500/20 to-blue-500/20",
        hoverColor: "text-cyan-500",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-lines-and-dots-connecting-30514-large.mp4",
    },

    {
        name: "Cybersecurity",
        icon: Shield,
        count: 38,
        description: "Ethical hacking, network security, and more.",
        color: "from-red-500/20 to-orange-500/20",
        hoverColor: "text-red-500",
        image: "https://images.unsplash.com/photo-1563206767-5b1d972d9323?w=800&q=80",
    },

    {
        name: "Artificial Intelligence",
        icon: Brain,
        count: 53,
        description: "Neural networks, AI ethics, and automation.",
        color: "from-purple-500/20 to-indigo-500/20",
        hoverColor: "text-purple-500",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    },

    {
        name: "Cloud Computing",
        icon: Globe,
        count: 42,
        description: "AWS, Azure, and Google Cloud hosting.",
        color: "from-sky-500/20 to-blue-500/20",
        hoverColor: "text-sky-500",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    }
];

const Categories = () => {
    return (
        <div className="w-full">
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
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Browse Categories</h2>
                            <p className="text-muted-foreground text-lg">Select a category to start learning</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {allCategories.map((category, index) => (
                                <div key={category.name} className="animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <CourseCard
                                        id={category.name.toLowerCase().replace(/\s+/g, '-')}
                                        title={`${category.name} Fundamentals`}
                                        instructor={`${category.count} Courses Available`}
                                        thumbnail={category.image}
                                        rating={4.8}
                                        studentsCount={1200 + (index * 150)}
                                        duration={`${Math.floor(Math.random() * 10) + 5}h Total`}
                                        level="Beginner"
                                        category={category.name}
                                        views={`${Math.floor(Math.random() * 200)}K`}
                                        customTo={`/courses?category=${category.name.toLowerCase()}`}
                                    />
                                    {/* Category Label overlay styling can be added if needed, but CourseCard handles most of it */}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Popular Topics */}
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
        </div>
    );
};

export default Categories;
