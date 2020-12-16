import React from 'react';
import './Play.scss';
import controlpic from '../../assets/gummy-super-nintendo-gamepad.svg';
import start from '../../assets/start-the-quiz.wav'

function Play({renderProps, handleRevert, handleSize, size, categories, handleCatSelect}) {
    const filteredCategories = categories.filter(category => category.id !== 10 && 
        category.id !== 13 && category.id !== 16 && category.id !== 25 && category.id !== 26 && category.id !== 29 && category.id !== 30)

    const formSubmit=(e)=>{
        e.preventDefault()
        
        handleCatSelect(e.target.choose.value, renderProps.history)
    }
    const and=/&/gi
    const colon=/:/gi

    const sizeChange=()=>{
        handleSize()
    }

    const sizeRevert=()=>{
        handleRevert()
        let audio = new Audio(start);
        audio.play();
    }

    return (
        <>
        <section className="home">
            <h1 className="home_logo">TRIVIA HD</h1> 
            <img className="controlpic" src={controlpic} alt="" />
            <form className="form" onSubmit={(e)=>formSubmit(e)}>
                <div className='form_div'>
                <label className="form_label" htmlFor="categories">CHOOSE A CATEGORY</label>
                
                    <select required onChange={()=>sizeRevert()} onMouseDown={()=>sizeChange()} size={size} id="categories" name="choose">
                    {filteredCategories.map((category) => 
                        <option className='option' id={category.id} key={category.id} value={category.id}>{category.name.replace(colon,'').replace(and,'')}</option>
                    )}
                    </select>
        
                </div>
                <button className="form_button" type="submit">PLAY</button>
            </form>
        </section>   
        </>
    );
}

export default Play;