import AppRoutes from "./routes/routes";
import { Header } from "./shared";

const App = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
