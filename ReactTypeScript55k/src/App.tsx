import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] =useState<User[]>([])
  const [showColors, setSjowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  const toogleColors = () => {
    setSjowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prev=> !prev)
  }


  useEffect(()=>{
    fetch('https://randomuser.me/api?results=100')
    .then(res => res.json())
    .then(res => {
      setUsers(res.results)
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  const sortedUsers = sortByCountry
    ? [...users].sort((a,b) => { 
    return a.location.country.localeCompare(b.location.country)
  })
  :
  users

  return (
    <div>
      <h1>Test</h1>
      <header>
        <button onClick={toogleColors}>
          Toogle colors
        </button>
        <button onClick={toggleSortByCountry}>
          {
            sortByCountry ? 'Not order by country': 'Order by country'
          }
        </button>
      </header>
      <main>
        <UsersList showColors={showColors} users={users} />
      </main>
      
    </div>
  )
}

export default App
