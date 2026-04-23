import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';

// Layout
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <header className="p-4 bg-green-600 text-white">Farm-to-Table</header>
    <main className="flex-1 p-4">{children}</main>
    <footer className="p-4 bg-gray-800 text-white text-center">© 2026 Department of Agriculture</footer>
  </div>
);

// Pages placeholders
const Home = () => <div>Welcome to Farm-to-Table E-Commerce Platform</div>;
const Login = () => <div>Login Page</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;