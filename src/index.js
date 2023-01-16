import React from "react";
import ReactDOM  from "react-dom/client";
import "./index.css";

// Youtube: https://www.youtube.com/watch?v=RatESimeqhA
// Ref: https://reactjs.org/tutorial/tutorial.html

// TO - DO : Store Game history!! -- Advanced!! :) 

// ------------
// S Q U A R E 
// ------------

function Square(props) {
  // Inside EACH Square
    return (<button className="square" onClick={
             props.onClick } > 
            {props.value}      
           </button>);
}

  // Calculate Winner
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }    
    return null;    
}

// -----------
//  B O A R D 
// -----------
class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state =   {
       squares:  Array(9).fill(null), 
       xIsNext: true,
       winner: null
    };
  }

    // HandleClick()
  handleClick(i) {
    const squares = this.state.squares.slice();
    
    if (squares[i] == null && this.state.winner == null) {
        squares[i] = (this.state.xIsNext ? "X" : "O");
        this.setState( {squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }
  }

  // Make a individual square 
  makeSquare(i) {
    return <Square value = {this.state.squares[i]} onClick = {() => this.handleClick(i) }/> ;
  }

  render() {

   this.state.winner = calculateWinner(this.state.squares);
   let status; 
   if (this.state.winner) {
    status = "Winner is " + this.state.winner;
   } else {
    status = "Next player: " + (this.state.xIsNext ? "Adam(X)" : "Barbara(O)");
   }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.makeSquare(0)}
          {this.makeSquare(1)}
          {this.makeSquare(2)}
        </div>
        <div className="board-row">
          {this.makeSquare(3)}
          {this.makeSquare(4)}
          {this.makeSquare(5)}
        </div>
        <div className="board-row">
          {this.makeSquare(6)}
          {this.makeSquare(7)}
          {this.makeSquare(8)}
        </div>
      </div>
    );
  }
}

// ---------
// M A I N  
// ---------
class Game extends React.Component {
  render() {
    return (
      <div className="game" >
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
// ========================================
