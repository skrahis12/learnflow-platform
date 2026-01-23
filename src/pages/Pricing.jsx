import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Pricing = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20 container mx-auto px-4">
                <div className="py-12 text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">Pricing</h1>
                    <p className="text-muted-foreground">Choose the plan that suits you best. (Coming Soon)</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Pricing;
