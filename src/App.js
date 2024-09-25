import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import Main from './pages/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
