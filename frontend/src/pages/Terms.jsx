import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-4xl font-bold font-display text-foreground mb-6">Terms of Service</h1>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p>Last updated: October 27, 2026</p>
                    <p>Please read these Terms of Service carefully before using the LearnFlow website.</p>

                    <h3>Agreement to Terms</h3>
                    <p>By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>

                    <h3>Accounts</h3>
                    <p>When you create an account with us, you must provide accurate and complete information. Failure to do so constitutes a breach of the Terms.</p>

                    <h3>Intellectual Property</h3>
                    <p>The service and its original content, features, and functionality are and will remain the exclusive property of LearnFlow and its licensors.</p>

                    <h3>Termination</h3>
                    <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

                    <h3>Changes</h3>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p>

                    <h3>Contact Us</h3>
                    <p>If you have any questions about these Terms, please contact us at legal@learnflow.com.</p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
