import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import SignupPage from "@/pages/SignupPage";
import LoginPage from "@/pages/LoginPage";

// Layout
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <header className="p-4 bg-green-600 text-white">Farm-to-Table</header>
    <main className="flex-1 p-4">{children}</main>
    <footer className="p-4 bg-gray-800 text-white text-center">
      © 2026 Department of Agriculture
    </footer>
  </div>
);

// Pages placeholders
const Home = () => <div>Welcome to Farm-to-Table E-Commerce Platform</div>;
const Login = () => <LoginPage />;
const Signup = () => <SignupPage />;
const AdminDashboard = () => <div>Admin Dashboard</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Login and signup will have a different layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/admin/*"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
