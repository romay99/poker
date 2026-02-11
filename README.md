# 포커 게임 관리 도구

포커 게임의 플레이어 자리배치와 P&L(수익/손실) 계산을 위한 웹 애플리케이션입니다.

## 기능

### 1. 플레이어 자리배치 (Poker Seating)
- 플레이어 이름 입력
- 자리배치 버튼으로 랜덤 셔플
- 포커 테이블 시각화 (딜러 고정 12시, 플레이어 시계방향 배치)
- 자동 저장 (새로고침해도 데이터 유지)

### 2. P&L 계산기 (Poker Calculator)
- Buy-In 설정
- Entry, Stack 값 입력
- 자동 계산 기능:
  - 총 금액: Entry 총합 × Buy-In
  - 개인 P&L: (Entry × Buy-In) - Stack
- P&L 색상 표시 (양수: 빨간색, 음수: 파란색)
- 모든 데이터 자동 저장
- 초기화 버튼

## 사용 방법

1. PokerSeating에서 플레이어 이름 입력 후 "자리배치!" 클릭
2. PokerCalculator로 이동
3. Buy-In 값 입력
4. Entry, Stack 값 입력
5. "Calculate" 버튼으로 P&L 계산
6. 필요시 "Reset" 버튼으로 전체 초기화
