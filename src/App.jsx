
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/data')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUsers(data)
      })
  }, [])

  const handleAdd = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const price = e.target.price.value
    const user = { name, price }
    
    console.log(user);
    fetch('http://localhost:5000/data', {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data]
        console.log(newUsers)
        setUsers(newUsers)
        e.target.reset()
      })
  }

  return (
    <>
      <h1>node-express client</h1>

      <form onSubmit={handleAdd}>
        <input type="text" name='name' />
        <input type="text" name='price' />
        <button type="submit">Add</button>
      </form>

      <p>data length: {users.length}</p>
      {
        users.map(datum => <div key={datum.id} datum={datum}>
          <p>{datum.iddiv}</p>
          <p>{datum.name}</p>
          <p>{datum.price}</p>
        </div>)
      }
    </>
  )
}
export default App
