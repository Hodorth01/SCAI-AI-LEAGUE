import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useAuthContext} from "./hooks/useAuthContext.jsx"
import Loader from './components/Loader';
import Header from "./layout/Header"
import Dashboard from './pages/Dashboard.jsx';
// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./auth/Login'));
const Signup = lazy(() => import('./auth/Signup'));
const WaitingList = lazy(() => import('./auth/WaitingList'));


function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ minHeight: "100vh" }}>
          
          <Suspense fallback={<Loader/>}>
            <Routes>
              <Route path="/" element={<><Header /><Home /></>} />
              <Route
                path="/signup"
                element={!user ? <><Header /><WaitingList /></> :<Navigate to="/" />}
              />
              <Route path="login"                             
                element={!user ?<><Header/><Login /> </> : <Navigate to="/" />}
              />
              <Route path="dashboard"                             
                element={user ?<Dashboard /> : <Navigate to="/" />}
              />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;