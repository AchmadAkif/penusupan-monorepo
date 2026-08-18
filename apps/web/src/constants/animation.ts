import type { Variants } from 'framer-motion';

// Fade in with upward motion
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20, willChange: 'transform, opacity' },
    visible: {
        opacity: 1,
        y: 0,
        willChange: 'auto',
        transition: { duration: 0.5 },
    },
};

// Fade in with downward motion
export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

// Scale in animation
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9, willChange: 'transform, opacity' },
    visible: {
        opacity: 1,
        scale: 1,
        willChange: 'auto',
        transition: { duration: 0.5 },
    },
};

// Stagger container for child animations
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Slide in from left
export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -50, willChange: 'transform, opacity' },
    visible: {
        opacity: 1,
        x: 0,
        willChange: 'auto',
        transition: { duration: 0.8 },
    },
};

// Slide in from right
export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 50, willChange: 'transform, opacity' },
    visible: {
        opacity: 1,
        x: 0,
        willChange: 'auto',
        transition: { duration: 0.8 },
    },
};

// Spring item animation (for use with stagger container)
export const springItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 50,
            damping: 20,
        },
    },
};

// Navbar initial animation
export const navbarAnimation: Variants = {
    hidden: { y: -100 },
    visible: {
        y: 0,
        transition: { duration: 0.5 },
    },
};

// Mobile menu backdrop
export const backdropAnimation: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

// Mobile sidebar slide
export const sidebarAnimation: Variants = {
    hidden: { x: '100%' },
    visible: {
        x: 0,
        transition: { type: 'spring', damping: 20 },
    },
    exit: { x: '100%' },
};