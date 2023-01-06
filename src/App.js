import TeamCard from './components/TeamCard';
import TeamForm from './components/TeamForm';
import TournamentCard from './components/TournamentCard';
import TournamentForm from './components/TournamentForm';
import { useModal } from './context/ModalProvider';
import useTeams from './hooks/useTeams';
import useTournaments from './hooks/useTournaments';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './components/NavBar';
import Loader from './components/Loader';
import './App.css';
import axios from 'axios';
import StandardButton from './components/StandardButton';
import { useState } from 'react';
import Board from './components/Board';

function App() {
  const { closeModal, triggerModal } = useModal();

  const tournamentsData = useTournaments();

  const teamsData = useTeams();

  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  /* TEAMS , USER and ERROR STORAGE */
  const [teams, setTeams] = useState({});
  const [users, setUsers] = useState({});
  const [error, setError] = useState({});
  const [tournament, setTournament] = useState({});

  /* API CALLS */
  /* NO PROTECTED */
  const callNoProtected = async () => {
    try {
      const response = await axios.get('http://localhost:3000/teams');
      console.log('teams', response.data);
      setTeams(response.data);
    } catch (error) {
      console.log('error', error.message);
      setError(error.message);
    }
  };
  /* PROTECTED */
  const getUsersProtected = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('users', response.data);
      setUsers(response.data);
    } catch (error) {
      console.log('error', error.message);
      setError(error.message);
    }
  };

  const postTournamentProtected = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.post('http://localhost:3000/tournaments', {
        body: {
          name: `tournament ${Math.random() * 10}`,
          startDate: '2005-11-11T00:00:00.000Z',
          phases: [
            {
              name: `phase ${Math.random() * 10}`,
              startDate: '2005-11-11T00:00:00.000Z',
              endDate: '2005-11-11T00:00:00.000Z',
              format: 'qualifying'
            }
          ]
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('tournament', response.data);
      setTournament(response.data);
    } catch (error) {
      console.log('error', error.message);
      setError(error.message);
    }
  };

  return (
    <div className='App'>
      <NavBar />
      {isLoading ? <Loader /> : <></>}
      {isAuthenticated ? (
        <>
          <div className='buttons-container'>
            <Board title={'Estas loggeado'}></Board>
            <StandardButton
              action={callNoProtected}
              type={'selected'}
              text={`GET /teams NO protected`}
            />
            <StandardButton
              action={getUsersProtected}
              type={'danger'}
              text={`GET /users protected`}
            />
            <StandardButton
              action={postTournamentProtected}
              type={'danger'}
              text={`POST /tournaments protected`}
            />

            {isAuthenticated && (
              <div className='boards-container'>
                <Board title={'teams'} info={teams} />
                <Board title={'users'} info={users} />
                <Board title={'tournament'} info={tournament} />
                <Board title={'error'} info={error} />
              </div>
            )}
          </div>
          <div className='Routes'>
            <div className='buttons-section'>
              <button
                className='add-tournament-button add-tournament-button--hover'
                onClick={() =>
                  triggerModal(
                    <TournamentForm closeForm={closeModal}></TournamentForm>
                  )
                }
              >
                Create Tournament
              </button>
              <button
                className='add-team-button add-team-button--hover'
                onClick={() =>
                  triggerModal(<TeamForm closeForm={closeModal}></TeamForm>)
                }
              >
                Create Team
              </button>
            </div>
            <div className='main-section'>
              <section className='tournament-section'>
                <h1 className='tournament-section__header'>Tournaments:</h1>
                <div className='tournament-section__card-container'>
                  {tournamentsData.tournaments.length > 0 &&
                    tournamentsData.tournaments.map((data) => (
                      <TournamentCard key={data.id} {...data}></TournamentCard>
                    ))}
                </div>
              </section>
              <section className='team-section'>
                <h1 className='team-section__header'>Teams:</h1>
                <div className='team-section__card-container'>
                  {teamsData.teams.length > 0 &&
                    teamsData.teams.map((data) => (
                      <TeamCard key={data.id} {...data}></TeamCard>
                    ))}
                </div>
              </section>
            </div>
          </div>
        </>
      ) : (
        <div className='main-container'>
          <div className='buttons-container'>
            <Board title={'No estas loggeado aun'}></Board>
            <StandardButton
              action={callNoProtected}
              type={'selected'}
              text={`GET /teams NO protected`}
            />
            <StandardButton
              action={getUsersProtected}
              type={'danger'}
              text={`GET /users protected`}
            />
            <StandardButton
              action={postTournamentProtected}
              type={'danger'}
              text={`POST /tournaments protected`}
            />

            {!isAuthenticated && (
              <div className='boards-container'>
                <Board title={'teams'} info={teams} />
                <Board title={'users'} info={users} />
                <Board title={'tournament'} info={tournament} />
                <Board title={'error'} info={error} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
