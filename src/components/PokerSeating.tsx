import { useState, useEffect } from 'react';
import '../styles/PokerSeating.css';

export default function PokerSeating() {
  const [players, setPlayers] = useState<string[]>(Array(10).fill(''));
  const [arrangedPlayers, setArrangedPlayers] = useState<string[]>([]);

  useEffect(() => {
    const savedPlayers = localStorage.getItem('pokerSeatingPlayers');
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
  }, []);

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
    // localStorage에 매번 저장
    localStorage.setItem('pokerSeatingPlayers', JSON.stringify(newPlayers));
  };

  const handleArrangement = async () => {
    const validPlayers = players.filter((p) => p.trim() !== '');
    if (validPlayers.length === 0) {
      alert('최소 1명 이상의 플레이어를 입력해주세요.');
      return;
    }

    // localStorage에 플레이어 이름 저장
    localStorage.setItem('pokerPlayers', JSON.stringify(validPlayers));

    for (let i = 0; i < 10; i++) {
      // 랜덤 셔플
      const shuffled = [...validPlayers].sort(() => Math.random() - 0.5);
      setArrangedPlayers(shuffled);
      await new Promise((resolve) => setTimeout(resolve, 100)); // 0.1초 대기
    }
  };

  return (
    <div className="seating-container">
      <div className="seating-main">
        <div className="table-section">
          <div className="poker-table">
            <div className="dealer-marker">D</div>
            <div className="players-around-table">
              {arrangedPlayers.map((player, index) => (
                <div key={index} className={`player-seat seat-${index}`}>
                  <span className="player-name">{player}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="input-section">
          <h3>플레이어 입력</h3>
          <div className="player-inputs">
            {players.map((player, index) => (
              <div key={index} className="player-input-group">
                <label>Player {index + 1}</label>
                <input
                  type="text"
                  value={player}
                  onChange={(e) => handlePlayerChange(index, e.target.value)}
                  placeholder="이름을 입력하세요"
                />
              </div>
            ))}
          </div>
          <button className="arrange-btn" onClick={handleArrangement}>
            자리배치!
          </button>
        </div>
      </div>
    </div>
  );
}
