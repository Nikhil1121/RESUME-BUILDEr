import React from 'react';
import { Route, Routes } from 'react-router-dom';

// ✅ Make sure all these files exist in src/pages/
import Home from './pages/Home.jsx';
import Layout from './pages/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ResumeBuilder from './pages/ResumeBuilder.jsx';
import Preview from './pages/Preview.jsx';
import Login from './pages/Login.jsx';

const App = () => {
  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route path='/' element={<Home />} />

        {/* Nested Routes under /app */}
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        {/* Preview & Login */}
        <Route path='view/:resumeId' element={<Preview />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
