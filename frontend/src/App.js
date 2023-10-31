import Root from "./pages/root";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import NotFound from "./pages/Error/NotFound";
import Settings from "./pages/Settings/Settings";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to="/home" replace={true} />} />
      <Route path="home" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="product-details/:section/:numberID" element={<ProductDetails />} />
      <Route path="*" element={<NotFound />} />
      <Route path="settings" element={<Settings />} />

      {/* ... etc. */}
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
