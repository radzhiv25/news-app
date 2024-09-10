import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import NewsContent from "./components/NewsContent"


function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Hero />
      <NewsContent />
      <Footer />
    </div>
  )
}

export default App
