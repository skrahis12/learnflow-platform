import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, Clock, CheckCircle } from "lucide-react";

// Reuse the enrolledCourses data from Dashboard or define separately
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
        status: "in-progress"
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
        status: "in-progress"
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
        status: "in-progress"
    },
    {
        id: "4",
        title: "Python for Data Science",
        instructor: "John Smith",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
        progress: 100,
        lastLesson: "Final Project Submission",
        totalLessons: 45,
        completedLessons: 45,
        status: "completed"
    }
];

const MyLearning = () => {
    const [activeTab, setActiveTab] = useState("in-progress");

    const filteredCourses = enrolledCourses.filter(course => course.status === activeTab);

    return (
        <div className="w-full min-h-screen bg-muted/30">
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-3xl font-bold text-foreground mb-8">
                        My Learning
                    </h1>

                    <Tabs defaultValue="in-progress" onValueChange={setActiveTab} className="mb-8">
                        <TabsList>
                            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>

                        <TabsContent value="in-progress" className="mt-6">
                            {filteredCourses.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredCourses.map((course) => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState message="You don't have any courses in progress." />
                            )}
                        </TabsContent>

                        <TabsContent value="completed" className="mt-6">
                            {filteredCourses.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredCourses.map((course) => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState message="You haven't completed any courses yet." />
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
};

const CourseCard = ({ course }) => (
    <Link to={`/courses/${course.id}/learn`}>
        <Card className="hover:shadow-lg hover:border-accent/30 transition-all duration-300 h-full flex flex-col">
            <div className="relative aspect-video">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover rounded-t-xl" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-12 h-12 text-white" />
                </div>
            </div>
            <CardContent className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                    {course.instructor}
                </p>

                <div className="mt-auto space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            {Math.round((course.completedLessons / course.totalLessons) * 100)}% Complete
                        </span>
                        {course.status === "completed" && (
                            <CheckCircle className="w-4 h-4 text-success" />
                        )}
                    </div>
                    <Progress value={(course.completedLessons / course.totalLessons) * 100} className="h-2" />
                </div>
            </CardContent>
        </Card>
    </Link>
);

const EmptyState = ({ message }) => (
    <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No Courses Found</h3>
        <p className="text-muted-foreground mb-6">{message}</p>
        <Link to="/courses">
            <Button>Browse Courses</Button>
        </Link>
    </div>
);

export default MyLearning;
