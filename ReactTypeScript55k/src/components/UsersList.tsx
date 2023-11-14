import {type User } from '../types.d'

interface Props {
    users: User[]
}

export function UsersList ({ users } : Props){
    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Country</th>
                    <th>Accions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map( user => {
                        return (
                            <tr key ={user.id.value}>
                            <td>
                                <img src={user.picture.thumbnail} />
                            </td>
                            <td>
                                {user.name.first}
                            </td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                        ) 
                        
                    })
                }
            </tbody>
        </table>
    )
}

// table thead tbody
// tr 
// th
// td