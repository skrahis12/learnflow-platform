import { Link } from "react-router-dom";
import { ArrowLeft, Video, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Teach = () => {
    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-8">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">Become an Instructor</h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Share your knowledge, inspire students, and earn income by teaching on LearnFlow.
                    </p>
                    <Button size="lg" className="text-lg px-8">Start Teaching Today</Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-card p-8 rounded-xl border border-border text-center">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Video className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Create Content</h3>
                        <p className="text-muted-foreground">Film your course with your own equipment, on your own time.</p>
                    </div>
                    <div className="bg-card p-8 rounded-xl border border-border text-center">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Inspire Learners</h3>
                        <p className="text-muted-foreground">Help students learn new skills and advance their careers.</p>
                    </div>
                    <div className="bg-card p-8 rounded-xl border border-border text-center">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <DollarSign className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Get Rewarded</h3>
                        <p className="text-muted-foreground">Earn money every time a student purchases your course.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teach;
