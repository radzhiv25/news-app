import { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  // Handle form submission for search
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchInput.trim() === "") {
      onSearch("latest"); // If empty, show the latest news
    } else {
      onSearch(searchInput.trim()); // Trigger the search with input value
    }

    setSearchInput(""); // Clear the input after submission
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="md:w-3/4 md:mx-auto mx-5 flex items-center">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search news"
          className="border border-dashed p-2 mr-2 w-full rounded outline-none"
        />
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;