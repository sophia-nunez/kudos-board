import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BoardPage from "./components/BoardPage";
import NotFound from "./components/NotFound";
import { ThemeProvider, useTheme } from "./components/ThemeContext";

function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: HomePage },
      {
        path: "board/:boardId",
        loader: async ({ params }) => {
          // return data from here
          return { id: params.boardId };
        },
        Component: BoardPage,
      },
    ],
  },
]);

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div data-theme={theme}>
      <button id="toggle-mode" onClick={toggleTheme}>
        {theme === "light" ? "☀️" : "🌖"}
      </button>
      {<RouterProvider router={router} />}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<App />);
