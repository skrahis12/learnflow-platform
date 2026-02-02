import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock Auth Logic (Implicit Signup)
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const user = existingUsers.find(u => u.email === email);

    if (user) {
      // User exists, check password (simple mock check)
      if (user.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Invalid credentials",
          description: "The password you entered is incorrect.",
        });
      }
    } else {
      // User doesn't exist, create account (Implicit Signup)
      const newUser = { email, password, name: email.split("@")[0] };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      toast({
        title: "Account Created",
        description: `We've created a new account for ${email} and logged you in!`,
      });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/logo.png" alt="Qurio Icon" className="w-full h-full object-contain" />
            </div>
            <div className="h-8 flex items-center">
              <img src="/brand-text.png" alt="Qurio" className="h-[70%] object-contain dark:brightness-200 brightness-0" />
            </div>
          </Link>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign in to continue your learning journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="Enter your email" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? (<EyeOff className="w-5 h-5" />) : (<Eye className="w-5 h-5" />)}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="accent" size="lg" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Sign in with Google</DialogTitle>
                  <DialogDescription>
                    Choose an account to continue to Qurio
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2 py-4">
                  <div
                    className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors border border-transparent hover:border-border"
                    onClick={() => handleGoogleLogin("demo.user@gmail.com", "Demo User", "https://github.com/shadcn.png")}
                  >
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>DU</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">Demo User</span>
                      <span className="text-sm text-muted-foreground">demo.user@gmail.com</span>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors border border-transparent hover:border-border"
                    onClick={() => handleGoogleLogin("alex.dev@gmail.com", "Alex Developer", "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex")}
                  >
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">Alex Developer</span>
                      <span className="text-sm text-muted-foreground">alex.dev@gmail.com</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors border border-transparent hover:border-border">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Use another account</span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-accent font-medium hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,127,80,0.2),transparent_50%)]" />

        <div className="relative z-10 text-center max-w-lg">
          <h2 className="font-display text-4xl font-bold text-accent-foreground mb-6">
            Continue Your Learning Journey
          </h2>
          <p className="text-accent-foreground/80 text-lg">
            Pick up where you left off and keep building new skills with our world-class courses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
