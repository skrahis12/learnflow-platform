import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications } from "@/data/dashboardData";

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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.map((notification) => (
                            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 gap-1 cursor-pointer">
                                <div className="flex w-full justify-between items-start">
                                    <span className={`font-medium ${!notification.read ? "text-accent" : ""}`}>{notification.title}</span>
                                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {notification.message}
                                </p>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center text-accent font-medium cursor-pointer">
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
