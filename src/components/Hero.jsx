import { FiTrendingUp } from "react-icons/fi";

const Hero = ({ setQuery }) => {
  const trendingTopics = [
    "Climate Change",
    "Artificial Intelligence",
    "Global Economy",
    "Space Exploration",
    "Renewable Energy",
  ];

  return (
    <div className="md:w-3/4 md:mx-auto mx-5 mb-5">
      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-1 text-center">
        Discover the World's
        <span className="block bg-clip-text text-transparent bg-gradient-to-br from-gray-300 to-gray-600 animate-gradient">
          Stories
        </span>
      </h1>
      <p className="mt-10 md:text-3xl text-xl font-semibold text-center">The features we offer</p>
      <div className="mb-10 border border-dashed p-2 grid md:grid-cols-3 grid-cols-2 gap-2 rounded">
        <div className="border border-dashed p-2 rounded col-span-2 hover:shadow-md">
          <h3 className="text-xl font-semibold">Personalized News Feed</h3>
          <p className="text-gray-500 text-sm">
            Tailor your news feed by selecting topics such as technology,
            politics, sports, and entertainment. Get a more personalized
            experience.
          </p>
        </div>

        <div className="border border-dashed p-2 rounded hover:shadow-md">
          <h3 className="text-xl font-semibold">Trending News Section</h3>
          <p className="text-gray-500 text-sm">
            Stay updated with the most trending and viral stories in one click.
          </p>
        </div>

        <div className="border border-dashed p-2 rounded hover:shadow-md">
          <h3 className="text-xl font-semibold">Bookmarks and Favorites</h3>
          <p className="text-gray-500 text-sm">
            Bookmark articles to read later and organize your favorite reads
            with ease.
          </p>
        </div>

        <div className="border border-dashed p-2 rounded col-span-2 hover:shadow-md">
          <h3 className="text-xl font-semibold">Category-based Filtering</h3>
          <p className="text-gray-500 text-sm">
            Filter news by categories such as politics, sports, and
            entertainment.
          </p>
        </div>

        <div className="border border-dashed p-2 rounded hover:shadow-md">
          <h3 className="text-xl font-semibold">Push Notifications</h3>
          <p className="text-gray-500 text-sm">
            Receive real-time notifications about breaking news.
          </p>
        </div>

        <div className="border border-dashed p-2 rounded hover:shadow-md">
          <h3 className="text-xl font-semibold">Multi-Language Support</h3>
          <p className="text-gray-500 text-sm">
            Access news in multiple languages to stay informed no matter where
            you are.
          </p>
        </div>

        <div className="border border-dashed p-2 rounded hover:shadow-md">
          <h3 className="text-xl font-semibold">Dark Mode</h3>
          <p className="text-gray-500 text-sm">
            Toggle between light and dark themes for a more comfortable reading
            experience.
          </p>
        </div>
      </div>
      
      <div className="mt-5 animate-fade-in-up animation-delay-400 space-y-2 md:w-max mx-auto">
        <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-700 md:w-max mx-auto">
          <FiTrendingUp className="h-5 w-5 mr-2 text-gray-600" />
          Trending Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, index) => (
            <span
              key={index}
              onClick={() => setQuery(topic)} // Set the query when a topic is clicked
              className="bg-white text-gray-700 text-sm px-3 py-1 rounded-full border border-dashed hover:bg-gray-200 transition-all duration-300 cursor-pointer transform hover:scale-105"
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
