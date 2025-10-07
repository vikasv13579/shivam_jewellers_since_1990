export default function LoadingSpinner() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="animate-pulse">
        <div className="h-[200px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="flex-1 p-8">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
          <div className="space-y-4 mt-8">
            <div className="h-32 bg-gray-300 rounded"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="h-[200px] bg-gray-800"></div>
      </div>
    </div>
  );
}