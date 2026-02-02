
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();

    // Profile State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("student");
    const [bio, setBio] = useState("");

    // Load initial data
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            const names = (currentUser.name || "").split(" ");
            setFirstName(names[0] || "");
            setLastName(names.slice(1).join(" ") || "");
            setEmail(currentUser.email || "");
            setRole(currentUser.role || "student");
            setBio(currentUser.bio || "Passionate learner and developer.");
        }
    }, []);

    const handleSave = () => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) return;

        const fullName = `${firstName} ${lastName}`.trim();
        const updatedUser = {
            ...currentUser,
            name: fullName,
            email,
            bio,
            // Role is usually not editable here for security without backend validation, 
            // keeping it as is or allowing edit if that was part of the plan (plan didn't explicitly restrict it, but usually roles are fixed).
            // Let's assume name/bio/email are the main editables.
        };

        // Update current user session
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        // Update user in the main users list
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.map(u => u.email === currentUser.email ? { ...u, ...updatedUser } : u); // Using email as ID for now
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        toast({
            title: "Profile Updated",
            description: "Your changes have been saved successfully.",
        });

        // Dispatch a custom event to notify other components (like Navbar/Dashboard) to re-render or check local storage
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <div className="w-full bg-muted/30 min-h-screen">
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-3xl font-bold text-foreground mb-6">Settings</h1>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar Navigation */}
                        <nav className="lg:col-span-1 space-y-2">
                            <Button variant="ghost" className="w-full justify-start gap-2 bg-accent/10 text-accent font-medium">
                                <User className="w-4 h-4" />
                                Profile
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                                <Shield className="w-4 h-4" />
                                Account Security
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                                <Bell className="w-4 h-4" />
                                Notifications
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                                <Monitor className="w-4 h-4" />
                                Appearance
                            </Button>
                        </nav>

                        {/* Main Content Area */}
                        <div className="lg:col-span-3 space-y-6">

                            {/* Profile Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>Update your personal details and public profile.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl font-bold capitalize">
                                            {firstName ? firstName[0] : "U"}
                                        </div>
                                        <div>
                                            <p className="font-medium">Profile Picture</p>
                                            <p className="text-sm text-muted-foreground mb-2">Role: <span className="capitalize">{role}</span></p>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled className="bg-muted opacity-70 cursor-not-allowed" />
                                        <p className="text-[10px] text-muted-foreground">Email cannot be changed.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                                    </div>
                                    <Button className="mt-4" onClick={handleSave}>Save Changes</Button>
                                </CardContent>
                            </Card>

                            {/* Notifications Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notifications</CardTitle>
                                    <CardDescription>Manage how you want to be notified.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Course Updates</Label>
                                            <p className="text-sm text-muted-foreground">Receive updates about your enrolled courses.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Security Alerts</Label>
                                            <p className="text-sm text-muted-foreground">Get notified about sign-ins and security checks.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Marketing Emails</Label>
                                            <p className="text-sm text-muted-foreground">Receive emails about new courses and offers.</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Appearance Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Appearance</CardTitle>
                                    <CardDescription>Customize the look and feel of the platform.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Dark Mode</Label>
                                            <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                                        </div>
                                        <Switch
                                            checked={theme === 'dark'}
                                            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
