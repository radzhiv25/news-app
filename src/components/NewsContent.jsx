import { useState, useEffect } from "react";
import axios from "axios";
// Import the country and language data
import { countries, languages } from '/data';

const NewsContent = ({ query }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // State for country and language selection
  const [selectedCountry, setSelectedCountry] = useState("us"); // Default: United States
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default: English

  const articlesPerPage = 10;
  const apiKey = import.meta.env.VITE_NEWS_API_KEY; // Ensure the API key is available in your environment variables

  const getNewsData = async (page, searchQuery, country, language) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://gnews.io/api/v4/search?q=${searchQuery}&apikey=${apiKey}&page=${page}&max=${articlesPerPage}&country=${country}&lang=${language}`
      );
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
    getNewsData(currentPage, query, selectedCountry, selectedLanguage);
  }, [currentPage, query, selectedCountry, selectedLanguage]);

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

  // Handle country and language changes
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Skeleton Loader for Articles
  const renderSkeletonLoader = () => (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {Array(articlesPerPage).fill().map((_, index) => (
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

  // Function to limit the description to 30 words
  const limitDescription = (description, wordLimit = 20) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'; // Add ellipsis if truncated
    }
    return description;
  };

  if (error) {
    return <p className="md:w-3/4 md:mx-auto mx-5">There was an error fetching the news: {error.message}</p>;
  }

  return (
    <div className="md:w-3/4 md:mx-auto mx-5">
      {/* Country and Language Filters */}
      <div className="flex items-center gap-3 mb-6">
        {/* Country Dropdown */}
        <div>
          <label htmlFor="country" className="mr-2">Country:</label>
          <select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="py-1 px-2 border rounded outline-none"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Language Dropdown */}
        <div>
          <label htmlFor="language" className="mr-2">Language:</label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="px-2 py-1 border rounded outline-none"
          >
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* News Content or Skeleton Loader */}
      {loading ? (
        renderSkeletonLoader() // Render the skeleton loader while data is loading
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {newsData.length > 0 ? (
            newsData.map((item) => (
              <div
                key={item.url}
                className="p-3 border rounded-md flex flex-col gap-2 h-full hover:shadow-md" // Ensures card takes full height
              >
                <h1 className="text-xl font-semibold">{item.title}</h1>
                <div className="h-48 flex-shrink-0">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-sm">{limitDescription(item.description)}</p>
                </div>
                {/* Format the published date */}
                <div className="flex justify-between text-sm items-center">
                  <span className="flex flex-col">
                <p className="text-xs mt-auto">{formatDate(item.publishedAt)}</p>

                  <a href={item.source.url} className="hover:underline font-medium">
                    {item.source.name}
                  </a>
                  </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm border py-1 px-2 bg-black text-white w-max rounded"
                >
                  Read more
                </a>
                </div>
              </div>
            ))
          ) : (
            <p>No news articles available.</p>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-1 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-gray-700">
          {` Page ${currentPage} of ${totalPages} `}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-1 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsContent;