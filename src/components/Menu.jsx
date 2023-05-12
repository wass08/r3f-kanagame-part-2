import { gameStates, useGameStore } from "../store";

export const Menu = () => {
  const { startGame, gameState, goToMenu } = useGameStore((state) => ({
    startGame: state.startGame,
    gameState: state.gameState,
    goToMenu: state.goToMenu,
  }));
  return (
    <>
      <div
        className={`menu ${
          gameState !== gameStates.MENU ? "menu--hidden" : ""
        }`}
      >
        <h1>Kana game</h1>
        <button
          disabled={gameState !== gameStates.MENU}
          onClick={() => startGame({ mode: "hiragana" })}
        >
          Start hiragana game
        </button>
        <button
          disabled={gameState !== gameStates.MENU}
          onClick={() => startGame({ mode: "katakana" })}
        >
          Start katakana game
        </button>
      </div>
      <div
        className={`scores ${
          gameState !== gameStates.GAME_OVER ? "scores--hidden" : ""
        }`}
      >
        <h1>Congratulations you are becoming a true master</h1>
        <button
          onClick={goToMenu}
          disabled={gameState !== gameStates.GAME_OVER}
        >
          Play again
        </button>
      </div>
    </>
  );
};
