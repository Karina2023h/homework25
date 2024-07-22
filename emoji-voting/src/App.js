import React, { Component } from "react";
import "./App.css";

const emojis = [
  { id: 1, symbol: "😀" },
  { id: 2, symbol: "😂" },
  { id: 3, symbol: "😍" },
  { id: 4, symbol: "🤔" },
  { id: 5, symbol: "😭" },
];

class App extends Component {
  constructor(props) {
    super(props);
    const save = JSON.parse(localStorage.getItem("votes"));
    this.state = {
      votes: save || emojis.map((emoji) => ({ ...emoji, count: 0 })),
      winner: null,
      noWinner: false,
    };
  }

  handleVote = (id) => {
    const updated = this.state.votes.map((emoji) =>
      emoji.id === id ? { ...emoji, count: emoji.count + 1 } : emoji
    );
    this.setState({ votes: updated }, () => {
      localStorage.setItem("votes", JSON.stringify(this.state.votes));
    });
  };

  handleShowResults = () => {
    const maxi = Math.max(...this.state.votes.map((emoji) => emoji.count));
    if (maxi === 0) {
      this.setState({ noWinner: true, winner: null });
    } else {
      const winner = this.state.votes.find((emoji) => emoji.count === maxi);
      this.setState({ winner, noWinner: false });
    }
  };

  handleClearResults = () => {
    const reset = emojis.map((emoji) => ({ ...emoji, count: 0 }));
    this.setState({ votes: reset, winner: null, noWinner: false }, () => {
      localStorage.setItem("votes", JSON.stringify(this.state.votes));
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="textw">Голосування за EMOJIS</h1>
        <div className="emoji-list">
          {this.state.votes.map((emoji) => (
            <div key={emoji.id} className="emoji-item">
              <span
                className="emoji-iten"
                role="img"
                aria-label="emoji"
                onClick={() => this.handleVote(emoji.id)}
              >
                {emoji.symbol}
              </span>
              <span className="zero">{emoji.count}</span>
            </div>
          ))}
        </div>
        <div className="block-btn">
          <button className="buttonone" onClick={this.handleShowResults}>
            Show Results
          </button>
          <button className="buttontho" onClick={this.handleClearResults}>
            Очистити результати
          </button>
        </div>
        {this.state.noWinner && (
          <div className="results">
            <h2>Немає переможця, голосів немає.</h2>
          </div>
        )}
        {this.state.winner && !this.state.noWinner && (
          <div className="results">
            <h2>
              Переможець: {this.state.winner.symbol} з {this.state.winner.count}{" "}
              голосами
            </h2>
          </div>
        )}
      </div>
    );
  }
}

export default App;
