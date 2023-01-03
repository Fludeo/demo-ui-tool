
import useTeams from '../hooks/useTeams'
import '../styles/TeamDetails.css'



const TeamDetails = ({id,name}) =>{


const data = useTeams(id)


    return<article className="team-details">

        <div className='team-details__field-container'><h4>{data.name}</h4></div>
        <div className='team-details__field-container'>
            <p>Tournaments:</p> 
            <h4>{data.tournaments&&data.tournaments.length}</h4>
        </div>
        {data.tournaments&&data.tournaments.map( (tournament) =>    <div className='team-details__field-container'>
         <h4>{tournament.name}</h4>
        </div>)}
        
    </article>
}

export default TeamDetails