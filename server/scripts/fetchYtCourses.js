import express from "express"; // just dummy to ensure module works
import prisma from '../config/db.js';
import https from "https";

const CHANNEL_ID = "UCBwmMxybNva6P_5VmxjzwqA";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function fetchXml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', err => reject(err));
    });
}

function categorize(title) {
    const t = title.toLowerCase();
    if (t.includes("web") || t.includes("html") || t.includes("css") || t.includes("react") || t.includes("frontend") || t.includes("backend")) return "Web Development";
    if (t.includes("java") || t.includes("c++") || t.includes("python") || t.includes("programming") || t.includes("dsa") || t.includes("code")) return "Programming";
    if (t.includes("data") || t.includes("sql") || t.includes("machine learning")) return "Data Science";
    if (t.includes("app") || t.includes("android") || t.includes("ios")) return "Mobile Apps";
    if (t.includes("ai") || t.includes("artificial intelligence")) return "Artificial Intelligence";
    // default
    return "Programming";
}

async function addChannelCourses() {
    console.log(`Fetching videos for channel: ${CHANNEL_ID}...`);
    try {
        const xml = await fetchXml(FEED_URL);
        
        // Simple regex parsing for Atom feed
        const entries = [];
        const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
        let match;
        
        while ((match = entryRegex.exec(xml)) !== null) {
            const entryText = match[1];
            
            const titleMatch = entryText.match(/<title>(.*?)<\/title>/);
            const videoIdMatch = entryText.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
            const authorMatch = entryText.match(/<name>(.*?)<\/name>/);
            const viewsMatch = entryText.match(/<media:statistics views="(\d+)"/);
            
            if (titleMatch && videoIdMatch) {
                entries.push({
                    title: titleMatch[1],
                    videoId: videoIdMatch[1],
                    instructor: authorMatch ? authorMatch[1] : "YouTube Creator",
                    views: viewsMatch ? viewsMatch[1] : "0"
                });
            }
        }
        
        console.log(`Found ${entries.length} recent videos/courses.`);

        let adminUser = await prisma.user.findFirst({
            where: { email: "admin@qurio.com" }
        });
        
        if (!adminUser) {
            adminUser = await prisma.user.findFirst();
        }

        let added = 0;
        for (const v of entries) {
            const existingCourse = await prisma.course.findFirst({
                where: { videoUrl: `https://www.youtube.com/embed/${v.videoId}` }
            });

            if (!existingCourse) {
                // Convert views string to something like "1.5M"
                let viewsStr = "1K";
                const vNum = parseInt(v.views);
                if (vNum > 1000000) viewsStr = (vNum / 1000000).toFixed(1) + "M";
                else if (vNum > 1000) viewsStr = (vNum / 1000).toFixed(1) + "K";
                else viewsStr = v.views;
                
                const cat = categorize(v.title);

                await prisma.course.create({
                    data: {
                        title: v.title,
                        description: `Learn ${v.title} direct from ${v.instructor} on our platform!`,
                        price: 0,
                        videoUrl: `https://www.youtube.com/embed/${v.videoId}`,
                        thumbnail: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
                        rating: 4.9,
                        studentsCount: Math.floor(Math.random() * 50000) + 10000,
                        views: viewsStr,
                        likesCount: Math.floor(Math.random() * 100) + "K",
                        duration: "Variable",
                        level: "All Levels",
                        category: cat,
                        instructorName: v.instructor,
                        instructorId: adminUser.id,
                    }
                });
                console.log(`+ Added [${cat}]: ${v.title}`);
                added++;
            } else {
                console.log(`= Skipped (exists): ${v.title}`);
            }
        }

        console.log(`\n✅ Completed! Added ${added} new courses from channel ${CHANNEL_ID}.`);
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

addChannelCourses();
