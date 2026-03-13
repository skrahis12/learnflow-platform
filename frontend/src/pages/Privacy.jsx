import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-4xl font-bold font-display text-foreground mb-6">Privacy Policy</h1>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p>Last updated: October 27, 2026</p>
                    <p>At LearnFlow, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website.</p>

                    <h3>Information We Collect</h3>
                    <p>We may collect personal information that you provide to us, such as your name, email address, and payment information when you register for an account or purchase a course.</p>

                    <h3>How We Use Your Information</h3>
                    <p>We use the information we collect to operate and maintain our website, improve your experience, process transactions, and communicate with you.</p>

                    <h3>Sharing Your Information</h3>
                    <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy.</p>

                    <h3>Security</h3>
                    <p>We use administrative, technical, and physical security measures to help protect your personal information.</p>

                    <h3>Contact Us</h3>
                    <p>If you have any questions about this Privacy Policy, please contact us at privacy@learnflow.com.</p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
