import "./App.css";
import IndexRoutes from "./routes/indexRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <IndexRoutes />
    </div>
  );
}

export default App;
