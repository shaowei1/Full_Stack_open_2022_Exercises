const Header = (props) => {
  return (
      <div><h1>{props.course.name}</h1></div>
  )
  
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  const [p1, p2, p3] = props.course.parts
  return (
    <div>
      <Part part={p1.name} exercises={p1.exercises} />
      <Part part={p2.name} exercises={p2.exercises} />
      <Part part={p3.name} exercises={p3.exercises} />
    </div>
  )
}

const Total = (props) => {
  const [p1, p2, p3] = props.course.parts
  return (
    <div>
      <p>Number of exercises {p1.exercises + p2.exercises + p3.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
      <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}


export default App;
