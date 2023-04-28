import AppHeader from "../appHeader/AppHeader";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, ComicsPage } from "../pages/index";
const Page404 = lazy(() => import("../pages/404"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<span>Loading....</span>}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="*" element={<Page404 />}></Route>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
