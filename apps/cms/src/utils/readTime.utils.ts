/**
 * Read Time Calculation Utility
 * 
 * Calculates estimated reading time based on word count and image count.
 * Uses the standard 200 words per minute (WPM) for non-fiction content.
 * Images add additional time based on Medium's algorithm.
 */

const WORDS_PER_MINUTE = 200;

/**
 * Calculate additional time for images (in seconds)
 * Based on Medium's algorithm: 12 seconds for first image, decreasing by 1 second
 * for each subsequent image until the 10th, then 3 seconds for each additional.
 */
const calculateImageTime = (imageCount: number): number => {
    if (imageCount === 0) return 0;
    
    let totalSeconds = 0;
    for (let i = 0; i < imageCount; i++) {
        if (i < 10) {
            totalSeconds += Math.max(3, 12 - i);
        } else {
            totalSeconds += 3;
        }
    }
    return totalSeconds;
};

/**
 * Strip HTML tags from content
 */
const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
};

/**
 * Count words in a text string
 */
const countWords = (text: string): number => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
};

/**
 * Count images in HTML content
 */
const countImages = (html: string): number => {
    const matches = html.match(/<img/gi);
    return matches ? matches.length : 0;
};

/**
 * Calculate estimated reading time in minutes
 * @param htmlContent - The HTML content of the article
 * @returns Number of minutes to read the article (minimum 1)
 */
export const calculateReadTime = (htmlContent: string): number => {
    if (!htmlContent) return 1;
    
    const text = stripHtmlTags(htmlContent);
    const wordCount = countWords(text);
    const imageCount = countImages(htmlContent);
    
    const readingTimeMinutes = wordCount / WORDS_PER_MINUTE;
    const imageTimeMinutes = calculateImageTime(imageCount) / 60;
    
    const totalMinutes = Math.ceil(readingTimeMinutes + imageTimeMinutes);
    return Math.max(1, totalMinutes); // Minimum 1 minute
};
