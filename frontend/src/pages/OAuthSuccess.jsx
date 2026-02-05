import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const OAuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            // Decode token to get user info (optional, or just fetch profile)
            // For now, we'll store the token. In a real app, you might want 
            // to fetch the full user profile immediately.

            // Let's decode it safely if it's a JWT to get basic info, 
            // or just store it. Ideally we should hit a /me endpoint.

            // For simplicity in this step, we will assume the backend sends a valid token
            // and we just need to store it. We'll set a dummy user object for now 
            // or fetch it if we had a /me endpoint ready.

            // Simulating "fetching user" from token (decoding payload essentially)
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                const userData = JSON.parse(jsonPayload);
                // Map backend user to frontend expected structure
                const user = {
                    id: userData.id,
                    name: userData.name || "User",
                    email: userData.email,
                    role: userData.role,
                    avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name || "User"}`
                };

                localStorage.setItem("currentUser", JSON.stringify(user));
                localStorage.setItem("token", token);

                toast({
                    title: "Successfully logged in!",
                    description: `Welcome, ${user.name}`,
                });
                navigate("/dashboard");

            } catch (e) {
                console.error("Token parse error", e);
                toast({ title: "Login Failed", description: "Invalid token received", variant: "destructive" });
                navigate("/login");
            }

        } else {
            navigate("/login");
        }
    }, [searchParams, navigate, toast]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );
};

export default OAuthSuccess;
