import HeroSection from "@/components/home/HeroSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";


const Index = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <FeaturedCourses />
      <Categories />
      <Features />
      <Testimonials />
    </div>
  );
};

export default Index;
