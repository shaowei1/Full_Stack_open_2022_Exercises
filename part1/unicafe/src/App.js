import { useState } from 'react'

const Header= ({text}) => {
  return (
      <div><h1>{text}</h1></div>
  )
}
const App = () => {
  const text1 = 'give feedback'
  const text2 = 'statistics'
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = () => good + neutral + bad
  const average = () => {
    return (good * 1 + neutral * 0 + bad * -1) / total()
  }
  const positive = () => {
      return ( good / total()) * 100
  }
  return (
    <div>
      <Header text={text1} />
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Header text={text2} />
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {total()}</div>
      <div>average {average()}</div>
      <div>positive {positive()} %</div>
    </div>
  )
}

export default App
