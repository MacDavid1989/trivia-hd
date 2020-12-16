import Axios from 'axios';
import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Play from './components/Play/Play'
import Question from './components/Question/Question'
import Results from './components/Results/Results'
import theme from './assets/theme.mp3'

class App extends Component {
  state={
    finalScore: 0,
    questions: [],
    categories: [],
    size: 1,
    rightTrue: '',
    wrongTrue: '',
    rightFalse: '',
    wrongFalse: ''
  }

  handleCatSelect=(id, history)=>{
    this.setState({finalScore: 0})
    this.setState({questions: []})
    Axios.get(`https://opentdb.com/api.php?amount=10&category=${id}&type=boolean`)
    
      .then(res => {
        this.setState({questions: res.data.results})
        history.push('/question/0')
      })
  }

  componentDidMount(){
    Axios.get('https://opentdb.com/api_category.php')
    .then(res=> {
      this.setState({categories: res.data.trivia_categories })
    })
  }

  addPoint =()=>{
    this.setState({finalScore: this.state.finalScore + 1})
  }

  handleSize = ()=> {
    this.setState({size: 3})
  }

  handleRevert = ()=> {
    this.setState({size: 1})
  }

  isWrong=(val)=>{
    if(val === 'wrongFalse'){
      this.setState({questions:this.state.questions,wrongFalse: val})
    }else if(val === 'wrongTrue'){
      this.setState({questions:this.state.questions,wrongTrue: val})

    }
  }

  isRight=(val)=>{
    if(val === 'rightFalse'){
      this.setState({questions:this.state.questions,rightFalse: val})
    }else if(val === 'rightTrue'){
      this.setState({questions:this.state.questions,rightTrue: val})

    }
  }

  nextQuestion=()=>{
    this.setState({
      rightTrue: '',
    wrongTrue: '',
    rightFalse: '',
    wrongFalse: ''
    })
  }

  render() {
    return (
      <>
        <Router>
          <audio className="audio-element" autoPlay src={theme}></audio>
          <Switch>
          <Route path='/' exact render={(renderProps)=>
            <Play renderProps={renderProps} handleRevert={this.handleRevert} handleSize={this.handleSize} size={this.state.size} categories={this.state.categories} getCat={this.getCat} handleCatSelect={this.handleCatSelect}/>
            }/>
          <Route path='/question/:questionId' render={(renderProps)=>
            <Question renderProps={renderProps} nextQuestion={this.nextQuestion} isRight={this.isRight} isWrong={this.isWrong} wrongFalse={this.state.wrongFalse} rightFalse={this.state.rightFalse} wrongTrue={this.state.wrongTrue} rightTrue={this.state.rightTrue} addPoint={this.addPoint} questions={this.state.questions}/>
          }/>
          <Route path='/results' render={(renderProps)=>
            <Results renderProps={renderProps} finalScore={this.state.finalScore}/>
          }/>
        </Switch>
        </Router>
      </>
    );
  }
}

export default App;