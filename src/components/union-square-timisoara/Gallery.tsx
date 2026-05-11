'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useState, useCallback } from 'react';

interface GalleryProps {
  photos?: Array<{ src: string; alt: string }>;
  mapsLink?: string;
}

export default function Gallery({ photos, mapsLink = 'https://maps.app.goo.gl/8temYQszaYYQ9LJH6' }: GalleryProps) {
  const t = useTranslations('gallery');
  const messages = useMessages() as any;
  
  const defaultPhotos = photos || [
    { src: '/gallery/images (6).jpg', alt: messages?.gallery?.captions?.[0] || '联合广场全景' },
    { src: '/gallery/images (6).jpg', alt: messages?.gallery?.captions?.[1] || '圣三一纪念碑' },
    { src: '/gallery/images (6).jpg', alt: messages?.gallery?.captions?.[2] || '罗马天主教大教堂' },
    { src: '/gallery/images (6).jpg', alt: messages?.gallery?.captions?.[3] || '塞尔维亚东正教大教堂' },
    { src: '/gallery/images (6).jpg', alt: messages?.gallery?.captions?.[4] || '巴洛克宫建筑' },
    { src: '/gallery/images (6).jpg', alt: messages?.gallery?.captions?.[5] || '广场夜景灯光' },
    { src: '/gallery/images (6).jpg', alt: messages?.gallery?.captions?.[6] || '巴洛克建筑立面' },
    { src: '/gallery/images (6).jpg', alt: messages?.gallery?.captions?.[7] || '广场黄昏时分' },
    { src: '/gallery/images (6).jpg', alt: '联合广场' },
    { src: '/gallery/images (6).jpg', alt: '蒂米什瓦拉' },
    { src: '/gallery/images (6).jpg', alt: '巴洛克建筑' },
    { src: '/gallery/images (6).jpg', alt: '广场风光' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? defaultPhotos.length - 1 : prev - 1));
  }, [defaultPhotos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === defaultPhotos.length - 1 ? 0 : prev + 1));
  }, [defaultPhotos.length]);

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <>
      <section id="gallery" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
          <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {defaultPhotos.slice(0, 8).map((photo, i) => (
                <div
                  key={i}
                  className={`gallery-item relative group cursor-pointer ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                  onClick={() => {
                    setCurrentIndex(i);
                    openLightbox();
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ minHeight: i === 0 ? '400px' : '180px' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors rounded-lg flex items-end">
                    <p className="text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {photo.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
              aria-label="Previous photo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
              aria-label="Next photo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="flex justify-center mt-6 gap-4 items-center">
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {t('viewAll')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <img
            src={defaultPhotos[currentIndex].src}
            alt={defaultPhotos[currentIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {defaultPhotos.length}
          </div>
        </div>
      )}
    </>
  );
}
