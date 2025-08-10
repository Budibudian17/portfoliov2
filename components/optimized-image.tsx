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

  const handleError = () => {
    if (fallback && !hasError) {
      setImgSrc(fallback);
      setHasError(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      priority={priority}
      fill={fill}
      onError={handleError}
    />
  );
}
