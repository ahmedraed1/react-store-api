import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import DashboardLayout from "./pages/admin/DashboardLayout";
import DashboardHomePage from "./pages/admin/DashboardHomePage";
import OrdersPage from "./pages/admin/OrdersPage";
import ProductsPage from "./pages/admin/ProductsPage";

const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/success" element={<SuccessPage />} />
              {/* Add other customer-facing routes here */}
            </Routes>
          </MainLayout>
        }
      />

      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<DashboardHomePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
}
export default App;
