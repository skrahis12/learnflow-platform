// Mock Authentication Service (Fallback)
// Used when the real backend is unreachable (e.g., on GitHub Pages without a live server)

export const mockLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
            const user = existingUsers.find(u => u.email === email);

            if (user && user.password === password) {
                // Return a fake token and user data
                resolve({
                    data: {
                        token: "mock-jwt-token-12345",
                        user: user
                    }
                });
            } else {
                reject({ response: { data: { message: "Invalid credentials (Mock)" } } });
            }
        }, 500); // Simulate network delay
    });
};

export const mockSignup = async (formData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

            if (existingUsers.find(u => u.email === formData.email)) {
                reject({ response: { data: { message: "User already exists (Mock)" } } });
                return;
            }

            const newUser = { ...formData };
            existingUsers.push(newUser);
            localStorage.setItem("users", JSON.stringify(existingUsers));

            resolve({
                data: {
                    token: "mock-jwt-token-12345",
                    user: newUser
                }
            });
        }, 500);
    });
};
