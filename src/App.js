import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import FirebaseAuthPage from './pages/FirebaseAuth';
import Main from './pages/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/auth" element={<FirebaseAuthPage />} exact/>
      </Routes>
    </Router>
  );
}

export default App;
