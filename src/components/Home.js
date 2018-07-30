import React from 'react'
import Card from './Card'

const Home = () => (
  <div className='container'>
    <div className='row'>
      <div className='col'>
        <Card title = "Todas las preguntas"
              description = "Acceso a una lista con todas las preguntas."
              link = "/all-questions"
              linkText = "Empezar" />
      </div>
      <div className='col'>
        <Card title = "Preguntas falladas"
              description = "Acceso a una lista con todas las preguntas falladas."
              link = "/non-anwered-questions"
              linkText = "Empezar" />
      </div>
    </div>
    <div className='row main-row'>
      <div className='col'>
        <Card title = "Crear pregunta"
              description = "Acceso al formulario para crear una nueva pregunta."
              link = "/create-question"
              linkText = "Crear pregunta" />
      </div>
      <div className='col'>
        <Card title = "Estadísticas"
              description = "Página con estadísticas acerca de tu evolución."
              link = "/statistics"
              linkText = "Ver estadísticas" />
      </div>
    </div>
    <div className='row main-row'>
      <div className='col'>
        <Card title = "Editar preguntas"
              description = "Acceso a la lista de preguntas para poder editarlas."
              link = "/edit-questions"
              linkText = "Editar preguntas" />
      </div>
    </div>
  </div>
)

export default Home
