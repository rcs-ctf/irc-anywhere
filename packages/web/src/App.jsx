// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ChatApp from './pages/chatapp';

const App = () => {
 return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<ChatApp />} />
    </Routes>
 );
};

export default App;