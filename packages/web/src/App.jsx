// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ChatApp from './pages/chatapp';
import Notice from './pages/notice';

const App = () => {
 return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<ChatApp />} />
      <Route path="/notice" element={<Notice />} />
    </Routes>
 );
};

export default App;