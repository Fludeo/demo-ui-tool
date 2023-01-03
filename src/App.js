
import './App.css';

import TeamCard from './components/TeamCard';
import TeamForm from './components/TeamForm';
import TournamentCard from './components/TournamentCard';
import TournamentForm from './components/TournamentForm';
import { useModal } from './context/ModalProvider';
import useTeams from './hooks/useTeams';
import useTournaments from './hooks/useTournaments';
function App() {
  const {closeModal,triggerModal} = useModal()

 const tournamentsData = useTournaments()

 const teamsData = useTeams()

  return (
    <div className="App">
      <div className='buttons-section'>
       
      <button className='add-tournament-button add-tournament-button--hover' 
      onClick={()=>triggerModal(<TournamentForm closeForm = {closeModal} ></TournamentForm>)}>Create Tournament</button>
      <button className='add-team-button add-team-button--hover' 
      onClick={()=>triggerModal(<TeamForm closeForm = {closeModal}></TeamForm>)}>Create Team</button>
      </div>
      <div className='main-section'>
        <section className='tournament-section'>
          <h1 className='tournament-section__header'>Tournaments:</h1>
          <div className='tournament-section__card-container'>
          {tournamentsData.tournaments.length>0&&tournamentsData.tournaments.map((data)=><TournamentCard key={data.id} {...data}></TournamentCard>)}
          </div>
          
        </section>
        <section className='team-section'>
          <h1 className='team-section__header' >Teams:</h1>
          <div className='team-section__card-container'>
          {teamsData.teams.length>0&&teamsData.teams.map((data)=><TeamCard key={data.id} {...data}></TeamCard>)}
          </div>
        </section>
      </div>
   
    </div>
  );
}

export default App;
