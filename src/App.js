
import "./styles.css";
import Home from "./home";
import About from "./about";
import ErrorPage from "./error";

import React, { lazy, Suspense } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
  useParams,
  useSearchParams,
} from "react-router-dom";

// Lazy loading
const Dashboard = lazy(() => import("./dashboard"));

function UserDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");

  return (
    <div>
      <h2>User Details</h2>
      <p>User ID: {id}</p>
      <p>Name: {name || "Not provided"}</p>
    </div>
  );
}

function Login() {
  return <h3>You are not logged in</h3>;
}

const LoggedIn = true;

function ProtectedRoute({ children }) {
  if (!LoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink> |{" "}
        <NavLink to="/">Home</NavLink> |{" "}
        <NavLink to="/about">About</NavLink> |{" "}
        <NavLink to="/users/101?name=Surya">User Details</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/users/:id" element={<UserDetails />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<h3>Loading...</h3>}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}



// Create a React application using React Router v6 or above. The app should have a Home page and an About page,
//  both rendered inside a common layout that includes a navigation bar, and the active route should be highlighted.
//   Add a dynamic route for a User Details page that reads a route parameter and optional query parameters. Implement one protected 
//   route (for example, a Dashboard) using a mock authentication check and redirect unauthenticated users appropriately. 
//   At least one route should be lazy-loaded using React.lazy and Suspense. Also handle unknown routes by showing a 404 Not Found page.