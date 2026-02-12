import prisma from "../db.js";
import bcrypt from "bcryptjs";

export const becomeInstructor = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: "instructor" },
    });

    res.json({
      message: "You are now an instructor",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Unable to become instructor" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("UPDATE PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { twoFactorEnabled } = req.body;
    const userId = req.user.id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled },
    });

    res.json({
      message: "Settings updated",
      twoFactorEnabled: updatedUser.twoFactorEnabled,
    });
  } catch (err) {
    console.error("UPDATE SETTINGS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPublicStats = async (req, res) => {
  try {
    const studentCount = await prisma.user.count({
      where: { role: "student" }
    });

    const courseCount = await prisma.course.count({
      where: { hidden: false }
    });

    res.json({ studentCount, courseCount });
  } catch (err) {
    console.error("STATS ERROR:", err);
    res.status(500).json({ message: "Unable to fetch stats" });
  }
};
