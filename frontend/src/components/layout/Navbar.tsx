import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check for JWT token in localStorage for auth state
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  // Listen for login changes (e.g., after login)
  // This is a simple effect for demo; for production, use context or global state
  // Optionally, you can use an event or context for better UX
  // useEffect(() => {
  //   setIsLoggedIn(!!localStorage.getItem("token"));
  // }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Startups", path: "/startups", protected: true },
    { name: "Investors", path: "/investors", protected: true },
    { name: "Events", path: "/events" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Startup-Connect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.path
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                  } ${item.protected && !isLoggedIn ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm">Dashboard</Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="hero" size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                    } ${item.protected && !isLoggedIn ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 pb-2 border-t border-border">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">Dashboard</Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="w-full" onClick={handleLogout}>Logout</Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full">Login</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <Button variant="hero" size="sm" className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;