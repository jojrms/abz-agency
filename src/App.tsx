import { QueryClient, QueryClientProvider } from "react-query";
import { Home } from "./views";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />;
    </QueryClientProvider>
  );
}

export default App;
