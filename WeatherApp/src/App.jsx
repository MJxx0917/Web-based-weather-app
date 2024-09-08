import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './web_pages/search'
import Map from './web_pages/map';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Search />} />
          <Route exact path='/map' element={<Map />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
