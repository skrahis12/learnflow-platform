import { useState, useEffect } from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import WishlistSection from "@/components/dashboard/WishlistSection";
import CodeWithFun from "@/components/dashboard/CodeWithFun";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const Dashboard = () => {
  const [user, setUser] = useState({ name: "Student", role: "student" });
  const [downloads, setDownloads] = useState([]);
  const [streak, setStreak] = useState(0);

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

  return (
    <div className="w-full bg-muted/30">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <WelcomeHeader user={user} />

          <StatsGrid />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ContinueLearning />
              <WishlistSection />
              <CodeWithFun />
            </div>

            {/* Sidebar */}
            <div>
              <DashboardSidebar streak={streak} downloads={downloads} user={user} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
