import useTeams from "../hooks/useTeams"
import '../styles/TeamList.css'
import CrudButton from "./CrudButton"

const TeamList = ({ addTeam, deleteTeam , currentAdded}) => {

    const teamsData = useTeams()

   const currentAddedIds = currentAdded.map(team => team.id)
    return <div className="team-list">
        {teamsData.teams.length>0&&teamsData.teams.map((team)=>
        <article className="team-list__item" key={team.id}>
            <p>{team.name}</p> 
            <div>
              { currentAddedIds.includes(team.id)? <CrudButton key={`delete${team.id}`} type={'delete'} text={'X'} action={()=>deleteTeam(team)}></CrudButton>
                                           : <CrudButton key={`add${team.id}`} type={'update'} text={'add'} action={()=>addTeam(team)}></CrudButton>}
            </div>
        </article>)}
    </div>
}

export default TeamList