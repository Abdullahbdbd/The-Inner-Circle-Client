import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddLessons from "../pages/Dashboard/AddLessons/AddLessons";
import PublicLessons from "../pages/PublicLessons/PublicLessons";
import Upgrade from "../pages/Upgrade/Upgrade";
import MyLessons from "../pages/Dashboard/MyLessons/MyLessons";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Payment/PaymentCancelled";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "public-lessons",
        Component: PublicLessons,
      },
      {
        path: "upgrade",
        Component: Upgrade,
      },
      {
        path:'payment/:email',
        Component: Payment
      },
      {
        path:'payment-success',
        Component: PaymentSuccess
      },
      {
        path:'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-lessons",
        Component: AddLessons,
      },
      {
        path: 'my-lessons',
        Component: MyLessons
      }
    ],
  },
]);
