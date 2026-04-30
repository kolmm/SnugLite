import { Link } from 'react-router';
import { ROUTES } from '../lib/constants';

export function NotFoundPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-32">
      <p className="caption text-stone">404</p>
      <h1 className="display-lg mt-6">Page Not Found</h1>
      <p className="text-stone mt-4 max-w-md">
        The page you are looking for has moved or no longer exists.
      </p>
      <Link
        to={ROUTES.HOME}
        className="caption mt-8 border-b border-ink hover:text-rust hover:border-rust"
      >
        Return Home
      </Link>
    </section>
  );
}
