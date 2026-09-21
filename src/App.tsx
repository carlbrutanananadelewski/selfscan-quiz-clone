import { ErrorBoundary } from "./components/error-boundary";
import { Toaster } from "./components/ui/toaster";
import { Quiz } from "./pages/Quiz";

function App() {
  return (
    <ErrorBoundary>
      <Quiz />
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
