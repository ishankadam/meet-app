import "./App.css";
import { LinkProvider } from "./context/meetContext";
import Dashboard from "./dashboard/dashboard";

function App() {
  return (
    <LinkProvider>
      <Dashboard></Dashboard>;
    </LinkProvider>
  );
}

export default App;
