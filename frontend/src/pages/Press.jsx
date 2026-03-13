import { Link } from "react-router-dom";
import { ArrowLeft, Mic2 } from "lucide-react";

const Press = () => {
    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <div className="py-20">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mic2 className="w-10 h-10 text-accent" />
                    </div>
                    <h1 className="text-4xl font-bold font-display text-foreground mb-4">Press & Media</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Latest news, brand assets, and media resources.
                    </p>
                    <div className="mt-8">
                        <a href="mailto:press@learnflow.com" className="text-accent hover:underline font-medium">Contact Press Team</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Press;
