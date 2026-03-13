import { Link } from "react-router-dom";
import { ArrowLeft, Newspaper } from "lucide-react";

const Blog = () => {
    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-4xl font-bold font-display text-foreground mb-8">Latest Updates</h1>
                <div className="grid gap-8">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
                            <span className="text-sm text-accent font-medium">News</span>
                            <h2 className="text-2xl font-bold mt-2 mb-3">Transforming Online Education</h2>
                            <p className="text-muted-foreground mb-4">
                                Discover how we're making learning more accessible and engaging for students worldwide.
                            </p>
                            <span className="text-sm text-muted-foreground">Oct {20 + item}, 2026 • 5 min read</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
