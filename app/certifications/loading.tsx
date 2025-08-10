export default function CertificationsLoading() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="grid-background"></div>
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="overflow-hidden">
              <div className="h-16 sm:h-20 md:h-24 bg-gray-800 rounded animate-pulse w-3/4 mx-auto"></div>
            </div>
            <div className="overflow-hidden">
              <div className="h-6 sm:h-8 md:h-10 bg-gray-800 rounded animate-pulse w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      <main className="pt-8 pb-16 px-4 min-h-screen max-w-7xl mx-auto">
        {/* Title Skeleton */}
        <div className="text-center mb-8">
          <div className="h-10 bg-gray-800 rounded w-1/3 mx-auto animate-pulse"></div>
        </div>
        
        {/* Search and Filter Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto mb-10">
          <div className="h-12 bg-gray-800 rounded flex-1 animate-pulse"></div>
          <div className="h-12 bg-gray-800 rounded w-48 animate-pulse"></div>
        </div>
        
        {/* Results Count Skeleton */}
        <div className="text-center mb-8">
          <div className="h-4 bg-gray-800 rounded w-48 mx-auto animate-pulse"></div>
        </div>
        
        {/* Certifications Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {/* Image Skeleton */}
              <div className="h-48 bg-gray-800 animate-pulse"></div>
              
              {/* Content Skeleton */}
              <div className="p-5 space-y-4">
                {/* Title Skeleton */}
                <div className="h-6 bg-gray-800 rounded animate-pulse"></div>
                
                {/* Description Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse"></div>
                </div>
                
                {/* Info Skeleton */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-800 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-800 rounded w-40 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Author and Date Skeleton */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gray-800 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded w-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded w-24 animate-pulse"></div>
                </div>
                
                {/* Button Skeleton */}
                <div className="h-10 bg-gray-800 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
