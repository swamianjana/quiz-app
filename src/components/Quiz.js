import React, { useState } from 'react'
import { QuizData } from '../Data/QuizData'
import QuizResult from './QuizResult';

function Quiz() {
    const [currentQuestion,setCurrentQuestion]=useState(0);
    const [score,setScore] = useState(0);                   // option click ho
    const [clickedOption,setClickedOption]=useState(0);
    const [showResult,setShowResult]=useState(false);           // result show krna h ya nhi show krna
    
    const changeQuestion = ()=>{                            // next pe click krte hi next question aa jae 
        updateScore();                  // update score ko call kr deya hmne
        if(currentQuestion< QuizData.length-1){             // question ktm hote hi blank show nhi hoga last question pr hi screen ruk jaegi
            setCurrentQuestion(currentQuestion+1);
            setClickedOption(0);                // update krke unchecked show krvana h
        }else{
            setShowResult(true)
        }
    }
    const updateScore=()=>{                     // this code is used to show ki hmne jo option select kiya h vo right h ya nhi, i update the score
        if(clickedOption===QuizData[currentQuestion].answer){
            setScore(score+1);
        }
    }
    const resetAll=()=>{
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
    }
  return (
    <div>
        <p className="heading-txt">Quiz APP</p>
        <div className="container">
            {showResult ? (
                <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll}/>
            ):(
            <>
            <div className="question">
                <span id="question-number">{currentQuestion+1}. </span>
                <span id="question-txt">{QuizData[currentQuestion].question}</span>
            </div>
            <div className="option-container">    
                                                          {/* make buttons  */}
                {QuizData[currentQuestion].options.map((option,i)=>{                
                    return(
                        <button 
                        // className="option-btn"
                        className={`option-btn ${
                            clickedOption == i+1?"checked":null             // clickoption ki ye condition true hogi to 'checked' hogi otherwise null, button pe jo click
                            // h agr vo index k brabr h to checked hoga
                        }`}
                        key={i}
                        onClick={()=>setClickedOption(i+1)}             // option click ho jae
                        >
                        {option}
                        </button>
                    )
                })}                
            </div>
            <input type="button" value="Next" id="next-button" onClick={changeQuestion}/>
            </>)}
        </div>
    </div>
  )
}

export default Quiz