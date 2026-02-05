import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: true,
        port: 8080,
        proxy: {
            '/auth': 'http://localhost:5000',
            '/courses': 'http://localhost:5000',
            '/users': 'http://localhost:5000',
            '/admin': 'http://localhost:5000',
            '/payments': 'http://localhost:5000',
            '/enrollment': 'http://localhost:5000',
            '/plans': 'http://localhost:5000',
            '/ai': 'http://localhost:5000',
            '/health': 'http://localhost:5000',
        }
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    base: "/learnflow-platform/",
});
