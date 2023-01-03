import { useModal } from '../context/ModalProvider'
import '../styles/TournamentCard.css'
import CrudButton from './CrudButton'
import TournamentForm from './TournamentForm'
import TournamentDetails from './TournamentsDetails'

const TournamentCard = ({id,name,startDate}) =>{
const {closeModal, triggerModal} = useModal()


const deleteTournament = ()=>{

    fetch('/tournaments',{method:'DELETE', headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({id:id})
}).then(res => res.json()).then(res => console.log(res))
}

    return<article className="tournament-card">
        <div className='tournament-card__field-container'><h4>{name}</h4></div>
        <div className='tournament-card__field-container'><p>Start date:</p> <h4>{new Date(startDate).toDateString()}</h4></div>
        <div className='tournament-card__field-container'><p>Actions</p>
            <div className='tournament-card__actions-container'>
                <CrudButton type={'read'} text={'R'} action={()=>triggerModal(<TournamentDetails closeDetails={closeModal} id={id}></TournamentDetails>)}></CrudButton>
                <CrudButton type={'update'} text={'U'} action={()=>triggerModal(<TournamentForm closeForm={closeModal} initialData={{id,name,startDate}}  ></TournamentForm>)}></CrudButton>
                <CrudButton type={'delete'} text={'D'} action={()=>deleteTournament()}></CrudButton>
            </div> 
        </div>
       
        
    </article>
}

export default TournamentCard