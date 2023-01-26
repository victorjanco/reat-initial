import {useState} from 'react'

export function TwitterFollowCard({children, formatUserName, userName, initialIsFollowing}) {
    const [isFollowing, setIsFollowing]  = useState(initialIsFollowing)
    // const isFollowing = state[0]
    // const setIsFollowing = state[1]

    const imageScr=`https://unavatar.io/sindresorhus@${userName}`
    const textButton = isFollowing ? 'Siguiendo':'Seguir'
    const classButton = isFollowing ? 'tw-followCard-button is-following':'tw-followCard-button'
    console.log(isFollowing)

    
    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }
    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img
                    className='tw-followCard-avatar' 
                    alt="El Avatar de Janco" 
                    src={imageScr}/>
                <div className="tw-followCard-info">
                    <strong>{children}</strong>
                    <span className="tw-followCard-infoUserName">{formatUserName(userName)}</span>
                </div>      
            </header>
            <aside>
                <button className={classButton} onClick={handleClick}>
                    <span className="tw-followCard-text">{textButton}</span>
                    <span className="tw-followCard-stopFollow">Dejar de Seguir</span>
                </button>
            </aside>
        </article>
    )
}