
import React from 'react';
import useTournaments from '../hooks/useTournaments';

import '../styles/TournamentDetails.css'
import TeamList from './TeamList';




const TournamentDetails =({closeDetails, id}) =>{

const data = useTournaments(id)
const onClose =()=>{
    closeDetails()

}

const  updateTournament = (team)=>{
   
    const teams = data.teams
    teams.push(team)
    const body =  { 
      name: data.name,
      startDate: new Date(data.startDate),
      teams: teams.length>0? teams : undefined
      
    }

    fetch(`/tournaments/${data.id}`, { method:'PUT', headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)})
    .then(res => res.json())
    .then(res =>  console.log(res))
    .catch(err => console.log(err))
  }


  const  deleteTeamFromTournament = (team)=>{
   
   

    const body = {id:team.id}

    fetch(`/tournaments/${data.id}/teams`, { method:'DELETE', headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)})
    .then(res => res.json())
    .then(res =>  console.log(res))
    .catch(err => console.log(err))
  }


    return(<article className="tournament-details">
    <div className='tournament-details__field-container'><h4>{data.name}</h4></div>
    <div className='tournament-details__field-container'><p>Start date:</p> <h4>{new Date(data.startDate).toDateString()}</h4></div>
    <div className='tournament-details__field-container'><p>Teams:</p> <h4>{data.teams&&data.teams.length}</h4> </div>
    <div> {data.teams&&<TeamList deleteTeam={(team)=>deleteTeamFromTournament(team)} addTeam={(team) => updateTournament(team)} currentAdded={data.teams}></TeamList>}</div>
        </article>
        
    )
}

export default TournamentDetails;