import "./App.css";

function Header() {
  return (
    <header className="header">

      <h1>Free-Tube</h1>
      <nav className="nav">

        <a href="/" className="nav-link">
          Home
        </a>
        <a href="/popular" className="nav-link">
          Popular
        </a>
      </nav>

    </header>
  );
}

export default Header;
