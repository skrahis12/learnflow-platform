import { Link } from "react-router-dom";
import { ArrowLeft, Users, Target, BookOpen } from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-8">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground">About LearnFlow</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Empowering learners worldwide to master new skills and achieve their career goals through premium education.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                                <Target className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                            <p className="text-muted-foreground">
                                To democratize education by providing high-quality, accessible learning resources to everyone, everywhere.
                            </p>
                        </div>

                        <div className="bg-card p-6 rounded-xl border border-border">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Our Community</h3>
                            <p className="text-muted-foreground">
                                A vibrant community of learners, instructors, and industry experts supporting each other's growth.
                            </p>
                        </div>

                        <div className="bg-card p-6 rounded-xl border border-border">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                                <BookOpen className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Our Content</h3>
                            <p className="text-muted-foreground">
                                Curated courses designed by experts, focusing on practical skills and real-world application.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
