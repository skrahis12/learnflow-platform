import axios from "axios";

async function testPost() {
    try {
        const response = await axios.post("http://localhost:5000/testimonials", {
            name: "Test User",
            role: "Tester",
            content: "This is a test testimonial.",
            rating: 5
        });
        console.log("Success:", response.data);
    } catch (error) {
        console.error("Error Status:", error.response?.status);
        console.error("Error Data:", error.response?.data);
        console.error("Error Message:", error.message);
    }
}

testPost();
