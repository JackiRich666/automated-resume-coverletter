import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import CoverLetterPage from './pages/CoverLetterPage';
import TemplatesPage from './pages/TemplatesPage';
import AnalysisPage from './pages/AnalysisPage';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resumes" element={<ResumePage />} />
          <Route path="/coverletters" element={<CoverLetterPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;