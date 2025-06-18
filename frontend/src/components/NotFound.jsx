import { Link } from "react-router";
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1> 404 Page Not Found</h1>
      <Link to="/">Back to KudosBoard</Link>
    </div>
  );
};

export default NotFound;
