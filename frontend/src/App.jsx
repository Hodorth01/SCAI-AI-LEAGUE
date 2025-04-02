import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Loader from './components/Loader';
// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./auth/Login'));
const Signup = lazy(() => import('./auth/Signup'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ minHeight: "100vh" }}>
          <Header />
          <Suspense fallback={<Loader/>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;