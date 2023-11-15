import { useEffect, useState, useRef, useMemo } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] =useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])
  //useRef -> to save a value, we want to share between renders, but after it changed it should not render the component
  const toogleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue);
    // setSortByCountry(prev=> !prev)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
    setFilterCountry('')    
  }

  const handleDelete = ( email: string) => {
    const filteredUsers = users.filter((user)=>{
      return user.email !== email 
    })
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
    .then(async res => await res.json())
    .then(res => {
      // originalUsers.current = res.result
      setUsers(res.results)
      originalUsers.current = res.results
      console.log(originalUsers.current)
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  const filteredUsers = useMemo( () => { 
    console.log('calculate filteredUsers')
    return filterCountry !== null && filterCountry.length > 0
    ? users.filter( user => {
      return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
    })
    :
    users
    }, [users, filterCountry])

  // const sortedUsers = sortByCountry
  //   ? filteredUsers.toSorted((a,b) => { //[...users] or the best users.toSorted
  //   return a.location.country.localeCompare(b.location.country)
  // })
  // : filteredUsers

  const sortedUsers = useMemo(() => {   
    console.log('calculate sortedUsers') 

    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User)=> any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a,b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  } , [filteredUsers, sorting])

  return (
    <div>
      <h1>Test</h1>
      <header>
        <button onClick={toogleColors}>
          Toogle colors
        </button>
        
        <button onClick={toggleSortByCountry}>
          {
            sorting === SortBy.COUNTRY ? 'Not order by country': 'Order by country'
          }
        </button>

        <button onClick={handleReset}>
          Reset State
        </button>

        <input value= {filterCountry?? ''} placeholder='filter by country' onChange = { (e) => {
          setFilterCountry(e.target.value);
        }} />

      </header>
      <main>
        <UsersList changeSorting={handleChangeSort} deleteUser= {handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
      
    </div>
  )
}

export default App
