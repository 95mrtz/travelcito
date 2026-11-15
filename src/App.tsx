import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/app-provider';
import Home from './pages/home';
import Travel from './pages/travel';
import ListView from './pages/list-view';

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travel/:type" element={<Travel />} />
          <Route path="/list/:id" element={<ListView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
