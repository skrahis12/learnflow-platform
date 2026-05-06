import prisma from '../config/db.js';

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { visible: true },
            orderBy: { createdAt: "desc" },
        });

        return res.status(200).json(testimonials);

    } catch (error) {
        console.error("Error fetching testimonials:", error);
        res.status(500).json({ error: "Failed to fetch testimonials" });
    }
};

export const createTestimonial = async (req, res) => {
    try {
        const { name, role, content, rating, avatar } = req.body;
        const userId = req.user ? req.user.id : undefined;

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
                ...(userId && { userId }),
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
