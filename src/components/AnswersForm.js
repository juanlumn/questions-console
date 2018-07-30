import React, {Component} from 'react';
import axios from 'axios';
import Answer from './Answer'
import CircularProgress from 'material-ui/CircularProgress';

class AnswersForm extends Component {

  constructor(props) {
    super(props);
    this.state = {answers: {}};
  }

  componentDidMount() {
    //axios.get('http://192.168.1.138:1111/getRandomQuestions')
    axios.get('http://192.168.1.138:1111/getRandomQuestions')
    .then((result)=> {
      this.setState({
        answers: result.data
      });
    })
  }

  render() {
    const answers = this.state.answers;
    let counter = 0;
    if (answers.length > 0) {
      return (
            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <h1>Todas las preguntas</h1>
                </div>
              </div>
              <div>
                 {
                   answers.map((answer) => {
                     counter++;
                     return (
                       <div className='row main-row' key={answer.questionID}>
                         <div className='col-12'>
                           <Answer
                             counter = {counter}
                             questionId = {answer.questionID}
                             question = {answer.question}
                             answers = {answer.answers}
                             category = {answer.category}
                             correctAnswer = {answer.correctAnswer}
                             answered = {answer.answered}
                           />
                          </div>
                        </div>
                      )
                   })
                 }
              </div>
                <div className='return'>
                  <button type="button" className="btn btn-success" onClick={() => window.location.href = '/'}>Volver al menú principal</button>
                </div>
            </div>
          );
    } else {
      return (
            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <h1>Todas las preguntas</h1>
                </div>
              </div>
              <div className='row main-row'>
                <div className='col-12'>
                  <CircularProgress size={80} thickness={5} />
                </div>
              </div>
              <div className='return'>
                <button type="button" className="btn btn-success" onClick={() => window.location.href = '/'}>Volver al menú principal</button>
              </div>
            </div>
          );
    }
  }
};

export default AnswersForm;
