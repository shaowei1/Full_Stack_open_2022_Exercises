const Header = ({name}) => {
  return (
      <div><h1>{name}</h1></div>
  )
  
}

const Content = ({name,exercises}) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
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

const Course = ({course}) => {
  return (
      <div>
          <Header name={course.name} />
          <div>
              {
              course.parts.map(part => <Content key={part.name} name={part.name} exercises={part.exercises} />)
          }
          </div>
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
  return <Course course={course} />
}


export default App;
