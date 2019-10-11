import React, { Component } from 'react';

import Card from './Card';
import './../App.css';

const update = require('immutability-helper');

export default class Editor extends Component {

  state = {
    cards: [
      {
        id: 1,
        text: '#include<iostream>',
      },
      {
        id: 2,
        text: 'using namespace std;',
      },
      {
        id: 3,
        text: 'int main() {',
      },
      {
        id: 4,
        text: 'cout << "Hello World" << endl;',
      },
      {
        id: 5,
        text:
          'return 0;',
      },
      {
        id: 6,
        text: '}',
      },
    ],

    correctOrder: [1, 2, 3, 4, 5, 6],
    score: 0,
  }

  componentDidMount() {
    this.setState({
      status: ''
    })
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }

  getIds = (cards) => {
    const ids = [];
    this.state.cards.forEach(card => ids.push(card.id));
    return ids;
  }

  checkAnswer = (answer) => {
    const ids = this.getIds(answer);
    if (JSON.stringify(ids) == JSON.stringify(this.state.correctOrder)) {
      return true;
    }

    return false;
  }

  renderAlert = (msg) => {
    window.alert(msg);
  }

  renderScore = (isCorrect) => {
    let { score } = this.state;

    score = parseInt(score);

    if (isCorrect) {
      this.renderAlert("Correct Answer")
      score += 100
    } else {
      this.renderAlert("Wrong Answer")
      score -= 5;
    }

    this.setState({
      score
    })
  }

  render() {
    return (
      <div>
        <div className="score-container ">
          <p>Score: {this.state.score}</p>
        </div>
        <div className="card-container">
          {this.state.cards.map((card, i) => (
            <Card
              key={card.id}
              index={i}
              id={card.id}
              text={card.text}
              moveCard={this.moveCard}
            />

          ))}
          <input
            type="submit"
            className="btn btn-success"
            onClick={() =>{
                if (this.checkAnswer(this.state.cards)) {
                  this.renderScore(true);
                } else {
                  this.renderScore(false);
                }
              }
            }
          />
        </div>
      </div>

    )
  }
}
