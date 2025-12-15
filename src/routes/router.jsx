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
import DetailsPage from "../pages/DetailsPages/DetailsPage/DetailsPage";
import MyFavorites from "../pages/Dashboard/MyFavorites/MyFavorites";
import Profile from "../pages/Dashboard/Profile/Profile";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import UserManagement from "../pages/Dashboard/UserManagement/UserManagement";
import AdminRoute from "./AdminRoute";

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
        path: "public-lessons/:id",
        Component: DetailsPage,
      },
      {
        path: "upgrade",
        Component: Upgrade,
      },
      {
        path: "payment/:email",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
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
        index: true,
        Component: DashboardHome,
      },
      {
        path: "add-lessons",
        Component: AddLessons,
      },
      {
        path: "my-lessons",
        Component: MyLessons,
      },
      {
        path: "my-favorites",
        Component: MyFavorites,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
