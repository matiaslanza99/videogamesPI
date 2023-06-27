import './searchBar.style.css'
function SearchBar() {
  return (
    <div>
      <form className="search-box">
        <input placeholder="Buqueda" />
        <button>Buscar</button>
      </form>
    </div>
  );
}
export default SearchBar;