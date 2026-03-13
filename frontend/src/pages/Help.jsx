import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Help = () => {
    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="bg-muted/30 py-16 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold font-display text-foreground mb-6">How can we help?</h1>
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input className="pl-10 bg-background" placeholder="Search for answers..." />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="grid md:grid-cols-2 gap-6">
                    {["Getting Started", "Account & Billing", "Course Content", "Certificates"].map((topic) => (
                        <div key={topic} className="bg-card border border-border p-6 rounded-xl hover:border-accent/50 transition-colors cursor-pointer">
                            <h3 className="text-lg font-semibold mb-2">{topic}</h3>
                            <p className="text-muted-foreground text-sm">Find answers to common questions about {topic.toLowerCase()}.</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Help;
