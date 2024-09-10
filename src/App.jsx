import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import NewsContent from "./components/NewsContent"
import Search from "./components/Search"
import { useState } from "react"


function App() {
  const [query, setQuery] = useState("latest")
  const handleSearchQuery = (searchQuery) => {
    setQuery(searchQuery); // Update the query when search is triggered
  };
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Hero setQuery={setQuery}/>
      <Search onSearch={handleSearchQuery} />
      <NewsContent query={query} setQuery={setQuery}/>
      <Footer />
    </div>
  )
}

export default App
