import { useModal } from '../context/ModalProvider'
import '../styles/TeamCard.css'
import CrudButton from './CrudButton'
import TeamDetails from './TeamDetails'
import TeamForm from './TeamForm'

const TeamCard = ({id,name}) =>{

const {closeModal, triggerModal} = useModal()


const deleteTeam = ()=>{

    fetch(`/teams/${id}`,{ method:'DELETE', headers: {
        'Content-Type': 'application/json',
      },
   
}).then(res => res.json()).then(res => console.log(res))
}

    return<article className="team-card">

        <div className='team-card__field-container'><h4>{name}</h4></div>
        <div className='team-card__field-container'><p>Actions</p>
            <div className='team-card__actions-container'>
                <CrudButton type={'read'} text={'R'} action={()=>triggerModal(<TeamDetails id={id} name={name}></TeamDetails>)}></CrudButton>
                <CrudButton type={'update'} text={'U'} action={()=>triggerModal(<TeamForm closeForm={closeModal} initialData={{id,name}}></TeamForm>)}></CrudButton>
                <CrudButton type={'delete'} text={'D'} action={()=>deleteTeam()}></CrudButton>
            </div> 
        </div>
        
    </article>
}

export default TeamCard