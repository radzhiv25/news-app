import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import NewsContent from "./components/NewsContent";
import Search from "./components/Search";
import { useState } from "react";
import { DarkModeProvider } from "./components/DarkModeContext";

function App() {
  const [query, setQuery] = useState("latest");

  const handleSearchQuery = (searchQuery) => {
    setQuery(searchQuery); // Update the query when search is triggered
  };

  return (
    <DarkModeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white">
        <Navbar />
        <Hero setQuery={setQuery} />
        <Search onSearch={handleSearchQuery} />
        <NewsContent query={query} setQuery={setQuery} />
        <Footer />
      </div>
    </DarkModeProvider>
  );
}

export default App;