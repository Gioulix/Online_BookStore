import { useEffect } from "react";

function CategoryPicker({ categories, selectedCategory, onSelect, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="category-picker-overlay"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="category-picker"
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-picker-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="category-picker-header">
          <div>
            <span className="section-label">FIND YOUR NEXT READ</span>
            <h2 id="category-picker-title">Browse categories</h2>
          </div>
          <button
            className="close-category-picker"
            onClick={onClose}
            aria-label="Close categories"
          >
            &times;
          </button>
        </div>

        <div className="category-picker-options">
          <button
            className={!selectedCategory ? "selected" : ""}
            onClick={() => onSelect(null)}
          >
            All books
          </button>
          {categories.map((category) => (
            <button
              className={selectedCategory === category ? "selected" : ""}
              key={category}
              onClick={() => onSelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CategoryPicker;
