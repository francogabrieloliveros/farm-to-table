import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-primary/20 manrope tracking-tighter">404</h1>
        <h2 className="text-3xl font-extrabold text-foreground manrope mt-4">Page Not Found</h2>
        <p className="text-muted-foreground inter mt-2 max-w-md mx-auto">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
        </p>
        <Link to="/" className="inline-block mt-8">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 manrope font-bold text-lg px-8 py-6 rounded-xl shadow-md transition-all hover:-translate-y-0.5">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
