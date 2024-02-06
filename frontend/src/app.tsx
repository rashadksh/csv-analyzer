import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Hello world</div>} />
      </Routes>
    </div>
  );
}

export default App;
