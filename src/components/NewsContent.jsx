import { useState, useEffect } from "react";
import axios from "axios";

const NewsContent = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [query, setQuery] = useState("latest"); // Default to show latest content
  const [searchInput, setSearchInput] = useState(""); // Input field value

  const articlesPerPage = 10; // You can adjust the number of articles per page

  const getNewsData = async (page, searchQuery) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://gnews.io/api/v4/search?q=${searchQuery}&apikey=&page=${page}&max=${articlesPerPage}`
      );
      console.log(res.data);
      setNewsData(res.data.articles);
      setTotalPages(Math.ceil(res.data.totalArticles / articlesPerPage)); // Calculate total pages based on total articles
    } catch (error) {
      console.error("Error fetching news", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewsData(currentPage, query); // Fetch news when currentPage or query changes
  }, [currentPage, query]); // Trigger effect when currentPage or query changes

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

  // Handle form submission for search
  const handleSearch = (e) => {
    e.preventDefault();

    // If the input is empty, show the latest content
    if (searchInput.trim() === "") {
      setQuery("latest");
    } else {
      setQuery(searchInput.trim()); // Set the new query based on input
    }

    setCurrentPage(1); // Reset to page 1 on new search
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
  const limitDescription = (description, wordLimit = 40) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'; // Add ellipsis if truncated
    }
    return description;
  };

  if (error) {
    return <p className="md:w-3/4 mt-20 md:mx-auto mx-5">There was an error fetching the news: {error.message}</p>;
  }

  return (
    <div className="md:w-3/4 md:mx-auto mx-5 md:mt-20 mt-10">
      {/* Search Input Field */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="md:w-3/4 mx-auto flex items-center">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search news"
          className="border p-2 mr-2 w-full rounded outline-none"
        />
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Search
        </button>
        </div>
      </form>

      {/* News Content or Skeleton Loader */}
      {loading ? (
        renderSkeletonLoader() // Render the skeleton loader while data is loading
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {newsData.length > 0 ? (
            newsData.map((item) => (
              <div
                key={item.url}
                className="p-3 border rounded-md flex flex-col gap-2 h-full" // Ensures card takes full height
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
                <p className="text-xs mt-auto">{formatDate(item.publishedAt)}</p>
                <span className="flex justify-between text-sm">
                  <a href={item.source.url} className="hover:underline font-medium">
                    Source: {item.source.name}
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
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-gray-700">
          {` Page ${currentPage} of ${totalPages} `}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsContent;