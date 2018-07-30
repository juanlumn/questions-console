import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class QuestionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      category: '',
      correctAnswer: '',
      openSavedDialog: false,
      openCancelDialog: false,
      errors: {
        question: false,
        correctAnswer: false,
        category: false,
        answers: false
      }
    };
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

    if (question.question === '') {
      window.alert('La pregunta no puede estar vacía. Por favor introduce una pregunta.');
    } else if (this.state.answer1 === '' && this.state.answer2 === '' && this.state.answer3 === '' && this.state.answer4 === '' && this.state.answer5 === '') {
      window.alert('Por favor introduce al menos 2 respuestas.');
    } else if (this.state.answer1 === '' || this.state.answer2 === '') {
      window.alert('Por favor introduce al menos 2 respuestas.');
    } else if (question.correctAnswer === '' || typeof question.correctAnswer === 'undefined') {
      window.alert('Por favor selecciona la respuesta correcta.');
    } else if (question.category === '') {
      window.alert('Por favor selecciona una categoría');
    } else {
      axios.post('http://192.168.1.138:1111/saveQuestion', question).then((response) => {
       this.setState({openSavedDialog: true})
     }).catch((error)=>{
       window.alert('Error al salvar la pregunta, intentalo de nuevo');
     });
    }
  }

  doExit(event) {
    window.location.href = '/';
  }

  handleCloseSaveDialog = () => {
    this.setState({
        question: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
        category: '',
        correctAnswer: '',
        openSavedDialog: false,
        openCancelDialog: false,});

    const CHECK_BOX_ID = ['answerCheck1', 'answerCheck2', 'answerCheck3', 'answerCheck4', 'answerCheck5'];
    _.forEach(CHECK_BOX_ID, function(value) {
      document.getElementById(value).checked = false;
    });

    var mySelect = document.getElementById('inputGroupSelect01');
    mySelect.selectedIndex = 0;
  }

  handleCloseCancelDialog = () => this.setState({openCancelDialog: false,});

  render() {
    const savedDialogActions = [
      <FlatButton
        label="Crear nueva pregunta"
        primary={true}
        onClick={this.handleCloseSaveDialog}
      />,
      <FlatButton
        label="Volver al Menú"
        primary={true}
        onClick={this.doExit}
      />,
    ];
    const exitDialogActions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.handleCloseCancelDialog}
      />,
      <FlatButton
        label="Volver al Menú"
        primary={true}
        onClick={this.doExit}
      />,
    ];
    return (
      <div className='container'>
        <Dialog
          title="Pregunta salvada correctamente"
          actions={savedDialogActions}
          modal={false}
          open={this.state.openSavedDialog}
          onRequestClose={this.handleCloseSaveDialog}
        >
          ¿Deseas crear otra pregunta o volver al menú principal?
        </Dialog>
        <Dialog
          title="¿Volver al menú principal?"
          actions={exitDialogActions}
          modal={false}
          open={this.state.openCancelDialog}
          onRequestClose={this.handleCloseCancelDialog}
        >
          Si vuelves ahora perderás los cambios creados.
        </Dialog>
        <h1>Crear nueva pregunta</h1>
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
              <button type="button" className="btn btn-danger" onClick={() => this.setState({openCancelDialog: true})}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default QuestionForm;
