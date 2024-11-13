import { useEffect, useState } from "react";
import questionData from "../Components/Question";  

export default function Start() {
  const [questions, setQuestions] = useState(false);   
  const [select, setSelect] = useState("");  
  const [next, setNext] = useState(0);   
  const [score, setScore] = useState(0);   
  const [selectedAnswer, setSelectedAnswer] = useState(null);   
  const [result, setResult] = useState(false);  
  const [time, setTime] = useState(60);   

  
  function START() {
    setTime(60);
    setQuestions(true);
    if (questionData.length > 0) {
      console.log("الاختبار بدأ!");
    } else {
      console.log("لا توجد أسئلة.");
    }
  
  }
 
    useEffect(()=>{
      if(questions===true){
        const interval = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    })
    
    useEffect(() => {
      if (time === 0) {
        setResult(true);
      }
    }, [time]);
  
  function ANSWER(option, correctAnswer) {
    setSelectedAnswer(option);  
    setSelect(option);
    if (option === correctAnswer) {
      console.log("إجابة صحيحة!");
      setScore((prevScore) => prevScore + 1);   
    } else {
      console.log("إجابة خاطئة.");
    }

    
    if (next === questionData.length - 1) {
      setResult(true);  
    }
  }

   
  function NEXT() {
    if (next < questionData.length - 1) {
      setNext(next + 1);   
      setSelectedAnswer(null);   
    }
  }

   
  function REVERSE() {
    if (next > 0) {
      setNext(next - 1);   
      setSelectedAnswer(null);   
    }
  }
  
  return (
    <div>
       
      <div hidden={result}>
        <button onClick={START} hidden={questions}>
          ابدأ الاختبار
        </button>

         {time > 0 && (
          <div> 
            <h1>الوقت المتبقي: {time}</h1>
          </div>
         )}
        {questions && next < questionData.length && (
          <div>
            <h1>{questionData[next].question}</h1>
            {questionData[next].options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                onClick={() => ANSWER(option, questionData[next].correctAnswer)}
                style={{
                  backgroundColor: selectedAnswer === option ? 'lightblue' : '',   
                  fontWeight: selectedAnswer === option ? 'bold' : ''   
                }}
              >
                {option}
              </button>
            ))}

           <div className="buttons">
            {next < questionData.length - 1 && (
              <button onClick={NEXT} className="next">التالي</button>  
            )}

             
            <button onClick={REVERSE} className="reverse">رجوع</button>
          </div>
          </div>
        )}
      </div>

      
      {result && (
        <div className="result">
          <h2>انتهى الاختبار!</h2>
          <h3>نتيجتك: {score} من {questionData.length}</h3>
        </div>
      )}
    </div>
  );
}
