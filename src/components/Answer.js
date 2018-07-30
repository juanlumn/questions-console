import React, {Component} from 'react';
import axios from 'axios';

class Answer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.counter,
      questionId: this.props.questionId,
      question: this.props.question,
      answers: this.props.answers,
      category: this.props.category,
      correctAnswer: this.props.correctAnswer,
      answered: this.props.answered,
      realtimeAnswered: false,
      realtimeAnswer: '',
      correct: false,
      incorrect:false,
    };
  }

  answerClicked(answer) {

    let question = {};
    question.questionID = this.state.questionId;
    question.category= this.state.category;
    question.answers= this.state.answers;
    question.correctAnswer= this.state.correctAnswer;
    question.question= this.state.question;

    if (this.state.correctAnswer === answer) {
      question.answered = true;
      this.setState({
        realtimeAnswer: answer,
        realtimeAnswered: true,
        correct: true,
        incorrect:false,
      });
    } else {
      question.answered = false;
      this.setState({
        realtimeAnswer: answer,
        realtimeAnswered: true,
        correct: false,
        incorrect:true,
      });
    }

    axios.post('http://192.168.1.138:1111/answerQuestion', question).then(
      this.setState({openSavedDialog: true})
    );

  };

  render() {
    const answersPrefix = ['a.', 'b.', 'c.', 'd.', 'e.'];
    let counter = -1;
    return (
      <div className="card" key={`${counter}-${this.state.question}`}>
        <div className="panel panel-primary">
          <div className="panel-heading">{`${this.state.counter}. ${this.state.question}`}</div>
          <ul className="list-group">
            {
              this.state.answers.map((answer) => {
                if (answer !== '') {
                  counter++;
                  return (
                    <li className={`list-group-item answered-${this.state.realtimeAnswered} ` + (this.state.realtimeAnswer === answer ? `correct-${this.state.correct} incorrect-${this.state.incorrect}` : '') }
                        key={`${counter}-${answer}`}
                        value={answer}
                        onClick={() => this.answerClicked(answer)}>
                          {`${answersPrefix[counter]} ${answer}`}
                        </li>
                   )
                }
              })
            }
          </ul>
        </div>
      </div>
    );
  }
};

export default Answer;
