import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import QuestionForm from './QuestionForm'
import AnswersForm from './AnswersForm'
import AnswersFailedForm from './AnswersFailedForm'
import EditAnswersForm from './EditAnswersForm'
import StatisticsPage from './StatisticsPage'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/create-question' component={QuestionForm}/>
      <Route path='/all-questions' component={AnswersForm}/>
      <Route path='/non-anwered-questions' component={AnswersFailedForm}/>
      <Route path='/edit-questions' component={EditAnswersForm}/>
      <Route path='/statistics' component={StatisticsPage}/>
    </Switch>
  </main>
)

export default Main
