import { useMemo, useState } from "react";
import "./index.css";
import "./App.css";
import books from "./data/books";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import BookGrid from "./components/Bookgrid";
import CategoryPicker from "./components/CategoryPicker";

import { CartProvider } from "./context/CartContext";

function AppContent() {
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = useMemo(
    () => [...new Set(books.map((book) => book.category))].sort(),
    [],
  );

  const filteredBooks = useMemo(() => {
    const query = search.toLowerCase().trim();

    return books.filter((book) => {
      const matchesSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query);
      const matchesCategory =
        !selectedCategory || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const scrollToBooks = () => {
    document.getElementById("books")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setCategoryPickerOpen(false);
    scrollToBooks();
  };

  const showAllBooks = () => {
    setSelectedCategory(null);
    setSearch("");
  };

  return (
    <div className="app">
      <NavBar
        search={search}
        setSearch={setSearch}
        onSearchSubmit={scrollToBooks}
        onCartClick={() => setCartOpen(true)}
        onCategoriesClick={() => setCategoryPickerOpen(true)}
      />

      <main>
        <Hero
          onBrowseClick={scrollToBooks}
          onCategoriesClick={() => setCategoryPickerOpen(true)}
        />

        <BookGrid
          books={filteredBooks}
          selectedCategory={selectedCategory}
          onViewAll={showAllBooks}
        />

        <section className="newsletter">
          <div>
            <span className="section-label">STAY INFORMED!</span>

            <h2>Never miss a great story.</h2>

            <p>
              Get book recommendations, new releases, and exclusive offers
              delivered to your inbox.
            </p>
          </div>

          <form
            className="newsletter-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              required
            />

            <button type="submit">Subscribe</button>
          </form>
        </section>
      </main>

      <Footer categories={categories} onCategorySelect={selectCategory} />

      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
      {categoryPickerOpen && (
        <CategoryPicker
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={selectCategory}
          onClose={() => setCategoryPickerOpen(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
