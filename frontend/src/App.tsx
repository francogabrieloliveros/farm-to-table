import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import SignupPage from "@/pages/SignupPage";
import LoginPage from "@/pages/LoginPage";
import ConsumerLayout from "@/components/ConsumerLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import HomePage from "@/pages/consumer/HomePage";
import ProfilePage from "@/pages/consumer/ProfilePage";

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
const Home = () => <HomePage />;
const Profile = () => <ProfilePage />;
const Login = () => <LoginPage />;
const Signup = () => <SignupPage />;
const AdminDashboard = () => <div>Admin Dashboard</div>;

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Login and signup will have a different layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute
                type="Consumer"
                element={
                  <ConsumerLayout>
                    <Home />
                  </ConsumerLayout>
                }
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                type="Consumer"
                element={
                  <ConsumerLayout>
                    <Profile />
                  </ConsumerLayout>
                }
              />
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                type="Admin"
                element={
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                }
              />
            }
          />
        </Routes>
        <Toaster position="bottom-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;
