import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import QurioLogo from "@/components/ui/QurioLogo";

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

    const handleFirebaseGoogleLogin = async () => {
        try {
            const { loginWithGoogle } = await import('@/services/authService');
            const { getUserData, addUserData } = await import('@/services/firestoreService');
            
            const user = await loginWithGoogle();
            let data = await getUserData(user.uid);
            
            if (!data) {
                // First time sign in with Google
                data = {
                    name: user.displayName || "Google User",
                    email: user.email,
                    role: "student",
                    avatar: user.photoURL
                };
                await addUserData(user.uid, data);
            }
            
            localStorage.setItem("currentUser", JSON.stringify(data));
            toast({
                title: <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-accent">Welcome Back!</div>,
                description: (
                    <div className="flex items-center gap-3 mt-2">
                        <Avatar className="w-10 h-10 border-2 border-accent shadow-sm">
                            <AvatarImage src={data.avatar} />
                            <AvatarFallback className="bg-accent text-white font-bold">{data.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <span className="font-semibold text-foreground block">{data.name}</span>
                            <span className="text-muted-foreground text-xs">{data.email}</span>
                        </div>
                    </div>
                ),
                className: "bg-background/95 backdrop-blur-md border border-accent/20 shadow-xl p-4",
                duration: 4000,
            });
            navigate("/dashboard");
        } catch (error) {
            console.error("Google Login Failed:", error);
            const msg = error.message || "Google login failed";
            toast({ variant: "destructive", title: "Error", description: msg });
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            // FIREBASE LOGIN
            const { login } = await import('@/services/authService');
            const { getUserData } = await import('@/services/firestoreService');
            
            const user = await login(loginEmail, loginPassword);
            const data = await getUserData(user.uid);
            
            localStorage.setItem("currentUser", JSON.stringify(data || { name: "User", email: loginEmail, role: "student" }));
            toast({ title: "Welcome back!", description: "Successfully logged in." });
            navigate("/dashboard");

        } catch (error) {
            console.error("Firebase Auth Failed:", error);
            const msg = error.message || "Login failed";
            toast({ variant: "destructive", title: "Authentication Error", description: msg });
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            // FIREBASE SIGNUP
            const { signup } = await import('@/services/authService');
            const { addUserData } = await import('@/services/firestoreService');
            
            const user = await signup(signupFormData.email, signupFormData.password, signupFormData.name);
            
            // Save additional user info to Firestore
            const userData = {
                name: signupFormData.name,
                email: signupFormData.email,
                role: signupFormData.role
            };
            await addUserData(user.uid, userData);
            
            localStorage.setItem("currentUser", JSON.stringify(userData));
            toast({ title: "Account Created", description: "Welcome to Qurio!" });
            navigate("/dashboard");

        } catch (error) {
            console.error("Firebase Signup Failed:", error);
            const msg = error.message || "Signup failed";
            toast({ variant: "destructive", title: "Error", description: msg });
        }
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
                        <div className="flex items-center gap-2 mb-6 group">
                            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-105">
                                <QurioLogo className="w-7 h-7" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70">
                                Qurio
                            </span>
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
                                <Button 
                                    variant="outline" 
                                    className="w-full relative overflow-hidden group hover:shadow-md transition-all duration-300 border-border hover:border-blue-500/50 py-6" 
                                    type="button" 
                                    onClick={handleFirebaseGoogleLogin}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                                    <svg className="w-5 h-5 mr-3 relative z-10" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg> 
                                    <span className="font-semibold text-foreground relative z-10 text-base">Continue with Google</span>
                                </Button>
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
                            {/* Role selection has been removed, defaults to "student" */}
                            <Button type="submit" variant="accent" className="w-full">Sign Up</Button>
                        </div>

                        {/* Social Signup */}
                        <div className="mt-6 w-full">
                            <div className="relative flex justify-center text-xs uppercase mb-4 text-muted-foreground"><span className="bg-background px-2">Or continue with</span></div>
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline" 
                                    className="w-full relative overflow-hidden group hover:shadow-md transition-all duration-300 border-border hover:border-blue-500/50 py-6" 
                                    type="button" 
                                    onClick={handleFirebaseGoogleLogin}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                                    <svg className="w-5 h-5 mr-3 relative z-10" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg> 
                                    <span className="font-semibold text-foreground relative z-10 text-base">Continue with Google</span>
                                </Button>
                            </div>
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
