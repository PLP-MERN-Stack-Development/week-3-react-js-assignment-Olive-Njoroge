import { Routes, Route, Link } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Home from './Pages/Home';
import Tasks from './Pages/Tasks';
import Posts from './Pages/Posts';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex gap-4">
          <Link to="/" className="font-bold">🏠 Home</Link>
          <Link to="/tasks" className="font-bold">✅ Tasks</Link>
          <Link to="/posts" className="font-bold">📬 Posts</Link>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md border border-border hover:bg-accent"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
