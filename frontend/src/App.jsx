import { BrowserRouter, Routes, Route } from 'react-router-dom'
// pages & components
import Header from './layout/Header';
import Home from './pages/Home';
import Footer from './layout/Footer';
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div style={{minHeight:"100vh"}}>
                <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={ <Home />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;