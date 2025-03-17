import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import Navbar from "./Pages/Navbar";
import Login from "./Pages/Login";
import { RouterProvider } from "react-router-dom";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Feed from "./Pages/Feed";
import FeedComment from "./Pages/FeedComment";
import ProfilePage from "./Pages/OwnProfile";
const persist = persistStore(store);
const reactRouters = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/postcomment/:id",
        element: <FeedComment />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      <RouterProvider router={reactRouters}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
);
