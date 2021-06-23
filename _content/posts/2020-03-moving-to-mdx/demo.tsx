import React, {useState} from 'react'

const Demo: React.FC = () => {
  const [number, setNumber] = useState(0)

  return <blockquote>
    <p>Count: {number}</p>
    <p>
      <button onClick={() => {
        setNumber(number + 1)
      }}>
        Add
      </button>
      <button onClick={()=> {
        setNumber(number - 1)
      }}>
        Subtract
      </button>
    </p>
  </blockquote>
}

export default Demo
