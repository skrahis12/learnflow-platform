import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
    FileText, Download, Layout, Code, PenTool, Database,
    Search, BookOpen, ExternalLink, Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";

const resources = [
    {
        id: "1",
        title: "Mastering React 2024",
        type: "E-book",
        category: "Development",
        description: "A comprehensive guide to building modern web applications with React 18, Server Components, and Next.js.",
        icon: Code,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        id: "2",
        title: "Ultimate UI Design Kit",
        type: "Template",
        category: "Design",
        description: "Complete Figma design system for education platforms, including 50+ hand-crafted components.",
        icon: Layout,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        id: "3",
        title: "Python for Data Science",
        type: "Cheat Sheet",
        category: "Data Science",
        description: "One-page reference for NumPy, Pandas, and Scikit-Learn essential functions and syntax.",
        icon: Database,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
    },
    {
        id: "4",
        title: "Freelance Project Planner",
        type: "Tool",
        category: "Business",
        description: "Interactive Notion template to manage your clients, project timelines, and invoicing in one place.",
        icon: FileText,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
    {
        id: "5",
        title: "Portfolio Starter Kit",
        type: "Source Code",
        category: "Development",
        description: "Highly optimized, SEO-friendly Next.js portfolio template with Tailwind CSS and Framer Motion.",
        icon: Code,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        id: "6",
        title: "UX Research Principles",
        type: "Guide",
        category: "Design",
        description: "Downloadable PDF guide covering quantitative and qualitative user research methodologies.",
        icon: PenTool,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
    }
];

const categories = ["All", "Development", "Design", "Data Science", "Business"];

const Resources = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredResources = resources.filter(res => {
        const matchesCategory = activeCategory === "All" || res.category === activeCategory;
        const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            res.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="pt-32 pb-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-muted/30 -z-10" />
                    <div className="container mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 font-medium text-accent animate-fade-up">
                            <BookOpen className="w-4 h-4" />
                            <span>Free Community Perks</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-up">
                            Curated Learning <span className="text-accent">Resources</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up">
                            High-quality assets, guides, and templates designed to help you fast-track your learning journey.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto relative animate-fade-up">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search resources..."
                                className="h-14 pl-12 rounded-2xl border-border bg-card shadow-lg focus:ring-accent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Filters and Grid */}
                <section className="py-12 border-t border-border">
                    <div className="container mx-auto px-4">
                        {/* Category Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                            <div className="p-1 bg-muted rounded-xl flex flex-wrap gap-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat
                                                ? "bg-card text-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Resources Grid */}
                        {filteredResources.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredResources.map((resource, index) => (
                                    <div
                                        key={resource.id}
                                        className="group bg-card rounded-[2rem] border border-border p-8 hover:shadow-xl hover:border-accent/20 transition-all duration-300 animate-fade-up"
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <div className="flex items-start justify-between mb-6">
                                            <div className={`w-14 h-14 rounded-2xl ${resource.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                <resource.icon className={`w-7 h-7 ${resource.color}`} />
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">
                                                {resource.type}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                                            {resource.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                                            {resource.description}
                                        </p>

                                        <div className="flex items-center gap-3">
                                            <Button className="flex-1 rounded-xl bg-accent hover:bg-accent/90">
                                                <Download className="w-4 h-4 mr-2" />
                                                Download Now
                                            </Button>
                                            <Button variant="outline" size="icon" className="rounded-xl">
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                                    <Filter className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">No resources found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                                <Button
                                    variant="link"
                                    className="mt-4 text-accent"
                                    onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Newsletter / Feature */}
                <section className="py-24 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-card border border-border rounded-[3rem] p-12 overflow-hidden relative shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="flex-1 relative z-10 text-center md:text-left">
                                <h2 className="text-3xl font-display font-bold mb-4">Want more resources?</h2>
                                <p className="text-muted-foreground mb-8">
                                    Subscribe to our weekly newsletter and get exclusive design assets and coding
                                    cheatsheets straight to your inbox.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="h-12 rounded-xl border-border bg-background"
                                    />
                                    <Button className="h-12 rounded-xl bg-accent px-8">Subscribe</Button>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 flex justify-center">
                                <div className="w-32 h-32 rounded-3xl bg-accent flex items-center justify-center rotate-12 shadow-glow">
                                    <BookOpen className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Resources;
