import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="empty-state not-found">
      <span className="not-found-code">404</span>
      <h1>This page missed its cue.</h1>
      <p>The page you’re looking for isn’t in this feature.</p>
      <Link className="primary-link" to="/">Back to the collection <span aria-hidden="true">→</span></Link>
    </section>
  );
}
