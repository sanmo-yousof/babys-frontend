import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Breakfast from "./pages/Breakfast.tsx";
import Home from "./pages/Home.tsx";
import Brunch from "./pages/Brunch.tsx";
import Lunch from "./pages/Lunch.tsx";
import Dinner from "./pages/Dinner.tsx";
import Login from "./pages/Login.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import Recipes from "./pages/Recipes.tsx";
import RecipeCreateEdit from "./pages/RecipeCreateEdit.tsx";
import QueryProvider from "./providers/queryProvider.tsx";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin.tsx";
import AdminLayout from "./pages/Admin/AdminLayout/AdminLayout.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import RecipeView from "./pages/RecipeView.tsx";
import PrivateRoute from "./route/PrivateRoute.tsx";
import PublicRoute from "./route/PublicRoute.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/breakfast" element={<Breakfast />}>
      </Route>
      <Route path="/brunch" element={<Brunch />}>
      </Route>
      <Route path="/lunch" element={<Lunch />}>
      </Route>
      <Route path="/dinner" element={<Dinner />}>
      </Route>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/create-account"
        element={
          <PublicRoute>
            <CreateAccount />
          </PublicRoute>
        }
      />

      <Route
        path="/user-profile"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/my-recipes"
        element={
          <PrivateRoute>
            <Recipes />
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="/my-recipes/recipe/:id"
        element={
          <PrivateRoute>
            <RecipeView />
          </PrivateRoute>
        }
      />

      <Route
        path="/recipes/create"
        element={
          <PrivateRoute>
            <RecipeCreateEdit />
          </PrivateRoute>
        }
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminLayout />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </QueryProvider>
    </AuthProvider>
  </StrictMode>,
);
