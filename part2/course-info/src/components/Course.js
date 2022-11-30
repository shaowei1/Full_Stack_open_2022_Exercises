import React from "react"

const Header = ({name}) => {
    return (
        <div><h2>{name}</h2></div>
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

const Total = ({parts}) => {
    const exercises = parts.map(part => part.exercises)
    const total = exercises.reduce(
        (accumulator, currentValue) => { 
            return accumulator + currentValue
        }    );
    return (
        <div>
            <p>Total of {total} exercises </p>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <div>
                {
                    course.parts.map((part, i) => <Content key={i} name={part.name} exercises={part.exercises} />)
                }
            </div>
            <Total parts={course.parts}/>
        </div>
    )
}
export default Course
