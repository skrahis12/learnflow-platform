import { useState, useEffect } from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import WishlistSection from "@/components/dashboard/WishlistSection";
import CodeWithFun from "@/components/dashboard/CodeWithFun";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { fetchResources } from "@/services/resourceApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState({ name: "Student", role: "student" });
  const [downloads, setDownloads] = useState([]);
  const [streak, setStreak] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    // User Data Logic
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Failed to parse user data", error);
    }

    // Downloads logic
    try {
      const savedDownloads = localStorage.getItem("dashboard_downloads");
      if (savedDownloads) {
        setDownloads(JSON.parse(savedDownloads));
      }
    } catch (error) {
      console.error("Failed to parse downloads", error);
    }

    // Streak LOGIC
    const checkStreak = () => {
      const storedStreak = localStorage.getItem("learning_streak");
      const lastVisit = localStorage.getItem("last_visit_date");
      const today = new Date().toDateString(); // e.g. "Wed Jan 28 2026"

      if (!lastVisit) {
        // First visit ever
        setStreak(1);
        localStorage.setItem("learning_streak", 1);
        localStorage.setItem("last_visit_date", today);
        return;
      }

      if (lastVisit === today) {
        // Already visited today, just set current streak
        setStreak(storedStreak ? parseInt(storedStreak) : 1);
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastVisit === yesterday.toDateString()) {
          // Visited yesterday, increment streak
          const newStreak = (storedStreak ? parseInt(storedStreak) : 0) + 1;
          setStreak(newStreak);
          localStorage.setItem("learning_streak", newStreak);
        } else {
          // Missed a day or more, reset to 1 (since they are here today)
          setStreak(1);
          localStorage.setItem("learning_streak", 1);
        }
        // Update last visit to today
        localStorage.setItem("last_visit_date", today);
      }
    };

    checkStreak();
  }, []);

  const handleDeleteDownload = (id) => {
    const updatedDownloads = downloads.filter((d) => d.id !== id);
    setDownloads(updatedDownloads);
    localStorage.setItem("dashboard_downloads", JSON.stringify(updatedDownloads));
  };

  const handleViewDownload = async (file) => {
    try {
      setViewLoading(true);
      setSelectedFile(file);

      const resources = await fetchResources();
      const baseName = file.name.split('.')[0].replace(/_/g, ' ');
      const matchedResource = resources.find(r => 
        r.title.toLowerCase() === baseName.toLowerCase() || 
        file.name.includes(r.title.replace(/\s+/g, '_'))
      );

      if (matchedResource) {
        setSelectedFile({ ...file, content: matchedResource.content });
      } else {
        const content = `This is a progress report for ${user.name}\n\nCourses Enrolled: 3\nLessons Completed: 146\nLearning Time: 42h\n\nFile Name: ${file.name}\nDate Captured: ${file.date}`;
        setSelectedFile({ ...file, content: content });
      }
    } catch (error) {
      console.error("Failed to fetch resource details:", error);
    } finally {
      setViewLoading(false);
    }
  };

  return (
    <div className="w-full bg-muted/30 dark:bg-background">
      <main className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4">
          <WelcomeHeader user={user} />

          <StatsGrid />

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ContinueLearning />
              <CodeWithFun />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <DashboardSidebar 
                streak={streak} 
                downloads={downloads} 
                user={user} 
                onDeleteDownload={handleDeleteDownload}
                onViewDownload={handleViewDownload}
              />
              <WishlistSection />
            </div>
          </div>
        </div>
      </main>

      {/* Resource Viewer Modal */}
      <Dialog open={!!selectedFile} onOpenChange={(open) => !open && setSelectedFile(null)}>
        <DialogContent className="max-w-[100vw] w-screen h-screen flex flex-col p-0 gap-0 overflow-hidden rounded-none border-0 active:outline-none focus:outline-none z-[9999]">
          <DialogHeader className="p-4 border-b bg-muted/20 flex flex-row items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedFile(null)}
                className="mr-2 p-2 hover:bg-muted rounded-full transition-colors font-normal text-sm flex items-center gap-1"
              >
                ← Back
              </button>
              {selectedFile?.name}
              <span className="text-xs font-normal text-muted-foreground border px-2 py-0.5 rounded-full bg-background ml-2">
                Preview
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full bg-white relative">
            {viewLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
                <p className="text-muted-foreground">Fetching report...</p>
              </div>
            ) : (
              selectedFile?.content && (
                <iframe
                  title={selectedFile.name}
                  srcDoc={selectedFile.content.includes('<!DOCTYPE html>') ? selectedFile.content : `<pre style="padding: 2rem; font-family: sans-serif; white-space: pre-wrap;">\${selectedFile.content}</pre>`}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                />
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
