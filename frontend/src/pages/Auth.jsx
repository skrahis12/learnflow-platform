import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Login States
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    // Signup States
    const [signupFormData, setSignupFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });
    const [showSignupPassword, setShowSignupPassword] = useState(false);

    // Initialize state based on route or prop
    useEffect(() => {
        if (location.state?.mode === "signup") {
            setIsLogin(false);
        }
    }, [location.state]);

    // --- Handlers ---

    const handleGoogleLogin = (email, name, avatarUrl) => {
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        let user = existingUsers.find(u => u.email === email);

        if (!user) {
            user = { email, password: "google-login-dummy-password", name, avatar: avatarUrl };
            existingUsers.push(user);
            localStorage.setItem("users", JSON.stringify(existingUsers));
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        toast({
            title: "Logged in with Google",
            description: `Welcome back, ${name}!`,
        });
        navigate("/dashboard");
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const user = existingUsers.find(u => u.email === loginEmail);

        if (user) {
            if (user.password === loginPassword) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                toast({ title: "Welcome back!", description: "You have successfully logged in." });
                navigate("/dashboard");
            } else {
                toast({ variant: "destructive", title: "Invalid credentials", description: "Incorrect password." });
            }
        } else {
            // Implicit Signup for Login flow
            const newUser = { email: loginEmail, password: loginPassword, name: loginEmail.split("@")[0] };
            existingUsers.push(newUser);
            localStorage.setItem("users", JSON.stringify(existingUsers));
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            toast({ title: "Account Created", description: `New account created for ${loginEmail}!` });
            navigate("/dashboard");
        }
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

        if (existingUsers.find(u => u.email === signupFormData.email)) {
            toast({ variant: "destructive", title: "Account exists", description: "Please login instead." });
            setIsLogin(true);
            return;
        }

        const newUser = { ...signupFormData };
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        toast({ title: "Account Created", description: "Welcome to LearnFlow!" });
        navigate("/dashboard");
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 font-sans overflow-hidden">
            <div className={`relative bg-background rounded-[2rem] shadow-2xl w-full max-w-[1000px] min-h-[600px] overflow-hidden flex flex-col md:flex-row transition-all duration-700`}>

                {/* Sign In Form Container */}
                <div className={`absolute top-0 left-0 h-full w-full md:w-1/2 transition-all duration-700 ease-in-out z-20 ${!isLogin ? 'md:translate-x-full opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto' : 'opacity-100 z-20'}`}>
                    <form onSubmit={handleLoginSubmit} className="h-full flex flex-col items-center justify-center p-8 md:p-12 text-center bg-background">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <img src="/logo.png" alt="LearnFlow Icon" className="w-full h-full object-contain" />
                            </div>
                            <div className="h-8 flex items-center">
                                <img src="/brand-text.png" alt="LearnFlow" className="h-[70%] object-contain dark:brightness-200 brightness-0" />
                            </div>
                        </div>
                        <h1 className="font-display text-3xl font-bold mb-4">Sign in</h1>

                        <div className="w-full space-y-4 text-left">
                            <div className="space-y-2">
                                <Label htmlFor="login-email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input id="login-email" type="email" placeholder="Email" className="pl-9" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="login-password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input id="login-password" type={showLoginPassword ? "text" : "password"} placeholder="Password" className="pl-9" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                                    <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><ShowIcon show={showLoginPassword} /></button>
                                </div>
                            </div>
                            <Link to="/forgot-password" className="text-xs text-accent hover:underline block text-right">Forgot password?</Link>
                            <Button type="submit" variant="accent" className="w-full">Sign In</Button>
                        </div>

                        {/* Social Login */}
                        <div className="mt-6 w-full">
                            <div className="relative flex justify-center text-xs uppercase mb-4 text-muted-foreground"><span className="bg-background px-2">Or continue with</span></div>
                            <div className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg> Google
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Sign in with Google</DialogTitle>
                                            <DialogDescription>Choose an account to continue</DialogDescription>
                                        </DialogHeader>
                                        <div className="flex flex-col gap-2 py-4">
                                            <GoogleAccountOption name="Demo User" email="demo.user@gmail.com" avatar="https://github.com/shadcn.png" onClick={() => handleGoogleLogin("demo.user@gmail.com", "Demo User", "https://github.com/shadcn.png")} />
                                            <GoogleAccountOption name="Alex Developer" email="alex.dev@gmail.com" avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" onClick={() => handleGoogleLogin("alex.dev@gmail.com", "Alex Developer", "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex")} />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <p className="mt-6 text-sm md:hidden">Don't have an account? <span onClick={toggleMode} className="text-accent font-bold cursor-pointer">Sign Up</span></p>
                    </form>
                </div>

                {/* Sign Up Form Container */}
                <div className={`absolute top-0 left-0 h-full w-full md:w-1/2 transition-all duration-700 ease-in-out z-10 ${!isLogin ? 'md:translate-x-full opacity-100 z-30' : 'opacity-0 z-10 pointer-events-none'}`}>
                    <form onSubmit={handleSignupSubmit} className="h-full flex flex-col items-center justify-center p-8 md:p-12 text-center bg-background">
                        <h1 className="font-display text-3xl font-bold mb-4">Create Account</h1>
                        <div className="w-full space-y-3 text-left">
                            <div className="space-y-1">
                                <Label>Name</Label>
                                <Input placeholder="Full Name" value={signupFormData.name} onChange={e => setSignupFormData({ ...signupFormData, name: e.target.value })} required />
                            </div>
                            <div className="space-y-1">
                                <Label>Email</Label>
                                <Input type="email" placeholder="Email" value={signupFormData.email} onChange={e => setSignupFormData({ ...signupFormData, email: e.target.value })} required />
                            </div>
                            <div className="space-y-1">
                                <Label>Password</Label>
                                <div className="relative">
                                    <Input type={showSignupPassword ? "text" : "password"} placeholder="Password" value={signupFormData.password} onChange={e => setSignupFormData({ ...signupFormData, password: e.target.value })} required />
                                    <button type="button" onClick={() => setShowSignupPassword(!showSignupPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><ShowIcon show={showSignupPassword} /></button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>I want to</Label>
                                <RadioGroup value={signupFormData.role} onValueChange={(v) => setSignupFormData({ ...signupFormData, role: v })} className="grid grid-cols-2 gap-2">
                                    <Label htmlFor="r-student" className={`flex flex-col items-center justify-center p-2 rounded border cursor-pointer ${signupFormData.role === "student" ? "border-accent bg-accent/5" : ""}`}>
                                        <RadioGroupItem value="student" id="r-student" className="sr-only" />
                                        <span className="text-sm font-medium">Learn</span>
                                    </Label>
                                    <Label htmlFor="r-instructor" className={`flex flex-col items-center justify-center p-2 rounded border cursor-pointer ${signupFormData.role === "instructor" ? "border-accent bg-accent/5" : ""}`}>
                                        <RadioGroupItem value="instructor" id="r-instructor" className="sr-only" />
                                        <span className="text-sm font-medium">Teach</span>
                                    </Label>
                                </RadioGroup>
                            </div>
                            <Button type="submit" variant="accent" className="w-full">Sign Up</Button>
                        </div>
                        {/* Mobile Toggle */}
                        <p className="mt-6 text-sm md:hidden">Already have an account? <span onClick={toggleMode} className="text-accent font-bold cursor-pointer">Sign In</span></p>
                    </form>
                </div>

                {/* Overlay Container (Desktop only) */}
                <div className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-40 ${isLogin ? '' : '-translate-x-full'}`}>
                    <div className={`gradient-hero relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${isLogin ? 'translate-x-0' : 'translate-x-1/2'}`}>

                        {/* Overlay Left (Visible when isLogin is false -> showing Sign Up form) */}
                        <div className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 px-12 text-center text-white transform transition-transform duration-700 ease-in-out ${isLogin ? '-translate-x-[20%]' : 'translate-x-0'}`}>
                            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                            <p className="mb-8 text-lg">To keep connected with us please login with your personal info</p>
                            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/20 hover:text-white w-32" onClick={toggleMode}>Sign In</Button>
                        </div>

                        {/* Overlay Right (Visible when isLogin is true -> showing Sign In form) */}
                        <div className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 px-12 text-center text-white transform transition-transform duration-700 ease-in-out ${isLogin ? 'translate-x-0' : 'translate-x-[20%]'}`}>
                            <h1 className="text-4xl font-bold mb-4">Hello, Friend!</h1>
                            <p className="mb-8 text-lg">Enter your personal details and start your journey with us</p>
                            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/20 hover:text-white w-32" onClick={toggleMode}>Sign Up</Button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

const ShowIcon = ({ show }) => (show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />);

const GoogleAccountOption = ({ name, email, avatar, onClick }) => (
    <div className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors border border-transparent hover:border-border" onClick={onClick}>
        <Avatar><AvatarImage src={avatar} /><AvatarFallback>{name[0]}</AvatarFallback></Avatar>
        <div className="flex flex-col"><span className="font-medium">{name}</span><span className="text-sm text-muted-foreground">{email}</span></div>
    </div>
);

export default Auth;
