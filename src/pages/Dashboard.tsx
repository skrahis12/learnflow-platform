import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  PlayCircle,
  Calendar,
  Bell,
  Settings,
  ChevronRight,
  Star,
} from "lucide-react";

const enrolledCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    progress: 65,
    lastLesson: "CSS Flexbox Deep Dive",
    totalLessons: 156,
    completedLessons: 101,
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    instructor: "Michael Chen",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
    progress: 32,
    lastLesson: "User Research Methods",
    totalLessons: 89,
    completedLessons: 28,
  },
  {
    id: "3",
    title: "Machine Learning A-Z",
    instructor: "Dr. Emily Watson",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
    progress: 12,
    lastLesson: "Introduction to Neural Networks",
    totalLessons: 145,
    completedLessons: 17,
  },
];

const recentActivity = [
  { type: "lesson", title: "Completed: CSS Flexbox Deep Dive", time: "2 hours ago" },
  { type: "quiz", title: "Scored 95% on HTML Quiz", time: "5 hours ago" },
  { type: "certificate", title: "Earned: JavaScript Basics Certificate", time: "1 day ago" },
  { type: "lesson", title: "Started: React Fundamentals", time: "2 days ago" },
];

const achievements = [
  { name: "Fast Learner", description: "Completed 10 lessons in one day", icon: "🚀" },
  { name: "Quiz Master", description: "Scored 100% on 5 quizzes", icon: "🎯" },
  { name: "Dedicated", description: "7-day learning streak", icon: "🔥" },
];

const Dashboard = () => {
  const user = { name: "Alex", avatar: "" };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Continue where you left off and achieve your goals.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">3</p>
                    <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">146</p>
                    <p className="text-sm text-muted-foreground">Lessons Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">42h</p>
                    <p className="text-sm text-muted-foreground">Learning Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">5</p>
                    <p className="text-sm text-muted-foreground">Certificates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Continue Learning
                  </h2>
                  <Link to="/my-courses">
                    <Button variant="ghost" size="sm">
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <Link key={course.id} to={`/courses/${course.id}/learn`}>
                      <Card className="hover:shadow-lg hover:border-accent/30 transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-24 h-24 md:w-32 md:h-20 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground truncate">
                                {course.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                {course.instructor}
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    {course.completedLessons}/{course.totalLessons} lessons
                                  </span>
                                  <span className="font-medium text-accent">
                                    {course.progress}%
                                  </span>
                                </div>
                                <Progress value={course.progress} className="h-2" />
                              </div>
                            </div>
                            <Button
                              variant="accent"
                              size="icon"
                              className="hidden md:flex self-center"
                            >
                              <PlayCircle className="w-5 h-5" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  Recent Achievements
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <Card key={achievement.name}>
                      <CardContent className="pt-6 text-center">
                        <div className="text-4xl mb-3">{achievement.icon}</div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Learning Streak */}
              <Card className="gradient-accent border-0">
                <CardContent className="pt-6 text-accent-foreground">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-foreground/20 flex items-center justify-center">
                      <span className="text-2xl">🔥</span>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">7</p>
                      <p className="text-sm opacity-80">Day Streak</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-80">
                    Keep learning to maintain your streak!
                  </p>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-display">
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.type === "lesson"
                            ? "bg-accent/10 text-accent"
                            : activity.type === "quiz"
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {activity.type === "lesson" ? (
                          <PlayCircle className="w-4 h-4" />
                        ) : activity.type === "quiz" ? (
                          <Star className="w-4 h-4" />
                        ) : (
                          <Award className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-foreground text-sm">
                        Live Q&A Session
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tomorrow, 3:00 PM
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-foreground text-sm">
                        Assignment Due
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Friday, 11:59 PM
                      </p>
                    </div>
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

export default Dashboard;
