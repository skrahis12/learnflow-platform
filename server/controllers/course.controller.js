
import prisma from '../db.js';

/* ================= CATEGORIES WITH STATS ================= */
export const getCategoriesWithStats = async (req, res) => {
  try {
    const categories = await prisma.course.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
      where: {
        hidden: false,
        category: {
          not: null
        }
      }
    });

    const stats = categories.map(item => ({
      name: item.category,
      count: item._count.category
    }));

    res.json(stats);
  } catch (err) {
    console.error("GET CATEGORIES STATS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch category stats" });
  }
};


/* ================= CREATE COURSE ================= */
export const createCourse = async (req, res) => {
  try {
    const { title, description, price, videoUrl } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
        videoUrl,
        instructorId: req.user.id,
        hidden: false, // ✅ default visible
      },
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: "Failed to create course" });
  }
};

/* ================= INSTRUCTOR COURSES ================= */
export const getMyCourses = async (req, res) => {
  const courses = await prisma.course.findMany({
    where: { instructorId: req.user.id },
  });

  res.json(courses);
};

/* ================= COURSE DETAILS ================= */
export const getCourseDetails = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  // 🚫 Hidden course → only admin can access
  if (course.hidden && user?.role !== "admin") {
    return res.status(404).json({ message: "Course not found" });
  }

  // 🟣 ADMIN → FULL ACCESS
  if (user?.role === "admin") {
    return res.json({ course, access: "admin" });
  }

  // 🟢 FREE COURSE
  if (course.price === 0) {
    return res.json({ course, access: "free" });
  }

  // 🔐 Paid → login required
  if (!user) {
    return res.status(401).json({ message: "Login required" });
  }

  // 🔒 Check enrollment
  const enrolled = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: id,
      },
    },
  });

  if (!enrolled) {
    return res.status(403).json({
      message: "Enrollment required",
      price: course.price,
    });
  }

  res.json({ course, access: "paid" });
};

/* ================= PUBLIC COURSES ================= */
export const getAllCourses = async (req, res) => {
  try {
    const { search, category, level, sortBy } = req.query;

    const where = { hidden: false };

    if (search) {
      where.OR = [
        { title: { contains: search } }, // Note: Prisma/MySQL case-sensitivity depends on DB collation
        { instructorName: { contains: search } }
      ];
    }

    if (category && category !== "All") {
      where.category = category;
    }

    if (level && level !== "All Levels") {
      where.level = level;
    }

    const take = req.query.limit ? parseInt(req.query.limit) : undefined;

    let orderBy = {};
    if (sortBy === "popular") {
      orderBy = { studentsCount: 'desc' };
    } else if (sortBy === "rating") {
      orderBy = { rating: 'desc' };
    } else {
      orderBy = { createdAt: 'desc' };
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy,
      take,
      select: {
        id: true,
        title: true,
        price: true,
        videoUrl: true,
        thumbnail: true,
        rating: true,
        studentsCount: true,
        views: true,
        likes: true,
        duration: true,
        level: true,
        category: true,
        instructorName: true,
      }
    });

    // Provide a fallback for 'instructor' field if frontend expects a string
    const formattedCourses = courses.map(course => ({
      ...course,
      instructor: course.instructorName // Map instructorName to instructor for frontend compatibility
    }));

    res.json(formattedCourses);
  } catch (err) {
    console.error("GET COURSES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

/* ================= HIDE / UNHIDE COURSE (ADMIN) ================= */
export const toggleCourseVisibility = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updated = await prisma.course.update({
      where: { id },
      data: { hidden: !course.hidden },
    });

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update visibility" });
  }
};

/* ================= DELETE COURSE ================= */
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Instructor can delete only own course
    if (user.role === "instructor" && course.instructorId !== user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // 🔥 Delete enrollments first
    await prisma.enrollment.deleteMany({
      where: { courseId: id },
    });

    // 🔥 Then delete course
    await prisma.course.delete({
      where: { id },
    });

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("DELETE COURSE ERROR:", err);
    res.status(500).json({ message: "Failed to delete course" });
  }
};
