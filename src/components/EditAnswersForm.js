import React, {Component} from 'react';
import axios from 'axios';
import Answer from './Answer'
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import EditQuestionForm from './EditQuestionForm'

class AnswersForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      answer: [],
      answersArray: {},
      openDeleteDialog: false,
      openEditDialog: false,
      questionToDelete: ''
    };
  }

  componentDidMount() {
    axios.get('http://192.168.1.138:1111/getAllQuestions')
    .then((result)=> {
      this.setState({
        answers: result.data
      });
    })
  }

  handleCloseDeleteDialog = () => this.setState({openDeleteDialog: false,});

  cancel = () => this.setState({openEditDialog: false,});

  cancelAndReload = () => window.location.href = '/edit-questions';

  doEdit(event) {
    console.log(event.target.value);
  };

  doDelete(questionId) {
    axios.get('http://192.168.1.138:1111/deleteQuestion?questionID=' + questionId).then(
      window.location.href = '/edit-questions'
    );
  };

  render() {
    const answers = this.state.answers;
    let counter = 0;
    let deleteDialogActions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.handleCloseDeleteDialog}
      />,
      <FlatButton
        label="Borrar pregunta"
        primary={true}
        onClick={() => this.doDelete(this.state.questionToDelete)}
      />,
    ];
    if (answers.length > 0) {
      return (
            <div className='container'>
              <Dialog
                title="Atención"
                actions={deleteDialogActions}
                modal={false}
                open={this.state.openDeleteDialog}
                onRequestClose={this.handleCloseDeleteDialog}
              >
                ¿De verdad quieres borrar esta pregunta?
              </Dialog>
              <Dialog
                title="Editar"
                modal={false}
                open={this.state.openEditDialog}
                onRequestClose={this.handleCloseDeleteDialog}
                autoScrollBodyContent={true}
              >
                <div className='dialog-body'>
                  <EditQuestionForm
                    questionId = {this.state.answer.questionID}
                    question = {this.state.answer.question}
                    answers = {this.state.answersArray ? this.state.answersArray : {}}
                    answer1 = {this.state.answersArray[0] ? this.state.answersArray[0] : ''}
                    answer2 = {this.state.answersArray[1] ? this.state.answersArray[1] : ''}
                    answer3 = {this.state.answersArray[2] ? this.state.answersArray[2] : ''}
                    answer4 = {this.state.answersArray[3] ? this.state.answersArray[3] : ''}
                    answer5 = {this.state.answersArray[4] ? this.state.answersArray[4] : ''}
                    category = {this.state.answer.category}
                    correctAnswer = {this.state.answer.correctAnswer}
                    cancel = {this.cancel.bind(this)}
                    cancelAndReload = {this.cancelAndReload.bind(this)}/>
                </div>
              </Dialog>
              <div className='row'>
                <div className='col-12'>
                  <h1>Editar preguntas</h1>
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
                           <div className='row main-row'>
                             <div className='col-6'>
                               <button type="button" className="btn btn-success" onClick={() => this.setState({openEditDialog: true, answer: answer, answersArray: answer.answers})}>Editar</button>
                             </div>
                             <div className='col-6'>
                               <button type="button" className="btn btn-danger" onClick={() => this.setState({openDeleteDialog: true, questionToDelete:answer.questionID})}>Borrar</button>
                             </div>
                           </div>
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
                  <h1>Editar preguntas</h1>
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
