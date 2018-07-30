import React, {Component} from 'react';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
import {PieChart, Pie, Legend, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Bar, ReferenceLine, Brush, LineChart, Line} from 'recharts';

class StatisticsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {statistics: {}};
  }

  componentDidMount() {
    axios.get('http://192.168.1.138:1111/getStatistics')
    .then((result)=> {
      if (result.data.length > 0) {
        this.basicFilterStatistics(result.data);
        this.setState({
          statistics: result.data
        });
        axios.get('http://192.168.1.138:1111/getNumberOfQuestions')
        .then((result)=> {
          this.setState({
            totalQuestions: result.data
          });
        })
      }
    })
  }

  basicFilterStatistics(statistics) {
    let answered = [];
    let failed = [];
    statistics.map((statistic) => {
      if (statistic.answered) {
        answered.push(statistic);
      } else {
        failed.push(statistic);
      }
    })

    let answeredMap = new Map();
    answeredMap = answered.reduce(function (acc, curr, index, arr) {
      if (typeof acc[curr.category] == 'undefined') {
        acc[curr.category] = 1;
      } else {
        acc[curr.category] += 1;
      }
      return acc;
    }, {});

    let failedMap = new Map();
    failedMap = failed.reduce(function (acc, curr, index, arr) {
      if (typeof acc[curr.category] == 'undefined') {
        acc[curr.category] = 1;
      } else {
        acc[curr.category] += 1;
      }
      return acc;
    }, {});

    let answeredMapDates = new Map();
    answeredMapDates = answered.reduce(function (acc, curr, index, arr) {
      if (typeof acc[curr.date] == 'undefined') {
        acc[curr.date] = [];
      }
      acc[curr.date].push(curr);
      return acc;
    }, {});

    let failedMapDates = new Map();
    failedMapDates = failed.reduce(function (acc, curr, index, arr) {
      if (typeof acc[curr.date] == 'undefined') {
        acc[curr.date] = [];
      }
      acc[curr.date].push(curr);
      return acc;
    }, {});

    let dataforLineChart = [];
    Object.keys(answeredMapDates).forEach(function(answerkey) {
      let correct = 0;
      let failed = 0;
      if (answeredMapDates[answerkey].length != undefined) {
        correct = answeredMapDates[answerkey].length;
      }

      Object.keys(failedMapDates).forEach( function(failedkey) {
        if (answerkey === failedkey) {
          if (failedMapDates[failedkey].length != undefined) {
            failed = failedMapDates[failedkey].length;
          }
        }
      });
      var obj = {
        name: answerkey,
        correct,
        failed
      };
      dataforLineChart.push(obj);
    })

    let answeredTags = new Map();
    var keys = Object.keys(answeredMapDates);
    keys.forEach( function(item) {
      let auxMap = new Map();
      auxMap = answeredMapDates[item].reduce(function (acc, curr, index, arr) {
        if (typeof acc[curr.category] == 'undefined') {
          acc[curr.category] = 1;
        } else {
          acc[curr.category] += 1;
        }
        return acc;
      }, {});
      answeredTags[item] = auxMap;
    })

    let failedTags = new Map();
    keys = Object.keys(failedMapDates);
    keys.forEach( function(item) {
      let auxMap = new Map();
      auxMap = failedMapDates[item].reduce(function (acc, curr, index, arr) {
        if (typeof acc[curr.category] == 'undefined') {
          acc[curr.category] = 1;
        } else {
          acc[curr.category] += 1;
        }
        return acc;
      }, {});
      failedTags[item] = auxMap;
    })

    let answeredkeys = Object.keys(answeredTags);
    let failedkeys = Object.keys(failedTags);

    let medicoQururjicaAnsweredData = this.populateBarChar("Médico Quirúrgica", answeredTags, failedTags, answeredkeys, failedkeys);
    let investigacionAnsweredData = this.populateBarChar("Investigación", answeredTags, failedTags, answeredkeys, failedkeys);
    let legislacionAnsweredData = this.populateBarChar("Legislación", answeredTags, failedTags, answeredkeys, failedkeys);
    let gestionAnsweredData = this.populateBarChar("Gestión", answeredTags, failedTags, answeredkeys, failedkeys);
    let saludMentalAnsweredData = this.populateBarChar("Salud Mental y Psicosocial", answeredTags, failedTags, answeredkeys, failedkeys);
    let fundamentosAnsweredData = this.populateBarChar("Fundamentos de enfermería", answeredTags, failedTags, answeredkeys, failedkeys);
    let etapasAnsweredData = this.populateBarChar("Etapas de la vida", answeredTags, failedTags, answeredkeys, failedkeys);

    let answeredData = [];
    keys = Object.keys(answeredMap);
    keys.forEach( function(key) {
      var obj = {
        name: key,
        value: Math.round(answeredMap[key]/answered.length*100)
      };
      answeredData.push(obj);
    })

    let failedData = [];
    keys = Object.keys(failedMap);
    keys.forEach( function(key) {
      var obj = {
        name: key,
        value: Math.round(failedMap[key]/failed.length*100)
      };
      failedData.push(obj);
    })

    this.setState({
      answered,
      failed,
      answeredMap,
      failedMap,
      answeredData,
      failedData,
      answeredMapDates,
      failedMapDates,
      answeredTags,
      failedTags,
      medicoQururjicaAnsweredData,
      investigacionAnsweredData,
      legislacionAnsweredData,
      gestionAnsweredData,
      saludMentalAnsweredData,
      fundamentosAnsweredData,
      etapasAnsweredData,
      dataforLineChart
    });
  }

  //Method to populate bar char by tag
  populateBarChar(tag, answeredTags, failedTags, answeredkeys, failedkeys) {
    let objectToPopulate = [];
    answeredkeys.forEach(function(answerkey) {
      let correct = 0;
      let failed = 0;
      if (answeredTags[answerkey][tag] != undefined) {
        correct = answeredTags[answerkey][tag];
      }

      failedkeys.forEach( function(failedkey) {
        if (answerkey === failedkey) {
          if (failedTags[failedkey][tag] != undefined) {
            failed = failedTags[failedkey][tag];
          }
        }
      });
      var obj = {
        name: answerkey,
        correct,
        failed
      };
      objectToPopulate.push(obj);
    })
    let myvar = this.foo;
    console.log(myvar);
    return objectToPopulate;
  }


"^([a-z]{1,6}$)[_]{0,1}[0-9]{0,4}+@hackerrank.com$";

 foo() {
   return 5;
 }

  render() {
    const windowWidth = window.screen.availWidth;
    const statistics = this.state.statistics;
    if (statistics.length > 0) {
      return (
            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <h1>Estadísticas</h1>
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  <h3>Total falladas en %</h3>
                  <PieChart width={800} height={400}>
                    <Pie isAnimationActive={true} data={this.state.failedData} cx={100} cy={100} innerRadius={40} outerRadius={80} fill="#FF5733"/>
                    <Tooltip/>
                 </PieChart>
                </div>
                <div className='col-6'>
                  <h3>Total acertadas en %</h3>
                  <PieChart width={800} height={400}>
                    <Pie isAnimationActive={true} data={this.state.answeredData} cx={100} cy={100} outerRadius={80} fill="#33FF3C"/>
                    <Tooltip/>
                 </PieChart>
                </div>
              </div>
              <div className='row'>
                <div className='col-12' style={{marginTop: '-150px'}}>
                  <h3>Evolutivo acertadas/falladas</h3>
                  <LineChart width={1200} height={300} data={this.state.dataforLineChart} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <Tooltip/>
                   <Legend />
                   <Line type="monotone" dataKey="correct" stroke="#33FF3C" activeDot={{r: 8}}/>
                   <Line type="monotone" dataKey="failed" stroke="#FF5733" />
                  </LineChart>
                </div>
              </div>
              <div className='row'>
                <div className='col-12' style={{marginTop: '50px'}}>
                  <h3>Categoría Médico Quirúrgica</h3>
                  <BarChart width={1200} height={300} data={this.state.medicoQururjicaAnsweredData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                   <ReferenceLine y={0} stroke='#000'/>
                   <Brush dataKey='name' height={30} stroke="#8884d8"/>
                   <Bar dataKey="correct" fill="#33FF3C" />
                   <Bar dataKey="failed" fill="#FF5733" />
                  </BarChart>
                </div>
              </div>
              <div className='row'>
                <div className='col-12' style={{marginTop: '50px'}}>
                  <h3>Categoría Investigación</h3>
                  <BarChart width={1200} height={300} data={this.state.investigacionAnsweredData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                   <ReferenceLine y={0} stroke='#000'/>
                   <Brush dataKey='name' height={30} stroke="#8884d8"/>
                   <Bar dataKey="correct" fill="#33FF3C" />
                   <Bar dataKey="failed" fill="#FF5733" />
                  </BarChart>
                </div>
              </div>
              <div className='row'>
                <div className='col-12' style={{marginTop: '50px'}}>
                  <h3>Categoría Legislación</h3>
                  <BarChart width={1200} height={300} data={this.state.legislacionAnsweredData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                   <ReferenceLine y={0} stroke='#000'/>
                   <Brush dataKey='name' height={30} stroke="#8884d8"/>
                   <Bar dataKey="correct" fill="#33FF3C" />
                   <Bar dataKey="failed" fill="#FF5733" />
                  </BarChart>
                </div>
              </div>
              <div className='row'>
                <div className='col-12' style={{marginTop: '50px'}}>
                  <h3>Categoría Gestión</h3>
                  <BarChart width={1200} height={300} data={this.state.gestionAnsweredData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                   <ReferenceLine y={0} stroke='#000'/>
                   <Brush dataKey='name' height={30} stroke="#8884d8"/>
                   <Bar dataKey="correct" fill="#33FF3C" />
                   <Bar dataKey="failed" fill="#FF5733" />
                  </BarChart>
                </div>
              </div>
              <div className='row'>
                <div className='col-12' style={{marginTop: '50px'}}>
                  <h3>Categoría Salud Mental y Psicosocial</h3>
                  <BarChart width={1200} height={300} data={this.state.saludMentalAnsweredData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                   <ReferenceLine y={0} stroke='#000'/>
                   <Brush dataKey='name' height={30} stroke="#8884d8"/>
                   <Bar dataKey="correct" fill="#33FF3C" />
                   <Bar dataKey="failed" fill="#FF5733" />
                  </BarChart>
                </div>
              </div>
              <div className='row'>
                <div className='col-12' style={{marginTop: '50px'}}>
                  <h3>Categoría Fundamentos de enfermería</h3>
                  <BarChart width={1200} height={300} data={this.state.fundamentosAnsweredData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                   <ReferenceLine y={0} stroke='#000'/>
                   <Brush dataKey='name' height={30} stroke="#8884d8"/>
                   <Bar dataKey="correct" fill="#33FF3C" />
                   <Bar dataKey="failed" fill="#FF5733" />
                  </BarChart>
                </div>
              </div>
              <div className='row'>
                <div className='col-12' style={{marginTop: '50px'}}>
                  <h3>Categoría Etapas de la vida</h3>
                  <BarChart width={1200} height={300} data={this.state.etapasAnsweredData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                   <ReferenceLine y={0} stroke='#000'/>
                   <Brush dataKey='name' height={30} stroke="#8884d8"/>
                   <Bar dataKey="correct" fill="#33FF3C" />
                   <Bar dataKey="failed" fill="#FF5733" />
                  </BarChart>
                </div>
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
                  <h1>Estadísticas</h1>
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

export default StatisticsPage;
