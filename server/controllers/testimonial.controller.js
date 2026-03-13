import prisma from "../db.js";

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { visible: true },
            orderBy: { createdAt: "desc" },
        });

        if (testimonials.length > 0) {
            return res.status(200).json(testimonials);
        }

        // Fallback/Default Testimonials if DB is empty
        const defaultTestimonials = [
            {
                id: "default-1",
                name: "Sarah Chen",
                role: "Full Stack Developer",
                content: "The structured learning path helped me transition from a non-tech background to a Senior Developer role at a major tech company. The project-based approach is exactly what I needed.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
                id: "default-2",
                name: "Michael Ross",
                role: "Software Engineer",
                content: "I've tried many platforms, but this one stands out. The community support and expert-led courses made mastering complex algorithms feel intuitive and manageable.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
                id: "default-3",
                name: "Emily Rodriguez",
                role: "UI/UX Designer",
                content: "Not just for coders! The design courses are top-notch. I built my entire portfolio using the projects from the advanced React course. Highly recommended!",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
            }
        ];

        res.status(200).json(defaultTestimonials);

    } catch (error) {
        console.error("Error fetching testimonials:", error);
        res.status(500).json({ error: "Failed to fetch testimonials" });
    }
};

export const createTestimonial = async (req, res) => {
    try {
        const { name, role, content, rating, avatar } = req.body;
        const userId = req.user.id; // Get user ID from authenticated request

        if (!name || !role || !content || !rating) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newTestimonial = await prisma.testimonial.create({
            data: {
                name,
                role,
                content,
                rating: parseInt(rating),
                avatar: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
                userId, // Link to user
            },
        });

        res.status(201).json(newTestimonial);
    } catch (error) {
        console.error("Error creating testimonial:", error);
        res.status(500).json({ error: "Failed to create testimonial" });
    }
};

export const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, content, rating } = req.body;
        const userId = req.user.id;

        const testimonial = await prisma.testimonial.findUnique({ where: { id } });

        if (!testimonial) {
            return res.status(404).json({ error: "Testimonial not found" });
        }

        // Ownership check
        if (testimonial.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized to edit this testimonial" });
        }

        const updatedTestimonial = await prisma.testimonial.update({
            where: { id },
            data: {
                name,
                role,
                content,
                rating: parseInt(rating),
            },
        });

        res.status(200).json(updatedTestimonial);
    } catch (error) {
        console.error("Error updating testimonial:", error);
        res.status(500).json({ error: "Failed to update testimonial" });
    }
};

export const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const testimonial = await prisma.testimonial.findUnique({ where: { id } });

        if (!testimonial) {
            return res.status(404).json({ error: "Testimonial not found" });
        }

        // Ownership check
        if (testimonial.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized to delete this testimonial" });
        }

        await prisma.testimonial.delete({ where: { id } });

        res.status(200).json({ message: "Testimonial deleted successfully" });
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        res.status(500).json({ error: "Failed to delete testimonial" });
    }
};
