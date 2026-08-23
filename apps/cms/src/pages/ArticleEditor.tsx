import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
  InputBase,
  Chip,
} from '@mui/material';
import { ArrowLeft, Settings, Save, Image as ImageIcon, Trash2, UploadCloud } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Article, CreateArticleInput, UpdateArticleInput } from '../types/article';
import type { ArticleCategory } from '../types/category';
import { StorySettingsDrawer } from '../components/articles/StorySettingsDrawer';
import { calculateReadTime } from '../utils/readTime.utils';

// Slug generator helper
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Quill custom toolbar configuration
const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

export const ArticleEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState('');
  const [author, setAuthor] = useState('Pemerintah Desa');
  const [readTime, setReadTime] = useState(3);
  const [isDraft, setIsDraft] = useState(true);

  // Initialization State (prevents Quill from mounting before async data populates)
  const [isInitialized, setIsInitialized] = useState(!isEditing);

  // UI State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Query Categories
  const { data: categories = [] } = useQuery<ArticleCategory[]>({
    queryKey: ['article-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('article_categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data || [];
    },
  });

  // Automatically select 'Umum' or first available category by default (only for new articles)
  useEffect(() => {
    if (!isEditing && !categoryId && categories.length > 0) {
      const umumCategory = categories.find((cat) => cat.name.toLowerCase() === 'umum');
      if (umumCategory) {
        setCategoryId(umumCategory.id);
      } else {
        setCategoryId(categories[0].id);
      }
    }
  }, [categories, categoryId, isEditing]);

  // Query Existing Article if editing
  const { data: existingArticle, isLoading: isLoadingArticle } = useQuery<Article | null>({
    queryKey: ['article', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  // Populate data when editing
  useEffect(() => {
    if (existingArticle) {
      setTitle(existingArticle.title || '');
      setExcerpt(existingArticle.excerpt || '');
      setContent(existingArticle.content || '');
      setCategoryId(existingArticle.category_id || '');
      setCoverImageUrl(existingArticle.cover_image_url || '');
      setCoverPreviewUrl(existingArticle.cover_image_url || '');
      setAuthor(existingArticle.author || 'Pemerintah Desa');
      setReadTime(existingArticle.read_time || calculateReadTime(existingArticle.content || ''));
      setIsDraft(!existingArticle.published_at);
      setIsInitialized(true);
    }
  }, [existingArticle]);

  // Calculate estimated read time dynamically using readTime utility
  useEffect(() => {
    if (isInitialized) {
      setReadTime(calculateReadTime(content));
    }
  }, [content, isInitialized]);

  // Handle Local File Selection (deferred upload upon Save)
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverFile(file);
    const localUrl = URL.createObjectURL(file);
    setCoverPreviewUrl(localUrl);

    // Reset file input so re-selecting same file works
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    setCoverPreviewUrl('');
    setCoverImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Mutation: Save / Update Article (with deferred cover upload)
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!title.trim()) throw new Error('Judul berita wajib diisi.');
      if (!categoryId) throw new Error('Kategori artikel wajib dipilih.');
      if (!content.trim()) throw new Error('Konten artikel tidak boleh kosong.');

      let finalCoverUrl = coverImageUrl;

      // If user selected a new cover file, upload it now to media/articles
      if (coverFile) {
        const fileExt = coverFile.name.split('.').pop() || 'jpg';
        const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const filePath = `articles/${cleanFileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, coverFile, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) throw new Error(`Gagal mengunggah gambar sampul: ${uploadError.message}`);

        const { data: urlData } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        finalCoverUrl = urlData.publicUrl;
      }

      const slug = generateSlug(title);
      const publishedAt = isDraft ? null : new Date().toISOString();

      if (isEditing && id) {
        const payload: Partial<UpdateArticleInput> = {
          title: title.trim(),
          slug,
          excerpt: excerpt.trim() || title.trim().substring(0, 140),
          content,
          category_id: categoryId,
          cover_image_url: finalCoverUrl.trim(),
          author: author.trim() || 'Pemerintah Desa',
          read_time: readTime,
          published_at: publishedAt,
        };

        const { data, error } = await supabase
          .from('articles')
          .update({
            ...payload,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const payload: CreateArticleInput = {
          title: title.trim(),
          slug,
          excerpt: excerpt.trim() || title.trim().substring(0, 140),
          content,
          category_id: categoryId,
          cover_image_url: finalCoverUrl.trim(),
          author: author.trim() || 'Pemerintah Desa',
          read_time: readTime,
          published_at: publishedAt,
        };

        const { data, error } = await supabase
          .from('articles')
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles-list'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      setToast({
        open: true,
        message: isEditing ? 'Artikel berhasil diperbarui!' : 'Artikel berhasil disimpan!',
        severity: 'success',
      });
      setTimeout(() => {
        navigate('/articles');
      }, 800);
    },
    onError: (err: Error) => {
      setToast({
        open: true,
        message: err.message || 'Gagal menyimpan artikel.',
        severity: 'error',
      });
    },
  });

  const handleSave = () => {
    saveMutation.mutate();
  };

  // Wait until both query completes and state is populated before rendering editor
  if (isEditing && (isLoadingArticle || !isInitialized)) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress sx={{ color: '#CA8A04' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', pb: 10 }}>
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleCoverFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Top Header Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2.5,
          mb: 4,
          borderBottom: '1px solid #E7E5E4',
          position: 'sticky',
          top: 0,
          bgcolor: '#FAFAF9',
          zIndex: 10,
        }}
      >
        {/* Back Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Button
            onClick={() => navigate('/articles')}
            startIcon={<ArrowLeft size={18} />}
            sx={{
              color: '#1E1B4B',
              fontWeight: 700,
              fontSize: '0.95rem',
              textTransform: 'none',
              px: 1.5,
              py: 0.8,
              borderRadius: '12px',
              '&:hover': { bgcolor: 'rgba(30, 27, 75, 0.06)' },
            }}
          >
            {isEditing ? 'Edit Article' : 'New Article'}
          </Button>
        </Box>

        {/* Status + Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={isDraft ? 'Draft' : 'Public'}
            size="small"
            sx={{
              bgcolor: isDraft ? '#E7E5E4' : 'rgba(22, 163, 74, 0.12)',
              color: isDraft ? '#57534E' : '#16A34A',
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          />

          <Tooltip title="Story Settings">
            <IconButton
              onClick={() => setIsDrawerOpen(true)}
              sx={{
                color: '#57534E',
                bgcolor: '#FFFFFF',
                border: '1px solid #E7E5E4',
                '&:hover': { bgcolor: '#F5F5F4', color: '#1E1B4B' },
              }}
            >
              <Settings size={18} />
            </IconButton>
          </Tooltip>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saveMutation.isPending}
            startIcon={!saveMutation.isPending && <Save size={17} />}
            sx={{
              bgcolor: '#CA8A04', // Gold
              color: '#1E1B4B', // Navy
              fontWeight: 700,
              fontSize: '0.9rem',
              borderRadius: '12px',
              px: 3,
              py: 1,
              boxShadow: '0 2px 8px rgba(202, 138, 4, 0.25)',
              '&:hover': {
                bgcolor: '#EAB308',
                boxShadow: '0 4px 14px rgba(202, 138, 4, 0.35)',
              },
            }}
          >
            {saveMutation.isPending ? (
              <CircularProgress size={20} sx={{ color: '#1E1B4B' }} />
            ) : (
              'Save'
            )}
          </Button>
        </Box>
      </Box>

      {/* Main Clean Canvas (Medium Style) */}
      <Box
        sx={{
          maxWidth: 820,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        }}
      >
        {/* Cover Image Placeholder / Preview */}
        {coverPreviewUrl ? (
          <Box
            sx={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              maxHeight: 340,
              width: '100%',
              bgcolor: '#F5F5F4',
              border: '1px solid #E7E5E4',
              mb: 1,
            }}
          >
            <Box
              component="img"
              src={coverPreviewUrl}
              alt="Cover preview"
              sx={{
                width: '100%',
                height: 320,
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                display: 'flex',
                gap: 1,
              }}
            >
              <Button
                size="small"
                startIcon={<UploadCloud size={14} />}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.92)',
                  color: '#1E1B4B',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  borderRadius: '10px',
                  backdropFilter: 'blur(4px)',
                  '&:hover': { bgcolor: '#FFFFFF' },
                }}
              >
                Ganti Gambar
              </Button>
              <IconButton
                size="small"
                onClick={handleRemoveCover}
                sx={{
                  bgcolor: 'rgba(239, 68, 68, 0.9)',
                  color: '#FFFFFF',
                  backdropFilter: 'blur(4px)',
                  '&:hover': { bgcolor: '#DC2626' },
                }}
              >
                <Trash2 size={16} />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: '#78716C',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
              p: 1,
              width: 'fit-content',
              borderRadius: '10px',
              transition: 'all 0.2s',
              '&:hover': { color: '#1E1B4B', bgcolor: '#F5F5F4' },
            }}
          >
            <ImageIcon size={18} />
            Add cover image
          </Box>
        )}

        {/* Large Borderless Title */}
        <InputBase
          fullWidth
          multiline
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            fontSize: { xs: '2rem', sm: '2.75rem' },
            fontWeight: 800,
            color: '#1E1B4B',
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            '& textarea': {
              resize: 'none',
            },
          }}
        />

        {/* Subtitle / Excerpt */}
        <InputBase
          fullWidth
          multiline
          placeholder="Write a subtitle or brief description..."
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          sx={{
            fontSize: { xs: '1.05rem', sm: '1.25rem' },
            color: '#78716C',
            lineHeight: 1.4,
            mb: 2,
            '& textarea': {
              resize: 'none',
            },
          }}
        />

        {/* Quill Rich Text Editor */}
        <Box
          sx={{
            '& .quill': {
              bgcolor: 'transparent',
            },
            '& .ql-toolbar.ql-snow': {
              border: 'none',
              borderBottom: '1px solid #E7E5E4',
              px: 0,
              mb: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.5,
            },
            '& .ql-container.ql-snow': {
              border: 'none',
              fontSize: '1.1rem',
              fontFamily: '"Inter", sans-serif',
              lineHeight: 1.8,
              color: '#292524',
            },
            '& .ql-editor': {
              px: 0,
              minHeight: 380,
              fontSize: '1.1rem',
              '&.ql-blank::before': {
                left: 0,
                color: '#A8A29E',
                fontStyle: 'normal',
                fontSize: '1.1rem',
              },
            },
          }}
        >
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={QUILL_MODULES}
            placeholder="Tell your story..."
          />
        </Box>
      </Box>

      {/* Story Settings Drawer */}
      <StorySettingsDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        isDraft={isDraft}
        onDraftChange={setIsDraft}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        categories={categories}
        author={author}
        onAuthorChange={setAuthor}
        readTime={readTime}
      />

      {/* Feedback Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          sx={{ borderRadius: '12px', fontWeight: 600 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
