import { useState, useEffect } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useLearningTime } from "@/context/LearningTimeContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Clock, Award, TrendingUp, PlayCircle, Calendar, Bell, Settings, ChevronRight, Star, Heart, Download, FileText, Code, Keyboard, ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const notifications = [
  { id: 1, title: "New Course Available", message: "Advanced React Patterns just launched!", time: "2m ago", read: false },
  { id: 2, title: "Assignment Due", message: "Complete 'UI Basics' by tomorrow", time: "1h ago", read: false },
  { id: 3, title: "Goal Achieved", message: "You reached your weekly learning goal!", time: "3h ago", read: true },
];
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
  { type: "lesson", title: "Started: React Fundamentals", time: "2 days ago" },
];
const achievements = [
  { name: "Fast Learner", description: "Completed 10 lessons in one day", icon: "🚀" },
  { name: "Quiz Master", description: "Scored 100% on 5 quizzes", icon: "🎯" },
  { name: "Dedicated", description: "7-day learning streak", icon: "🔥" },
];

const wishlistedCourses = [
  {
    id: "4",
    title: "Digital Marketing Strategy",
    instructor: "James Wilson",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    rating: 4.7,
    studentsCount: 6800,
    price: 69.99,
  },
  {
    id: "6",
    title: "Photography Fundamentals",
    instructor: "Lisa Anderson",
    thumbnail: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
    rating: 4.6,
    studentsCount: 5200,
    price: 59.99,
  }
];

const codingTasks = [
  // Easy
  {
    title: "Reverse a String",
    difficulty: "Easy",
    description: "Write a function that reverses a string.",
    example: "Input: 'hello' -> Output: 'olleh'"
  },
  {
    title: "Return Sum",
    difficulty: "Easy",
    description: "Write a function that returns the sum of two numbers.",
    example: "Input: 2, 3 -> Output: 5"
  },
  // Medium
  {
    title: "FizzBuzz",
    difficulty: "Medium",
    description: "Print numbers 1 to n. Multiples of 3: 'Fizz', 5: 'Buzz', both: 'FizzBuzz'.",
    example: "Input: 5 -> Output: [1, 2, 'Fizz', 4, 'Buzz']"
  },
  {
    title: "Bigger number",
    difficulty: "Medium",
    description: "Write a function that returns the bigger number among two numbers.",
    example: "Input: 2, 3 -> Output: 3"
  },
  // Hard
  {
    title: "Two Sum",
    difficulty: "Hard",
    description: "Find two numbers in an array that add up to a target.",
    example: "Input: [2,7,11,15], 9 -> Output: [0,1]"
  },
  {
    title: "Valid Parentheses",
    difficulty: "Hard",
    description: "Determine if the input string has valid parentheses.",
    example: "Input: '()[]{}' -> Output: true"
  }
];

const certificates = [
  {
    id: "cert-001",
    title: "Web Development Bootcamp",
    instructor: "Sarah Johnson",
    date: "Dec 15, 2025",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400"
  },
  {
    id: "cert-002",
    title: "React Fundamentals",
    instructor: "Michael Chen",
    date: "Jan 10, 2026",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400"
  }
];

const Dashboard = () => {
  const [user, setUser] = useState({ name: "Student", role: "student" });
  const { wishlist } = useWishlist();
  const [downloads, setDownloads] = useState([]);
  const [streak, setStreak] = useState(0);
  const [currentTask, setCurrentTask] = useState(null);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null); // easy, medium, hard
  const [userCode, setUserCode] = useState("");


  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "React is a JavaScript library for building user interfaces.",
    "Components let you split the UI into independent pieces.",
    "Learning to code requires practice and patience.",
    "Programming is thinking, not typing."
  ];

  const codeSnippets = [
    "const sum = (a, b) => a + b;",
    "function greet(name) { return `Hello, ${name}!`; }",
    "import React, { useState } from 'react';",
    "const [count, setCount] = useState(0);",
    "array.map(item => item * 2).filter(i => i > 10);",
    "useEffect(() => { document.title = `Count: ${count}`; }, [count]);",
    "const styles = { container: { padding: '20px', backgroundColor: '#f5f5f5' } };"
  ];

  const handleOpenTaskDialog = () => {
    setSelectedLevel(null);
    setCurrentTask(null);
    setUserCode("");
    setIsTaskOpen(true);
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    const filteredTasks = codingTasks.filter(t => t.difficulty === level);
    const random = filteredTasks[Math.floor(Math.random() * filteredTasks.length)];
    setCurrentTask(random);
    setUserCode("// Write your solution here...\n");
  };

  const handleSubmitCode = () => {
    // Mock submission
    alert("Solution submitted! (Mock)");
    setIsTaskOpen(false);
  };

  // Typing Practice Logic
  const [isTypingOpen, setIsTypingOpen] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingInput, setTypingInput] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState(null);
  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const [typingMode, setTypingMode] = useState("text"); // 'text' or 'code'

  const startTypingPractice = (mode = "text") => {
    const source = mode === "code" ? codeSnippets : sampleTexts;
    const text = source[Math.floor(Math.random() * source.length)];
    setTypingMode(mode);
    setTypingText(text);
    setTypingInput("");
    setWpm(0);
    setAccuracy(100);
    setStartTime(null);
    setIsTypingFinished(false);
    setIsTypingOpen(true);
  };

  const handleTypingInput = (e) => {
    const val = e.target.value;
    setTypingInput(val);

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (val.length > 0) {
      let correctChars = 0;
      for (let i = 0; i < val.length; i++) {
        if (val[i] === typingText[i]) correctChars++;
      }
      const acc = Math.floor((correctChars / val.length) * 100);
      setAccuracy(acc);

      const timeElapsed = (Date.now() - (startTime || Date.now())) / 60000; // in minutes
      if (timeElapsed > 0) {
        const words = val.length / 5;
        setWpm(Math.floor(words / timeElapsed));
      }
    }

    if (val.length === typingText.length) {
      setIsTypingFinished(true);
    }
  };


  useEffect(() => {
    // User Data Logic
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    }

    // Downloads logic
    const savedDownloads = localStorage.getItem("dashboard_downloads");
    if (savedDownloads) {
      setDownloads(JSON.parse(savedDownloads));
    }

    // Streak LOGIC
    const checkStreak = () => {
      const storedStreak = localStorage.getItem("learning_streak");
      const lastVisit = localStorage.getItem("last_visit_date");
      const today = new Date().toDateString(); // "Wed Jan 28 2026"

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

  // Learning Time Logic (Global)
  const { learningTime, formatLearningTime } = useLearningTime();

  const handleDownload = () => {
    // 1. Create a dummy PDF blob
    const content = "This is a progress report for " + user.name + "\n\nCourses Enrolled: 3\nLessons Completed: 146\nLearning Time: 42h";
    const blob = new Blob([content], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // 2. Trigger download
    const link = document.createElement("a");
    link.href = url;
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `Progress_Report_${timestamp}.pdf`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // 3. Save to downloads list
    const newDownload = {
      id: Date.now(),
      name: filename,
      date: "Just now",
      size: "1.2 MB" // Mock size
    };

    const updatedDownloads = [newDownload, ...downloads];
    setDownloads(updatedDownloads);
    localStorage.setItem("dashboard_downloads", JSON.stringify(updatedDownloads));

    alert(`Downloaded ${filename}`);
  };
  const handleDownloadCertificate = (cert) => {
    alert(`Downloading certificate for: ${cert.title}`);
  };

  return (<div className="w-full bg-muted/30">
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome back, {user.name}! 👋
            </h1>
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20 capitalize">
                  {user.role || "Student"}
                </span>
              </div>
              <p className="text-muted-foreground">
                {user.bio || "Continue where you left off and achieve your goals."}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 gap-1 cursor-pointer">
                    <div className="flex w-full justify-between items-start">
                      <span className={`font-medium ${!notification.read ? "text-accent" : ""}`}>{notification.title}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-accent font-medium cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/settings">
              <Button variant="outline" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
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
                  <p className="text-2xl font-bold text-foreground">{formatLearningTime(learningTime)}</p>
                  <p className="text-sm text-muted-foreground">Learning Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b bg-muted/30 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Certificates</span>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[140px] p-2 space-y-2 custom-scrollbar">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group">
                      <div className="w-10 h-10 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                        <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{cert.title}</p>
                        <p className="text-[10px] text-muted-foreground">{cert.date}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDownloadCertificate(cert)}>
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
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
                <Link to="/my-learning">
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {enrolledCourses.map((course) => (<Link key={course.id} to={`/courses/${course.id}/learn`}>
                  <Card className="hover:shadow-lg hover:border-accent/30 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img src={course.thumbnail} alt={course.title} className="w-24 h-24 md:w-32 md:h-20 rounded-xl object-cover" />
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
                        <Button variant="accent" size="icon" className="hidden md:flex self-center">
                          <PlayCircle className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>))}
              </div>
            </div>


            {/* Wishlist */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  <Heart className="w-5 h-5 text-destructive" />
                  Wishlist
                </h2>
              </div>
              {wishlist.length === 0 ? (
                <p className="text-muted-foreground italic">No courses in wishlist yet.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {wishlist.map((course) => (
                    <Link key={course.id} to={`/courses/${course.id}`}>
                      <Card className="hover:shadow-lg hover:border-accent/30 transition-all duration-300 h-full">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img src={course.thumbnail} alt={course.title} className="w-20 h-20 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground truncate mb-1">
                                {course.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {course.instructor.name || course.instructor}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs font-medium text-warning">
                                  <Star className="w-3 h-3 fill-warning" />
                                  {course.rating}
                                </div>
                                <span className="font-bold text-accent">
                                  {course.price === 0 ? "Free" : `$${course.price}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Code With Fun */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                Code With Fun
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Random Coding Task */}
                <Card className="hover:border-accent/40 transition-colors cursor-pointer group">
                  <CardContent className="pt-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        Random Coding Task
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Challenge yourself with a random coding problem to sharpen your skills.
                      </p>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleOpenTaskDialog}>
                        Solve Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Typing Practice */}
                <Card className="hover:border-accent/40 transition-colors cursor-pointer group">
                  <CardContent className="pt-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Keyboard className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                        Typing Practice
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Improve your typing speed and accuracy with our typing tests.
                      </p>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => startTypingPractice("text")}>
                          Text
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => startTypingPractice("code")}>
                          Code
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Typing Practice Dialog */}
              <Dialog open={isTypingOpen} onOpenChange={setIsTypingOpen}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Typing Practice</DialogTitle>
                    <DialogDescription>Type the text below as fast and accurately as possible.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    {!isTypingFinished ? (
                      <>
                        <div className="p-4 bg-muted rounded-lg text-lg font-mono leading-relaxed select-none relative">
                          {typingText.split("").map((char, i) => {
                            let color = "text-muted-foreground";
                            if (i < typingInput.length) {
                              color = typingInput[i] === char ? "text-green-500" : "text-red-500 bg-red-100";
                            }
                            return <span key={i} className={color}>{char}</span>;
                          })}
                        </div>
                        <Textarea
                          value={typingInput}
                          onChange={handleTypingInput}
                          className="font-mono text-lg"
                          placeholder="Start typing..."
                          autoFocus
                        />
                        <div className="flex justify-between text-sm font-medium">
                          <span>WPM: {wpm}</span>
                          <span>Accuracy: {accuracy}%</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="text-4xl">🎉</div>
                        <h3 className="text-2xl font-bold">Great Job!</h3>
                        <div className="flex justify-center gap-8">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-accent">{wpm}</p>
                            <p className="text-xs text-muted-foreground">WPM</p>
                          </div>
                          <div className="text-center">
                            <p className="text-3xl font-bold text-accent">{accuracy}%</p>
                            <p className="text-xs text-muted-foreground">Accuracy</p>
                          </div>
                        </div>
                        <Button onClick={() => startTypingPractice(typingMode)} className="w-full">
                          Try Again
                        </Button>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Task Dialog */}
              <Dialog open={isTaskOpen} onOpenChange={setIsTaskOpen}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    {!selectedLevel ? (
                      <>
                        <DialogTitle>Select Difficulty</DialogTitle>
                        <DialogDescription>Choose a challenge level to start coding.</DialogDescription>
                      </>
                    ) : (
                      <>
                        <DialogTitle className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedLevel(null)}>
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                          {currentTask?.title}
                          <span className={`text-xs px-2 py-0.5 rounded border ${currentTask?.difficulty === "Easy" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                            currentTask?.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                              "bg-red-500/10 text-red-500 border-red-500/20"
                            }`}>
                            {currentTask?.difficulty}
                          </span>
                        </DialogTitle>
                        <DialogDescription className="hidden">Task Details</DialogDescription>
                      </>
                    )}
                  </DialogHeader>

                  {!selectedLevel ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                      <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-green-500 hover:text-green-500 hover:bg-green-500/5 transition-all" onClick={() => handleSelectLevel("Easy")}>
                        <span className="text-2xl">🌱</span>
                        <span className="font-bold">Easy</span>
                      </Button>
                      <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-yellow-500 hover:text-yellow-500 hover:bg-yellow-500/5 transition-all" onClick={() => handleSelectLevel("Medium")}>
                        <span className="text-2xl">⚡</span>
                        <span className="font-bold">Medium</span>
                      </Button>
                      <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-red-500 hover:text-red-500 hover:bg-red-500/5 transition-all" onClick={() => handleSelectLevel("Hard")}>
                        <span className="text-2xl">🔥</span>
                        <span className="font-bold">Hard</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-sm text-foreground/80">
                        <p className="mb-2">{currentTask?.description}</p>
                        <div className="bg-muted p-3 rounded-md font-mono text-xs">
                          {currentTask?.example}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Your Solution:</label>
                        <Textarea
                          value={userCode}
                          onChange={(e) => setUserCode(e.target.value)}
                          className="font-mono h-40 resize-none"
                          placeholder="// Type your code here..."
                        />
                      </div>
                      <Button className="w-full" onClick={handleSubmitCode}>Submit Solution</Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div >

          {/* Sidebar */}
          < div className="space-y-6" >

            {/* Learning Streak */}
            < Card className="gradient-accent border-0" >
              <CardContent className="pt-6 text-accent-foreground">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-foreground/20 flex items-center justify-center">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{streak}</p>
                    <p className="text-sm opacity-80">Day Streak</p>
                  </div>
                </div>
                <p className="text-sm opacity-80">
                  Keep learning to maintain your streak!
                </p>
              </CardContent>
            </Card >

            {/* Recent Activity */}
            < Card >
              <CardHeader>
                <CardTitle className="text-lg font-display">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (<div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.type === "lesson"
                    ? "bg-accent/10 text-accent"
                    : activity.type === "quiz"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"}`}>
                    {activity.type === "lesson" ? (<PlayCircle className="w-4 h-4" />) : activity.type === "quiz" ? (<Star className="w-4 h-4" />) : (<Award className="w-4 h-4" />)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>))}
              </CardContent>
            </Card >

            {/* Recent Downloads */}
            < Card >
              <CardHeader>
                <Link to="/downloads" className="hover:opacity-80 transition-opacity">
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Recent Downloads
                  </CardTitle>
                </Link>
              </CardHeader>
              <CardContent>
                {downloads.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No downloads yet.</p>
                ) : (
                  <div className="space-y-3">
                    {downloads.slice(0, 3).map((file) => (
                      <div key={file.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {file.date} • {file.size}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card >

            {/* Calendar */}
            < Card >
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
            </Card >
          </div >
        </div >
      </div >
    </main >
  </div >);
};
export default Dashboard;
