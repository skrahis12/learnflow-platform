import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

const WishlistSection = () => {
    const { wishlist } = useWishlist();

    return (
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
    );
};

export default WishlistSection;
