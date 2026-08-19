/**
 * Article View Tracking Utility
 * 
 * This file is meant to be copied to the landing site (karangsuci-landing)
 * to track unique article views.
 * 
 * Usage:
 * 1. Copy this file to your landing site's utils folder
 * 2. Import and call trackArticleView(articleId) on article detail pages
 * 3. Run the Supabase trigger SQL (see below) to auto-update view_count
 */

import { createClient } from './supabase/client';

const supabase = createClient();

/**
 * Generate a unique visitor ID based on browser fingerprint
 * Uses localStorage to persist across sessions
 */
const getVisitorId = (): string => {
    if (typeof window === 'undefined') return '';
    
    const STORAGE_KEY = 'article_visitor_id';
    let visitorId = localStorage.getItem(STORAGE_KEY);
    
    if (!visitorId) {
        // Generate a simple fingerprint-like ID
        const fingerprint = [
            navigator.userAgent,
            navigator.language,
            screen.width,
            screen.height,
            new Date().getTimezoneOffset(),
            Math.random().toString(36).substring(2, 15),
        ].join('|');
        
        visitorId = btoa(fingerprint).substring(0, 32);
        localStorage.setItem(STORAGE_KEY, visitorId);
    }
    
    return visitorId;
};

/**
 * Track a unique view for an article
 * Uses upsert to prevent duplicate views from the same visitor
 * 
 * @param articleId - The ID of the article being viewed
 * @returns true if this was a new view, false if already counted
 */
export const trackArticleView = async (articleId: string): Promise<boolean> => {
    const visitorId = getVisitorId();
    if (!visitorId) return false;
    
    try {
        // Try to insert a new view record
        // The UNIQUE constraint on (article_id, visitor_id) prevents duplicates
        const { error } = await supabase
            .from('article_views')
            .insert({
                article_id: articleId,
                visitor_id: visitorId,
            });
        
        if (error) {
            // If duplicate key error (23505), view was already tracked
            if (error.code === '23505') {
                return false;
            }
            console.error('Error tracking view:', error);
            return false;
        }
        
        return true;
    } catch (err) {
        console.error('Error tracking view:', err);
        return false;
    }
};

/**
 * Example usage in a Next.js article detail page:
 * 
 * ```tsx
 * 'use client';
 * 
 * import { useEffect } from 'react';
 * import { trackArticleView } from '@/utils/viewTracking';
 * 
 * export default function ArticleDetail({ article }) {
 *     useEffect(() => {
 *         if (article?.id) {
 *             trackArticleView(article.id);
 *         }
 *     }, [article?.id]);
 *     
 *     return <div>...</div>;
 * }
 * ```
 */
