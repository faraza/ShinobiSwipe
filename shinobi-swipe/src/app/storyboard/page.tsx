export default function StoryboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-md">
        <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl">🎬</span>
        </div>
        <h1 className="text-6xl font-bold mb-6">Storyboard</h1>
        <p className="text-xl opacity-90 mb-8">Your video storyboard is ready!</p>
        <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
          <p className="text-lg opacity-90">
            Based on your swipes, we've created a personalized storyboard for your video project.
          </p>
        </div>
      </div>
    </div>
  );
} 