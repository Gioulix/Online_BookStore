import { useCart } from "../context/CartContext";

function NavBar({
  search,
  setSearch,
  onSearchSubmit,
  onCartClick,
  onCategoriesClick,
}) {
  const { cart, cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#home" className="nav-logo">
          BookHaven
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#books">Books</a>
          <button className="nav-category-button" onClick={onCategoriesClick}>
            Categories
          </button>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
          <button
            className="nav-category-trigger"
            onClick={onCategoriesClick}
          >
            Categories
          </button>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSearchSubmit();
                }
              }}
            />
          </div>

          <button
            className="cart-button"
            onClick={onCartClick}
            aria-label="View cart"
          >
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button className="menu-button" aria-label="Open navigation menu">
            Ξ
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
