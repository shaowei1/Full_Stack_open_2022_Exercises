import { useState } from 'react'

const Header= ({text}) => {
  return (
      <div><h1>{text}</h1></div>
  )
}

const StatisticLine = (props) => {
    return (
        <div>
            <div>{props.text} {props.value}</div>
        </div>
    )
}
const Statistics = (props) => {
  const [good, neutral, bad] = props.values 
  if (good == 0 && neutral == 0 && bad == 0){
    return (
        <div>
            <div>No feedback given</div>
        </div>
    )
  }
  const total = () => good + neutral + bad
  const average = () => {
    return (good * 1 + neutral * 0 + bad * -1) / total()
  }
  const positive = () => {
      return ( good / total()) * 100
  }
   //
  return (
      <div>
      <StatisticLine text="good" value ={good}/>
      <StatisticLine text="neutral" value ={neutral}/>
      <StatisticLine text="bad" value ={bad}/>
        <div>all {total()}</div>
        <div>average {average()}</div>
        <div>positive {positive()} %</div>
      </div>
  )
 
}

const Button = (props) => {
    return (
            <button onClick={props.handleClick}> {props.text} </button>
    )
}
const App = () => {
  const text1 = 'give feedback'
  const text2 = 'statistics'
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const values = [good, neutral, bad]
  return (
    <div>
      <Header text={text1} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text={text2} />
      <Statistics values={values}/>
   </div>
  )
}

export default App
