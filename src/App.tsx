import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import MergeTool from "./pages/MergeTool";
import SplitTool from "./pages/SplitTool";
import RotateTool from "./pages/RotateTool";
import CompressTool from "./pages/CompressTool";
import SignTool from "./pages/SignTool";
import Viewer from "./pages/Viewer";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/merge" element={<MergeTool />} />
            <Route path="/split" element={<SplitTool />} />
            <Route path="/rotate" element={<RotateTool />} />
            <Route path="/compress" element={<CompressTool />} />
            <Route path="/sign" element={<SignTool />} />
            <Route path="/viewer" element={<Viewer />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
