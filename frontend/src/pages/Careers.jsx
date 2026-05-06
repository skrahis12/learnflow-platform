import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase } from "lucide-react";

const Careers = () => {
    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <div className="py-20">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Briefcase className="w-10 h-10 text-accent" />
                    </div>
                    <h1 className="text-4xl font-bold font-display text-foreground mb-4">Join Our Team</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        We're always looking for passionate individuals to help us revolutionize education.
                    </p>
                    <div className="bg-card p-8 rounded-xl border border-border inline-block">
                        <p className="text-foreground font-medium">No open positions at the moment.</p>
                        <p className="text-muted-foreground text-sm mt-2">Check back soon!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Careers;
