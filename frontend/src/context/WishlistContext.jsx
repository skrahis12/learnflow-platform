
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem('wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to parse wishlist from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (course) => {
        if (wishlist.some((item) => item.id === course.id)) {
            toast.info("Course is already in your wishlist");
            return;
        }
        setWishlist([...wishlist, course]);
        toast.success("Added to wishlist");
    };

    const removeFromWishlist = (courseId) => {
        setWishlist(wishlist.filter((item) => item.id !== courseId));
        toast.success("Removed from wishlist");
    };

    const isInWishlist = (courseId) => {
        return wishlist.some((item) => item.id === courseId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
