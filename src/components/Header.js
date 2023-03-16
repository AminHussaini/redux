import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <h3>Redux Blog</h3>
      <nav>
        <ul>
          <li>
            <Link to="/redux/">Home</Link>
          </li>
          <li>
            <Link to="/post">Add Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
