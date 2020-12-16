import React from 'react';
import './Question.scss';
import right from '../../assets/right.wav';
import wrong from '../../assets/wrong.wav'


function Question({renderProps,nextQuestion ,isRight, isWrong, wrongFalse, rightFalse, wrongTrue, rightTrue, addPoint, questions}) {
    let currQ = Number(renderProps.match.params.questionId)
    let nextQ = String(currQ + 1)
    
    const handleTrue = ()=> {
        if(questions[currQ].correct_answer==='True'){
            isRight('rightTrue')
            addPoint()
            let audio = new Audio(right);
            audio.play();
            if(currQ === 9){
                return setTimeout(()=>{renderProps.history.push('/results'); nextQuestion()},2000)
            } else {
                return setTimeout(()=>{renderProps.history.push('/question/'+ nextQ); nextQuestion()},2000)
            }
        }
        if(currQ === 9){
            isWrong('wrongTrue')
            isRight('rightFalse')
            let audio = new Audio(wrong);
            audio.play();
            return setTimeout(()=>{renderProps.history.push('/results'); nextQuestion()},2000)

        } else {
            isWrong('wrongTrue')
            isRight('rightFalse')
            let audio = new Audio(wrong);
            audio.play();
            return setTimeout(()=>{renderProps.history.push('/question/'+ nextQ); nextQuestion()},2000)

        }

    }

    const handleFalse = ()=> {
        if(questions[currQ].correct_answer==='False'){
            isRight('rightFalse')
            let audio = new Audio(right);
            audio.play();
            addPoint()
            if(currQ === 9){
                return setTimeout(()=>{renderProps.history.push('/results'); nextQuestion()},2000)

            } else {
                return setTimeout(()=>{renderProps.history.push('/question/'+ nextQ); nextQuestion()},2000)

            }
        }
        if(currQ === 9){
            isWrong('wrongFalse')
            isRight('rightTrue')
            let audio = new Audio(wrong);
            audio.play();
            return setTimeout(()=>{renderProps.history.push('/results'); nextQuestion()},2000)

        } else {
            isWrong('wrongFalse')
            isRight('rightTrue')
            let audio = new Audio(wrong);
            audio.play();
            return setTimeout(()=>{renderProps.history.push('/question/'+ nextQ); nextQuestion()},2000)

        }
    }

    const regex = /&quot;/gi;
    const regex2 = /&#039;/gi;
    const regex3 = /&ocirc;/gi;
    const regex4 = /\$/gi;
    const regex5 = /\./gi;
    const regex6 = /-/gi;
    const regex7 = /:/gi;
    const regex8 = /\*/gi;
    const regex9 = /&Aring;/gi
    
    return (
        <>
            <section className="questions">
                <div className="questions_container">
                    <p className='questions_number'>{currQ +1} of 10</p>
                    <p className="questions_question">{questions[currQ].question.replace(regex, '').replace(regex2, "").replace(regex3, '').replace(regex4,'').replace(regex5, '').replace(/\,/gi, '').replace(regex6, ' ').replace(regex7,'').replace(regex8,'').replace(/&ldquo;/gi,'').replace(/&rdquo;/gi,'').replace(/\(/gi,'').replace(/\)/gi,'').replace(/!/gi,'').replace(/\//gi,'').replace(regex9, 'A')}</p>
                </div> 
                <button className={`questions_true ${rightTrue} ${wrongTrue}`} onClick={()=>handleTrue()}>TRUE</button>
                <button className={`questions_true ${rightFalse} ${wrongFalse}`} onClick={()=>handleFalse()}>FALSE</button>
            </section>   
        </>
    );
}

export default Question;