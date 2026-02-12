import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const WelcomeHeader = ({ user }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                    Welcome back, {user.name}! 👋
                </h1>
                <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20 capitalize">
                            {user.role || "Student"}
                        </span>
                        {user.email && (
                            <span className="text-sm text-muted-foreground">
                                {user.email}
                            </span>
                        )}
                    </div>
                    <p className="text-muted-foreground">
                        {user.bio || "Continue where you left off and achieve your goals."}
                    </p>
                </div>
            </div>

            <div className="flex gap-3">
                <Link to="/settings">
                    <Button variant="outline" size="icon">
                        <Settings className="w-5 h-5" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default WelcomeHeader;
