import React , {useState,useEffect} from "react";
import Scorebord from "./components/Scorebord";
import './style.css'


function App() {
  const [reload, setReload] = useState(false);

  const handleClick = (e) => {
    setReload(true);
    // other code
  }

  useEffect(() => {
    if (reload) {
      window.location.reload();
    }
  }, [reload]);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <header className="bg-gray-800 py-4 px-6">
        <h1 className="text-white text-xl text-center" onClick={handleClick}>React Darts</h1>
      </header>
      <main className="flex-1 p-6">
        <Scorebord />
      </main>
    </div>
  );
}

export default App;
