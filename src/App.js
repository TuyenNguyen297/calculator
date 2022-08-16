import './App.scss';
import Display from "../src/components/Display/display";
import Pads from "./components/Pads/pads";
import ClearPad from './components/Clear Pad/clearPad';

function App() {
  return (
    <section className="App">
      <Display />
      <ClearPad />
      <Pads />
    </section>
  );
}

export default App;
