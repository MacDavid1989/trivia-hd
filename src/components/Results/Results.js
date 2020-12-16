import React, {Component} from 'react';
import './Results.scss';
import ohboy from '../../assets/oh-boy.wav'
import goodjob from '../../assets/good-job.mp3'
import greatjob from '../../assets/great-job.wav'
import star from '../../assets/3DSegmentedStarYellow.svg'
import diamond from '../../assets/diamondbleu.svg' 
import poo from '../../assets/emojipoo.svg'

class Results extends Component {
    handlePlayAgain = () => {
        this.props.renderProps.history.push('/')
    }

    componentDidMount(){
        if(this.props.finalScore === 10){
        let audio = new Audio(greatjob);
        audio.play();}
        else if(this.props.finalScore >= 5){
        let audio = new Audio(goodjob);
        audio.play();}
        else{
        let audio = new Audio(ohboy);
        audio.play();
        }
    }

    render(){
    return (
        <>
            <section className="results">
                <h1 className="results_title"> YOU SCORED</h1>
                <div className='results_emoji'>
                {this.props.finalScore === 10 ? <img src={diamond} alt=""/> 
                : this.props.finalScore >= 5 ? <img src={star} alt=""/>  
                :  <img src={poo} alt=""/>}
                </div>
                <div className="results_container">
                <p className="results_score">{`${this.props.finalScore} out of 10`}</p>
                </div>
                <div className='results_comments'>
                {this.props.finalScore === 10 ? <p> <img src={diamond} alt=""/> Unbelievable <img src={diamond} alt=""/>  <br/> Are you already a Dev?</p> 
                : this.props.finalScore >= 5 ? <p><img src={star} alt=""/> Good Job <img src={star} alt=""/>  <br/> You might get a career in Web Dev!</p> 
                :  <p><img src={poo} alt=""/> Oh boy <img src={poo} alt=""/><br/> Keep practing, Devs never quit!</p>}
                </div>
                
                <button className="results_button" onClick={this.handlePlayAgain}>PLAY AGAIN</button>
            </section>   
        </>
    );
    }
}

export default Results;