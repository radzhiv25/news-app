import { FiTrendingUp } from "react-icons/fi";

const Hero = () => {
  const trendingTopics = [
    "Climate Change",
    "Artificial Intelligence",
    "Global Economy",
    "Space Exploration",
    "Renewable Energy",
  ];
  return (
    <div className="md:w-3/4 md:mx-auto mx-5 mb-20 border">
      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tighter leading-tight animate-fade-in-up text-center">
        Discover the World's
        <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-800">
          Stories
        </span>
      </h1>
      <div className="bg-gray-200 rounded-md">

      </div>
      <div className="mt-5 animate-fade-in-up animation-delay-400 space-y-2 md:w-max mx-auto">
        <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-700 w-max mx-auto">
          <FiTrendingUp className="h-5 w-5 mr-2 text-gray-600" />
          Trending Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, index) => (
            <span
              key={index}
              className="bg-white text-gray-700 text-sm px-3 py-1 rounded-full border hover:bg-gray-200 transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
