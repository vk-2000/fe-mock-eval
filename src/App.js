import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import PageNotFound from './pages/PageNotFound';
import Error from './pages/Error';
import NoRecords from './pages/NoRecords';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/error/:errorCode?" element={<Error />} />
          <Route path="/no-records" element={<NoRecords />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
