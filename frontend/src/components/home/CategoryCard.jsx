import { Link } from "react-router-dom";

const CategoryCard = ({ category, index }) => {
    return (
        <Link to={`/courses?category=${category.name.toLowerCase()}`} className="animate-fade-up block h-full" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="group relative bg-card rounded-2xl p-6 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden h-full flex flex-col justify-between">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 transition-colors ${category.hoverColor}`}>
                        <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                        {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {category.count} courses
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
