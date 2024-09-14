import { useState, useEffect } from "react";
import axios from "axios";
import { useDarkMode } from "./DarkModeContext";
// Import the country, language, and category data
import { countries, languages, categories } from "/data";

const NewsContent = ({ query }) => {
  const { darkMode } = useDarkMode();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedCountry, setSelectedCountry] = useState("none");
  const [selectedLanguage, setSelectedLanguage] = useState("none");
  const [selectedCategory, setSelectedCategory] = useState("none");

  const articlesPerPage = 10;
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const getNewsData = async (page, searchQuery, country, language, category) => {
    setLoading(true);
    try {
      let apiUrl = `https://gnews.io/api/v4/search?q=${searchQuery}&apikey=${apiKey}&page=${page}&max=${articlesPerPage}`;
      if (country !== "none") apiUrl += `&country=${country}`;
      if (language !== "none") apiUrl += `&lang=${language}`;
      if (category !== "none") apiUrl += `&topic=${category}`;

      const res = await axios.get(apiUrl);
      setNewsData(res.data.articles);
      setTotalPages(Math.ceil(res.data.totalArticles / articlesPerPage));
    } catch (error) {
      console.error("Error fetching news", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewsData(currentPage, query, selectedCountry, selectedLanguage, selectedCategory);
  }, [currentPage, query, selectedCountry, selectedLanguage, selectedCategory]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Updated function to separate date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return { formattedDate, formattedTime };
  };

  const renderSkeletonLoader = () => (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {Array(articlesPerPage)
        .fill()
        .map((_, index) => (
          <div key={index} className="p-3 border rounded-md flex flex-col gap-2 animate-pulse bg-gray-200">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-32 bg-gray-300 rounded-md"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
    </div>
  );

  const limitDescription = (description, wordLimit = 20) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  const limitHeading = (heading, wordLimit = 10) => {
    const words = heading.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return heading;
  };

  if (error) {
    return (
      <p className="md:w-3/4 md:mx-auto mx-5">
        There was an error fetching the news: {error.message}
      </p>
    );
  }

  return (
    <div className="md:w-3/4 md:mx-auto mx-5">
      {/* Country, Language, and Category Filters */}
      <div className="flex md:justify-between flex-wrap gap-2 items-center mb-6">
        <div>
          <label htmlFor="country" className="mr-2">Country:</label>
          <select id="country" value={selectedCountry} onChange={handleCountryChange} className="px-2 py-1 border rounded outline-none dark:bg-zinc-700 dark:text-white dark:border-none">
            <option value="none">None</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="language" className="mr-2">Language:</label>
          <select id="language" value={selectedLanguage} onChange={handleLanguageChange} className="px-2 py-1 border rounded outline-none dark:bg-zinc-700 dark:text-white dark:border-none">
            <option value="none">None</option>
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category" className="mr-2">Category:</label>
          <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="px-2 py-1 border rounded outline-none dark:bg-zinc-700 dark:text-white dark:border-none">
            <option value="none">None</option>
            {categories.map((category) => (
              <option key={category.code} value={category.code}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* News Content or Skeleton Loader */}
      {loading ? (
        renderSkeletonLoader()
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {newsData.length > 0 ? (
            newsData.map((item) => {
              const { formattedDate, formattedTime } = formatDateTime(item.publishedAt);
              return (
                <div key={item.url} className="p-3 border rounded-md flex flex-col gap-2 h-full hover:shadow-md">
                  <h1 className="text-xl font-semibold">{limitHeading(item.title)}</h1>
                  <div className="h-48 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm">{limitDescription(item.description)}</p>
                  </div>
                  {/* Separate date and time spans */}
                  <div className="flex justify-between text-xs mt-auto">
                    <span>{formattedDate}</span>
                    <span>{formattedTime}</span>
                  </div>
                  <a href={item.source.url} className="hover:underline text-sm font-medium w-max">{item.source.name}</a>
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-sm py-1 px-2 bg-black dark:bg-zinc-500 text-white w-max rounded">Read more</a>
                </div>
              );
            })
          ) : (
            <p>No news articles available.</p>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-1 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
        <span className="text-gray-700">{` Page ${currentPage} of ${totalPages} `}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-1 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
      </div>
    </div>
  );
};

export default NewsContent;