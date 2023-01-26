import React from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
    {id:1,name: 'Victor Janco', userName: 'gmail.com' ,isFollowing:true},
    {id:2,name: 'Carla Charcas', userName: 'gmail.com', isFollowing:false},
    {id:3,name: 'Yhessia Charcas', userName: 'gmail.com', isFollowing:true}
]
const formatUserName=(userName) => `@${userName}`

export function App() {    
    return (
        <section className='App'>
            {
                users.map(({id, name, isFollowing, userName}) =>(
                    <TwitterFollowCard key={id} formatUserName={formatUserName} userName={userName} initialIsFollowing={isFollowing}>
                        {name}
                    </TwitterFollowCard>)
                )  
            }
        </section>
    )
}