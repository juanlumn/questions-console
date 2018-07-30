import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';

class EditQuestionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionId: this.props.questionId,
      question: this.props.question,
      answers: this.props.answers,
      answer1: this.props.answer1,
      answer2: this.props.answer2,
      answer3: this.props.answer3,
      answer4: this.props.answer4,
      answer5: this.props.answer5,
      category: this.props.category,
      correctAnswer: this.props.correctAnswer,
    };

  }

  componentDidMount() {
    const CHECK_BOX_ID = ['answerCheck1', 'answerCheck2', 'answerCheck3', 'answerCheck4', 'answerCheck5'];
    if (this.props.correctAnswer) {
      const CORRECT = this.props.correctAnswer;
      const ANSWERS = this.props.answers;
      let counter = 0;
      let hasAnswer = false;
      _.forEach(ANSWERS, function(answer) {
        if (answer === CORRECT) {
          hasAnswer = true;
        }
        if (!hasAnswer) {
          counter++;
        }
      });
      if (hasAnswer) {
        document.getElementById(CHECK_BOX_ID[counter]).checked = true;
      }
    }
  }

  handleQuestionChange(event) {
    this.setState({question: event.target.value});
  };

  handleAnswer1Change(event) {
    this.setState({answer1: event.target.value});
  };

  handleAnswer2Change(event) {
    this.setState({answer2: event.target.value});
  };

  handleAnswer3Change(event) {
    this.setState({answer3: event.target.value});
  };

  handleAnswer4Change(event) {
    this.setState({answer4: event.target.value});
  };

  handleAnswer5Change(event) {
    this.setState({answer5: event.target.value});
  };

  handleTagChange(event) {
    this.setState({category: event.target.value});
  }

  handleAnswerCorrectChange(event) {
    const CHECK_BOX_ID = ['answerCheck1', 'answerCheck2', 'answerCheck3', 'answerCheck4', 'answerCheck5'];
    if (event.target.checked) {
      this.setState({correctAnswer: event.target.value});
      _.forEach(CHECK_BOX_ID, function(value) {
        if (event.target.id !== value) {
          document.getElementById(value).checked = false;
        }
      });
    } else {
      this.setState({correctAnswer: ''});
    }
  }

  doSave(event) {

    let answers = [];
    answers.push(this.state.answer1);
    answers.push(this.state.answer2);
    answers.push(this.state.answer3);
    answers.push(this.state.answer4);
    answers.push(this.state.answer5);

    let question = {};
    question.answered = true;
    question.category = this.state.category;
    question.answers = answers;
    question.correctAnswer = answers[this.state.correctAnswer];
    question.question = this.state.question;
    question.questionID = this.state.questionId;

    if (question.question === '') {
      window.alert('La pregunta no puede estar vacía. Por favor introduce una pregunta.');
    } else if (this.state.answer1 === '' && this.state.answer2 === '' && this.state.answer3 === '' && this.state.answer4 === '' && this.state.answer5 === '') {
      window.alert('Por favor introduce al menos 2 respuestas.');
    } else if (question.correctAnswer === '' || typeof question.correctAnswer === 'undefined') {
      window.alert('Por favor selecciona la respuesta correcta.');
    } else if (question.category === '') {
      window.alert('Por favor selecciona una categoría');
    } else {
      axios.post('http://192.168.1.138:1111/editQuestion', question).then((response) => {
       this.props.cancelAndReload();
     }).catch((error)=>{
       window.alert('Error al editar la pregunta, intentalo de nuevo');
     });
    }
  }

  render() {
    return (
      <div className='container'>
        <div className="form-group">
          <div className='row'>
            <div className='col-10'>
              <label htmlFor="question">Pregunta:</label>
              <textarea
                className="form-control"
                rows="5"
                id="question"
                value={this.state.question}
                onChange={this.handleQuestionChange.bind(this)}>
              </textarea>
            </div>
          </div>
          <div className='row main-row'>
            <div className='col-10'>
              <label htmlFor="answer1">Respuesta 1:</label>
              <textarea
                className="form-control"
                rows="2"
                id="answer1"
                value={this.state.answer1}
                onChange={this.handleAnswer1Change.bind(this)}>
              </textarea>
            </div>
            <div className='col-2 col-checkbox'>
              <input type="checkbox" className="form-check-input" id="answerCheck1" value='0' onClick={this.handleAnswerCorrectChange.bind(this)}></input>
              <label className="form-check-label" htmlFor="answerCheck1">Respuesta correcta</label>
            </div>
          </div>
          <div className='row main-row'>
            <div className='col-10'>
              <label htmlFor="answer2">Respuesta 2:</label>
              <textarea
                className="form-control"
                rows="2"
                id="answer2"
                value={this.state.answer2}
                onChange={this.handleAnswer2Change.bind(this)}>
              </textarea>
            </div>
            <div className='col-2 col-checkbox'>
              <input type="checkbox" className="form-check-input" id="answerCheck2" value='1' onClick={this.handleAnswerCorrectChange.bind(this)}></input>
              <label className="form-check-label" htmlFor="answerCheck2">Respuesta correcta</label>
            </div>
          </div>
          <div className='row main-row'>
            <div className='col-10'>
              <label htmlFor="answer3">Respuesta 3:</label>
              <textarea
                className="form-control"
                rows="2"
                id="answer3"
                value={this.state.answer3}
                onChange={this.handleAnswer3Change.bind(this)}>
              </textarea>
            </div>
            <div className='col-2 col-checkbox'>
              <input type="checkbox" className="form-check-input" id="answerCheck3" value='2' onClick={this.handleAnswerCorrectChange.bind(this)}></input>
              <label className="form-check-label" htmlFor="answerCheck3">Respuesta correcta</label>
            </div>
          </div>
          <div className='row main-row'>
            <div className='col-10'>
              <label htmlFor="answer4">Respuesta 4:</label>
              <textarea
                className="form-control"
                rows="2"
                id="answer4"
                value={this.state.answer4}
                onChange={this.handleAnswer4Change.bind(this)}>
              </textarea>
            </div>
            <div className='col-2 col-checkbox'>
              <input type="checkbox" className="form-check-input" id="answerCheck4" value='3' onClick={this.handleAnswerCorrectChange.bind(this)}></input>
              <label className="form-check-label" htmlFor="answerCheck4">Respuesta correcta</label>
            </div>
          </div>
          <div className='row main-row'>
            <div className='col-10'>
              <label htmlFor="answer5">Respuesta 5:</label>
              <textarea
                className="form-control"
                rows="2"
                id="answer5"
                value={this.state.answer5}
                onChange={this.handleAnswer5Change.bind(this)}>
              </textarea>
            </div>
            <div className='col-2 col-checkbox'>
              <input type="checkbox" className="form-check-input" id="answerCheck5" value='4' onClick={this.handleAnswerCorrectChange.bind(this)}></input>
              <label className="form-check-label" htmlFor="answerCheck5">Respuesta correcta</label>
            </div>
          </div>
          <div className='row main-row'>
            <div className='col-10'>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">Categoría</label>
                </div>
                <select className="custom-select" id="inputGroupSelect01" onChange={this.handleTagChange.bind(this)}>
                  <option defaultValue>Elige una categoría</option>
                  <option value="Médico Quirúrgica">Médico Quirúrgica</option>
                  <option value="Investigación">Investigación</option>
                  <option value="Legislación">Legislación</option>
                  <option value="Gestión">Gestión</option>
                  <option value="Salud Mental y Psicosocial">Salud Mental y Psicosocial</option>
                  <option value="Fundamentos de enfermería">Fundamentos de enfermería</option>
                  <option value="Etapas de la vida">Etapas de la vida</option>
                </select>
              </div>
            </div>
          </div>
          <div className='row main-row'>
            <div className='col-6'>
              <button type="button" className="btn btn-success" onClick={this.doSave.bind(this)}>Guardar</button>
            </div>
            <div className='col-6'>
              <button type="button" className="btn btn-danger" onClick={this.props.cancel}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EditQuestionForm;
