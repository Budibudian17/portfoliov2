import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  fallback?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export default function OptimizedImage({
  src,
  fallback,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (fallback && !hasError) {
      setImgSrc(fallback);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        priority={priority}
        fill={fill}
        onError={handleError}
        onLoad={handleLoad}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMyIvPjwvc3ZnPg=="
      />
    </div>
  );
}
