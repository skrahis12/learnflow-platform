import { useState, useEffect } from "react";
import { X, Loader, Star, Quote, Pencil, Trash2 } from "lucide-react";
import api from "../../services/api";
import { toast } from "sonner";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      setUser(userData);
    } catch (e) {
      console.error("Error parsing user", e);
    }
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get("/testimonials");
      setTestimonials(response.data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (formData.id) {
        // Edit Mode
        await api.put(`/testimonials/${formData.id}`, formData);
        toast.success("Story updated successfully!");
      } else {
        // Create Mode
        await api.post("/testimonials", formData);
        toast.success("Thank you for sharing your story!");
      }
      setIsModalOpen(false);
      setFormData({ name: "", role: "", content: "", rating: 5 });
      fetchTestimonials();
    } catch (error) {
      console.error("Submit Error:", error);
      let errorMessage = "Failed to submit story. Please try again.";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({
      id: testimonial.id,
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: testimonial.rating,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      await api.delete(`/testimonials/${id}`);
      toast.success("Story deleted.");
      fetchTestimonials();
    } catch (error) {
      toast.error("Failed to delete story.");
    }
  };

  return (
    <section className="py-20 lg:py-28 gradient-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,127,80,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Success Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
            What Our Students Say
          </h2>
          <p className="text-white/70 mt-3 max-w-xl mx-auto mb-8">
            Join thousands of satisfied learners who've transformed their careers
          </p>
          <button
            onClick={() => {
              setFormData({ name: "", role: "", content: "", rating: 5 });
              setIsModalOpen(true);
            }}
            className="px-6 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors"
          >
            Share Your Story
          </button>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id || index}
                className="group bg-card/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-accent/30 transition-all duration-300 animate-fade-up relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Edit/Delete Actions for Owner */}
                {user && testimonial.userId === user.id && (
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-1.5 bg-background/50 hover:bg-accent hover:text-white rounded-full transition-colors text-white/70"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-1.5 bg-background/50 hover:bg-destructive hover:text-white rounded-full transition-colors text-white/70"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <Quote className="w-10 h-10 text-accent/40 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                  ))}
                </div>

                <p className="text-white/90 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
                  />
                  <div>
                    <h4 className="font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-white/60">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background border border-border rounded-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-4">
              {formData.id ? "Edit Your Story" : "Share Your Experience"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border bg-background"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role / Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border bg-background"
                  placeholder="e.g. Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`p-1 rounded-full transition-colors ${formData.rating >= star ? "text-warning" : "text-muted-foreground"
                        }`}
                    >
                      <Star className={`w-6 h-6 ${formData.rating >= star ? "fill-warning" : ""}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Your Story</label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border bg-background"
                  rows={4}
                  placeholder="Tell us about your learning journey..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {submitting ? "Submitting..." : (formData.id ? "Update Story" : "Submit Story")}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
export default Testimonials;
