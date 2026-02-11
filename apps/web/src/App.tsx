import "./App.css";
import {
  ModalContainer,
  NavigationProvider,
  ScreenContainer,
} from "./components/NavigationProvider";

function App() {
  return (
    <div className="flex size-full flex-col">
      <NavigationProvider>
        <ScreenContainer />
        <ModalContainer />
      </NavigationProvider>
    </div>
  );
}

export default App;
