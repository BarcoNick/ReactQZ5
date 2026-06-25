import "./App.css";
import { MovieProvider } from "./context/MovieContext";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

function App() {
  return (
    <MovieProvider>
      <div className="app-root">
        <Sidebar />
        <div className="main-area">
          <Home />
        </div>
      </div>
    </MovieProvider>
  );
}

export default App;
