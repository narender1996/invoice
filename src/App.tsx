import { RouterProvider, createBrowserRouter } from "react-router-dom";
import InvoiceForm from "./components/Invoice";
import CoCForm from "./components/CoC";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "generate-invoice",
    element: <InvoiceForm />,
  },
  {
    path: "generate-coc",
    element: <CoCForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
