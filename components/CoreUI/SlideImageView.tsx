'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ExhibitionsInstallationViewFullScreeen from './SlideImageViewFullScreeen';
import getAssetUrl from '@/utils/asset-url';
import { DirectusFile } from '../Exhibitions/exhibition.interface';
import SlideImageViewFullScreeen from './SlideImageViewFullScreeen';

interface SlideImageViewProps {
    files: DirectusFile[];
}

export default function SlideImageView({
    files: filesInput,
}: SlideImageViewProps) {
    const [files, setFiles] = useState<DirectusFile[]>([]);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(true);
    const mainImageRef = useRef<HTMLImageElement>(null);
    const thumbnailsContainerRef = useRef<HTMLDivElement>(null);

    // Add initial mount effect
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    useEffect(() => {
        if (files.length === 0) return;

        const interval = setInterval(() => {
            setSelectedIndex(prev => prev + 1 > files.length - 1 ? 0 : prev + 1);
        }, 3000); // Changed to 3 seconds for better slideshow timing

        return () => {
            clearInterval(interval);
        };
    }, [files, selectedIndex]); // Added selectedIndex as dependency


    const handleScroll = () => {
        if (!thumbnailsContainerRef.current) {
            console.warn('Thumbnails container ref is not initialized');
            return;
        }

        const container = thumbnailsContainerRef.current;
        setIsAtStart(container.scrollLeft <= 0);
        setIsAtEnd(container.scrollLeft + container.clientWidth >= container.scrollWidth);
    };

    useEffect(() => {
        if (!isMounted) return;

        const container = thumbnailsContainerRef.current;

        if (container) {
            container.addEventListener('scroll', handleScroll);
            // Initial check
            handleScroll();
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [isMounted]);

    useEffect(() => {
        setFiles(filesInput.map(f => ({ ...f, directus_files_id: getAssetUrl(f.directus_files_id) })));
    }, [filesInput]);

    useEffect(() => {
        if (mainImageRef.current) {
            // Reset the image to initial state
            gsap.set(mainImageRef.current, { opacity: 0 });

            // Animate to final state
            gsap.to(mainImageRef.current, {
                opacity: 1,
                scale: 1,
                duration: 2,
                ease: 'power2.out',
            });
        }
    }, [selectedIndex]);

    if (files.length === 0) {
        return null;
    }
    return (
        <div className="relative" suppressHydrationWarning>
            <div className="w-full aspect-square" suppressHydrationWarning>
                <img
                    onClick={() => {
                        setShowFullScreen(true);
                    }}
                    ref={mainImageRef}
                    key={files[selectedIndex].id}
                    src={files[selectedIndex].directus_files_id}
                    alt={`Installation view ${selectedIndex + 1}`}
                    className="object-contain w-full h-full cursor-pointer"
                    suppressHydrationWarning
                />
            </div>
            <div
                ref={thumbnailsContainerRef}
                className="relative w-full mt-8 overflow-x-auto"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                <div
                    className="flex justify-center gap-4 px-15 flex-nowrap thumbnails-container"
                    style={{ minWidth: '600px' }}
                >
                    {files.map((file, idx) => (
                        <button
                            key={file.id}
                            onClick={() => {
                                setSelectedIndex(idx);
                            }}
                            className={`cursor-pointer flex-shrink-0 w-18 h-18 border-2 rounded transition-all duration-200 ${selectedIndex === idx ? 'border-blue-500' : 'border-transparent'}`}
                            style={{ outline: 'none' }}
                        >
                            <img
                                src={file.directus_files_id}
                                alt={`Thumbnail ${idx + 1}`}
                                className={`w-full h-full object-cover rounded ${selectedIndex === idx ? 'ring-2 ring-blue-500' : ''}`}
                                suppressHydrationWarning
                            />
                        </button>
                    ))}
                </div>
            </div>
            {!isAtStart && (
                <button
                    onClick={() => {
                        if (thumbnailsContainerRef.current) {
                            thumbnailsContainerRef.current.scrollBy({
                                left: -500,
                                behavior: 'smooth',
                            });
                        }
                    }}
                    className="absolute bottom-0 left-0 z-10 px-3 h-18 bg-white/80 hover:bg-white mb-0.5"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
            )}
            {!isAtEnd && (
                <button
                    onClick={() => {
                        if (thumbnailsContainerRef.current) {
                            thumbnailsContainerRef.current.scrollBy({
                                left: 500,
                                behavior: 'smooth',
                            });
                        }
                    }}
                    className="absolute bottom-0 right-0 z-10 h-18 p-2 shadow-md bg-white/80 hover:bg-white mb-0.5"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}
            {showFullScreen && (
                <SlideImageViewFullScreeen
                    onClose={() => setShowFullScreen(false)}
                    files={files}
                    initIndex={selectedIndex}
                />
            )}
        </div>
    );
}
