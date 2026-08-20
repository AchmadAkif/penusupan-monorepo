'use client';

import { useEffect } from 'react';
import { trackArticleView } from '@/utils/viewTracking.utils';

interface ViewTrackerProps {
  articleId: string;
}

export function ViewTracker({ articleId }: ViewTrackerProps) {
  useEffect(() => {
    if (articleId) {
      trackArticleView(articleId);
    }
  }, [articleId]);

  return null;
}
