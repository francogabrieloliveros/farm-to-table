import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import SignupPage from "@/pages/SignupPage";
import LoginPage from "@/pages/LoginPage";
import ConsumerLayout from "@/components/consumer/ConsumerLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";
import ConsumerHomePage from "@/pages/consumer/ConsumerHomePage";
import ProfilePage from "@/pages/consumer/ProfilePage";
import DashboardPage from "@/pages/admin/DashboardPage";
import AdminLayout from "@/components/admin/AdminLayout";
import UsersPage from "@/pages/admin/UsersPage";
import InventoryPage from "@/pages/admin/InventoryPage";
import OrdersPage from "@/pages/admin/OrdersPage";
import ReportsPage from "@/pages/admin/ReportsPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<PublicRoute element={<LoginPage />} />}
          />
          <Route
            path="/signup"
            element={<PublicRoute element={<SignupPage />} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                type="Consumer"
                element={
                  <ConsumerLayout>
                    <ConsumerHomePage />
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
                    <ProfilePage />
                  </ConsumerLayout>
                }
              />
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                type="Admin"
                element={
                  <AdminLayout>
                    <DashboardPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute
                type="Admin"
                element={
                  <AdminLayout>
                    <UsersPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/inventory"
            element={
              <ProtectedRoute
                type="Admin"
                element={
                  <AdminLayout>
                    <InventoryPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute
                type="Admin"
                element={
                  <AdminLayout>
                    <OrdersPage />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute
                type="Admin"
                element={
                  <AdminLayout>
                    <ReportsPage />
                  </AdminLayout>
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
