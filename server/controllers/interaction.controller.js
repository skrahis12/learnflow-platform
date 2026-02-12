import prisma from "../db.js";

// Toggle Like on a Course
export const toggleLike = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        // Check if already liked
        const existingLike = await prisma.courseLike.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });

        if (existingLike) {
            // Unlike
            await prisma.courseLike.delete({
                where: { id: existingLike.id },
            });
            return res.json({ liked: false, message: "Unliked course" });
        } else {
            // Like
            await prisma.courseLike.create({
                data: {
                    userId,
                    courseId,
                },
            });
            return res.json({ liked: true, message: "Liked course" });
        }
    } catch (error) {
        console.error("TOGGLE LIKE ERROR:", error);
        res.status(500).json({ message: "Failed to toggle like" });
    }
};

// Toggle Subscribe to Instructor
export const toggleSubscribe = async (req, res) => {
    try {
        const followerId = req.user.id;
        const { instructorId } = req.body;

        if (!instructorId) {
            return res.status(400).json({ message: "Instructor ID is required" });
        }

        if (followerId === instructorId) {
            return res.status(400).json({ message: "You cannot subscribe to yourself" });
        }

        // Check if already following
        const existingFollow = await prisma.instructorFollow.findUnique({
            where: {
                followerId_instructorId: {
                    followerId,
                    instructorId,
                },
            },
        });

        if (existingFollow) {
            // Unsubscribe
            await prisma.instructorFollow.delete({
                where: { id: existingFollow.id },
            });
            return res.json({ subscribed: false, message: "Unsubscribed" });
        } else {
            // Subscribe
            await prisma.instructorFollow.create({
                data: {
                    followerId,
                    instructorId,
                },
            });
            return res.json({ subscribed: true, message: "Subscribed" });
        }
    } catch (error) {
        console.error("TOGGLE SUBSCRIBE ERROR:", error);
        res.status(500).json({ message: "Failed to toggle subscription" });
    }
};

// Get User Interactions (Likes & Follows)
export const getMyInteractions = async (req, res) => {
    try {
        const userId = req.user.id;

        const likedCourses = await prisma.courseLike.findMany({
            where: { userId },
            select: { courseId: true }
        });

        const following = await prisma.instructorFollow.findMany({
            where: { followerId: userId },
            select: { instructorId: true }
        });

        res.json({
            likedCourseIds: likedCourses.map(l => l.courseId),
            followingInstructorIds: following.map(f => f.instructorId)
        });
    } catch (error) {
        console.error("GET INTERACTIONS ERROR:", error);
        res.status(500).json({ message: "Failed to create interactions" });
    }
}
