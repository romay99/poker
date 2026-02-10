import { useState, useEffect } from 'react';
import '../styles/PokerCalculator.css';

interface PlayerData {
  name: string;
  value1: string;
  value2: string;
  pnl: number;
}

export default function PokerCalculator() {
  const [players, setPlayers] = useState<PlayerData[]>(
    Array(10)
      .fill(null)
      .map(() => ({ name: '', value1: '1', value2: '', pnl: 0 })),
  );
  const [buyIn, setBuyIn] = useState<string>('20000');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalStack, setTotalStack] = useState<number>(0);

  useEffect(() => {
    const savedData = localStorage.getItem('pokerCalculatorData');
    if (savedData) {
      const { players: savedPlayers, buyIn: savedBuyIn } =
        JSON.parse(savedData);
      setPlayers(savedPlayers);
      setBuyIn(savedBuyIn);
    }

    // 항상 pokerPlayers에서 이름을 확인하고 업데이트
    const savedPokerPlayers = localStorage.getItem('pokerPlayers');
    if (savedPokerPlayers) {
      const playerNames = JSON.parse(savedPokerPlayers);
      setPlayers((prevPlayers) =>
        prevPlayers.map((player, index) => ({
          ...player,
          name: playerNames[index] || '',
          pnl: 0,
        })),
      );
    }
  }, []);

  const handlePlayerChange = (
    index: number,
    field: 'name' | 'value1' | 'value2',
    value: string,
  ) => {
    const newPlayers = [...players];
    newPlayers[index] = {
      ...newPlayers[index],
      [field]: value,
    };
    setPlayers(newPlayers);
    // localStorage에 저장
    localStorage.setItem(
      'pokerCalculatorData',
      JSON.stringify({ players: newPlayers, buyIn }),
    );
  };

  const handleCalculate = () => {
    const buyInValue = parseFloat(buyIn) || 0;
    if (buyInValue <= 0) {
      alert('Buy-In 값을 입력해주세요.');
      return;
    }

    // Entry의 총합 계산
    const validPlayers = players.filter((p) => p.name.trim() !== '');
    const entrySum = validPlayers.reduce((sum, player) => {
      return sum + (parseFloat(player.value1) || 0);
    }, 0);

    // 총 금액 계산
    const total = entrySum * buyInValue;
    let stackSum = 0;
    setTotalAmount(total);

    // 각 플레이어의 P&L 계산
    const updatedPlayers = players.map((player) => {
      const entry = parseFloat(player.value1) || 0;
      const stack = parseFloat(player.value2) || 0;
      stackSum += stack;
      const pnl = stack - entry * buyInValue;
      return {
        ...player,
        pnl,
      };
    });
    setTotalStack(stackSum);
    setPlayers(updatedPlayers);
    // localStorage에 저장
    localStorage.setItem(
      'pokerCalculatorData',
      JSON.stringify({ players: updatedPlayers, buyIn }),
    );
  };

  const handleReset = () => {
    if (window.confirm('모든 데이터를 초기화하시겠습니까?')) {
      const initialPlayers = Array(10)
        .fill(null)
        .map(() => ({ name: '', value1: '1', value2: '', pnl: 0 }));
      setPlayers(initialPlayers);
      setBuyIn('20000');
      setTotalAmount(0);
      setTotalStack(0);
      // localStorage 초기화
      localStorage.removeItem('pokerCalculatorData');
    }
  };

  return (
    <div className="calculator-container">
      <div className="buy-in-container">
        <label className="buy-in-label">Buy-In</label>
        <input
          type="number"
          className="buy-in-value-input"
          placeholder="Buy-In"
          value={buyIn}
          onChange={(e) => {
            setBuyIn(e.target.value);
            // localStorage에 저장
            localStorage.setItem(
              'pokerCalculatorData',
              JSON.stringify({ players, buyIn: e.target.value }),
            );
          }}
        />
      </div>
      {totalAmount > 0 && (
        <div className="total-amount-container">
          <h3>총 금액: {totalAmount.toFixed(0)}</h3>
        </div>
      )}
      <div className="calculator-grid">
        {players.map((player, index) => (
          <div
            key={index}
            className="player-card"
            style={{
              opacity: !player.name.trim() ? 0.4 : 1,
              backgroundColor: !player.name.trim()
                ? 'rgba(180, 140, 140, 0.2)'
                : 'white',
            }}
          >
            <input
              type="text"
              className="player-name-input"
              value={player.name}
              onChange={(e) =>
                handlePlayerChange(index, 'name', e.target.value)
              }
              placeholder="Name"
            />
            <input
              type="number"
              className="player-value-input"
              value={player.value1}
              onChange={(e) =>
                handlePlayerChange(index, 'value1', e.target.value)
              }
              placeholder="Entry"
            />
            <input
              type="number"
              className="player-value-input"
              value={player.value2}
              onChange={(e) =>
                handlePlayerChange(index, 'value2', e.target.value)
              }
              placeholder="Stack"
            />
            <input
              type="text"
              className="player-value-input"
              placeholder="P & L"
              value={player.pnl !== 0 ? player.pnl.toFixed(0) : ''}
              readOnly
              style={{
                color:
                  player.pnl > 0 ? 'red' : player.pnl < 0 ? 'blue' : 'black',
              }}
            />
          </div>
        ))}
      </div>
      <button className="calculate-button" onClick={handleCalculate}>
        Calculate
      </button>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
      <h2>Total Prize : {totalAmount}</h2>
      <h2>Total Stack : {totalStack}</h2>
    </div>
  );
}
