import Root from "./pages/root";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Index from "./pages/Index/index";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/Error/NotFound";
import Settings from "./pages/Settings/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Index />} />
      <Route path="home" element={<Home />} />
      <Route path="cart" element={<Cart />} />
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
