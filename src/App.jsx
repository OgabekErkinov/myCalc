import { useState } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faC, faDeleteLeft, faDivide, faEquals, faLevelUp, faMinus, faMultiply } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [displayValue, setDisplayValue] = useState('')
  const [block, setBlock] = useState(true)

  const lastIndex = displayValue.length-1
  const lastValue = displayValue[lastIndex] 
  
  const symbolCheck = (el) => {
    if(typeof el === 'string' && el === '/' || el === '*' || el === '+' || el === '-' || el === '.'){
      return true
    }else{
      return false
    }

  }
  const numberCheck = (el) => {
    if(el === '0' || el === '1' || el === '2' || el === '3' || el === '4' || el === '5' ||
    el === '6' || el === '7' || el === '8' || el === '9'){
      return true
    }else{
      return false
    }

  }

  const handleClick = (param) => {

    displayValue.length < 1 ? 
                 symbolCheck(param) ? setDisplayValue((prev) => prev) : setDisplayValue((prev) => prev += param) : 
                 symbolCheck(lastValue) && symbolCheck(param) ? setDisplayValue((prev) => prev) : setDisplayValue((prev) => prev += param)
    // symbolCheck(param) && (displayValue.length < 1 || symbolCheck(lastValue)) ? setDisplayValue((prev) => prev)
    // : setDisplayValue((prev)=> prev += param)
  }

  const handleScope = () => {

    if(block){
      if(numberCheck(lastValue)){
        setDisplayValue((prev) => prev)
      }
      if(lastValue === ')'){
        setDisplayValue((prev) => prev)
      }
      else{
        if(lastValue === '('){
          setDisplayValue((prev) => prev)
        }else{
          setDisplayValue((prev) => prev += '(')
        setBlock((prev) => !prev)

        }
        
      }

        
    }else{
      if(!numberCheck(lastValue)){
        setDisplayValue((prev) => prev)
      }else{
        setDisplayValue((prev) => prev += ')')
        setBlock((prev) => !prev)
      }
    }

    
  }

  const handleEqual = () => {
    symbolCheck(lastValue) || lastValue === '(' ?
    setDisplayValue(eval(displayValue.slice(0, displayValue.length-1))) : setDisplayValue(eval(displayValue))
    setBlock(true)
  }

  const handleDegree = () => {
    lastValue === '*' ? setDisplayValue((prev) => prev) : setDisplayValue((prev) => prev += '**')
  }

  const handlePoint = () => {
    displayValue.includes('.') || 
                 symbolCheck(lastValue) ||
                      lastValue === ')' ||
                      lastValue === '(' ? 
                                  setDisplayValue((prev) => prev) : 
                                  setDisplayValue((prev) => prev += '.')


   }

  return (
    <>
    <div className="container">
      <div className="display">{displayValue}</div>
      <div className="row">
        <div className="button" onClick={()=>{setDisplayValue(''); setBlock(true)}}><FontAwesomeIcon icon={faC} color='red'/></div>
        <div className="button" onClick={()=>setDisplayValue(displayValue.toString().slice(0,-1))}><FontAwesomeIcon icon={faDeleteLeft} color='red'/></div>
        <div className="button" onClick={()=>handleDegree()}><FontAwesomeIcon icon={faLevelUp} color='yellow'/></div>
        <div className="button" onClick={()=>handleClick('/')}><FontAwesomeIcon icon={faDivide} color='yellow'/></div>
      </div>

      <div className="row">
        <div className="button" onClick={()=>handleClick('7')}>7</div>
        <div className="button" onClick={()=>handleClick('8')}>8</div>
        <div className="button" onClick={()=>handleClick('9')}>9</div>
        <div className="button" onClick={()=>handleClick('*')}>
                                            <FontAwesomeIcon icon={faMultiply}
                                                             color='yellow'/></div>
      </div>

      <div className="row">
        <div className="button" onClick={()=>handleClick('4')}>4</div>
        <div className="button" onClick={()=>handleClick('5')}>5</div>
        <div className="button" onClick={()=>handleClick('6')}>6</div>
        <div className="button" onClick={()=>handleClick('-')}>
                                             <FontAwesomeIcon icon={faMinus}
                                                               color='yellow'/></div>
      </div>

      <div className="row">
        <div className="button" onClick={()=>handleClick('1')}>1</div>
        <div className="button" onClick={()=>handleClick('2')}>2</div>
        <div className="button" onClick={()=>handleClick('3')}>3</div>
        <div className="button" onClick={()=>handleClick('+')}>
                                            <FontAwesomeIcon icon={faAdd}
                                                             color='yellow' /></div>
      </div>

      <div className="row">
        <div className="button" onClick={()=>handleScope()}>( )</div>
        <div className="button" onClick={()=>handlePoint()}>.</div>
        <div className="button" onClick={()=>handleClick('0')}>0</div>
        <div className="button" onClick={()=>handleEqual()}>
                                                            <FontAwesomeIcon icon={faEquals} color='green'/></div>
      </div>

    </div>
    
    </>
  )
}

export default App
