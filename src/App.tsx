import { useState } from 'react';
import PokerSeating from './components/PokerSeating';
import PokerCalculator from './components/PokerCalculator';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'seating' | 'calculator'>(
    'seating',
  );

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">포커 도구</div>
        <div className="nav-links">
          <button
            className={`nav-btn ${currentPage === 'seating' ? 'active' : ''}`}
            onClick={() => setCurrentPage('seating')}
          >
            포커 자리 배치
          </button>
          <button
            className={`nav-btn ${currentPage === 'calculator' ? 'active' : ''}`}
            onClick={() => setCurrentPage('calculator')}
          >
            수익 & 엔트리 계산기
          </button>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === 'seating' && <PokerSeating />}
        {currentPage === 'calculator' && <PokerCalculator />}
      </main>
    </div>
  );
}

export default App;
