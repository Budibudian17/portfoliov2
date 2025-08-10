export default function CertificationDetailLoading() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Back Button Skeleton */}
      <div className="container mx-auto p-6 space-y-6">
        <div className="mb-6">
          <div className="h-10 bg-gray-800 rounded w-48 animate-pulse"></div>
        </div>
        
        {/* Main Content Skeleton */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {/* Header Skeleton */}
            <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-b border-gray-800 p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full animate-pulse"></div>
                  <div className="h-6 bg-gray-800 rounded w-24 animate-pulse"></div>
                </div>
                <div className="h-8 bg-gray-800 rounded w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-800 rounded w-48 animate-pulse"></div>
              </div>
            </div>
            
            {/* Content Skeleton */}
            <div className="p-8 space-y-8">
              {/* Issuer Information Skeleton */}
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="w-6 h-6 bg-gray-800 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-20 animate-pulse"></div>
                  <div className="h-5 bg-gray-800 rounded w-48 animate-pulse"></div>
                </div>
              </div>
              
              {/* Dates Skeleton */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 bg-green-900/20 rounded-lg border border-green-700/30">
                  <div className="w-6 h-6 bg-gray-800 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-24 animate-pulse"></div>
                    <div className="h-5 bg-gray-800 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                  <div className="w-6 h-6 bg-gray-800 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-24 animate-pulse"></div>
                    <div className="h-5 bg-gray-800 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Description Skeleton */}
              <div className="space-y-3">
                <div className="h-6 bg-gray-800 rounded w-32 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded w-4/6 animate-pulse"></div>
                </div>
              </div>
              
              {/* Actions Skeleton */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-700">
                <div className="h-10 bg-gray-800 rounded w-40 animate-pulse"></div>
                <div className="h-10 bg-gray-800 rounded w-48 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
