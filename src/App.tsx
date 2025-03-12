import "./App.css";
import Header from "./components/Header/Header";
import Settings from "./components/Settings/Settings";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Settings />
      </div>
    </div>
  );
}
export default App;
