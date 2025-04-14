import "./App.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import Home from "./pages/Home/Home";
import AppLayout from "./components/AppLayout";
import Payment from "./pages/Payment/Payment";
import Friends from "./pages/Friends/Friends";
import Error from "./components/Error";
import Dashboard from "./pages/Dashboard/Dashboard";
import Analysis from "./pages/Analysis/Analysis";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import LockedRoutes from "../utils/LockedRoutes";
import PersonalPayment from "./pages/Payment/PersonalPayment";
import SplitBill from "./pages/Payment/SplitBill";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LockedRoutes>
        <Home />
      </LockedRoutes>
    ),
    errorElement: <Error />,
  },
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/payment",
        element: (
          <ProtectedRoutes>
            <Payment />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/payment/personal",
        element: (
          <ProtectedRoutes>
            <PersonalPayment />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/payment/split",
        element: (
          <ProtectedRoutes>
            <SplitBill />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/friends",
        element: (
          <ProtectedRoutes>
            <Friends />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
