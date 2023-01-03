
import React, { useState } from 'react';
import '../styles/TournamentForm.css'
import TeamList from './TeamList';




const TournamentForm =({closeForm,initialData}) =>{

const [formData, setFormData] = useState( initialData || {id:'', name:'', startDate:'',teams: [], errorMessage:''})

console.log(formData)

const UpdateForm =  ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value , errorMessage:''});
      };

const onClose = () =>{
  closeForm()
}

  const  createTournament = (e)=>{
    e.preventDefault()
    console.log(formData)

    const body =  { 
      name: formData.name,
      startDate: new Date(formData.startDate),
      teams: formData.teams.length>0 ? formData.teams : undefined
    }

    fetch('/tournaments', { method:'POST', headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)})
    .then(res => res.json())
    .then(res =>  res.statusCode === 400 ? setFormData({...formData, errorMessage: res.message[0]}): onClose(res))
    .catch(err => console.log(err))
  }

  const  updateTournament = (e)=>{
    e.preventDefault()
    console.log(formData)
    
    const body =  { 
      name: formData.name,
      startDate: new Date(formData.startDate)
    }

    fetch(`/tournaments/${formData.id}`, { method:'PUT', headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)})
    .then(res => res.json())
    .then(res =>  res.statusCode === 400 ? setFormData({...formData, errorMessage: res.message[0]}): onClose(res))
    .catch(err => console.log(err))
  }



    return(
        <form className="tournament-form">
        <label className='tournament-form__label' >Name</label>
        <input name='name' defaultValue={formData.name} onChange={(e)=>UpdateForm(e)} 
        className='tournament-form__input' type="text"  />

         <label className='tournament-form__label' >Start date</label>
         <input name='startDate' onChange={(e)=>UpdateForm(e)} 
         className='tournament-form__input' defaultValue={initialData && new Date(formData.startDate).toISOString().substring(0,10)} type="date"  />
         {!initialData&&<TeamList currentAdded={[...formData.teams]}
         deleteTeam = {(team)=>{setFormData({...formData, teams: [...formData.teams].filter(({id})=>team.id!==id)})}} 
         addTeam = {(team)=>setFormData({...formData, teams: [...formData.teams, team]}) }>
         </TeamList>}
         <p className='tournament-form__error'>{formData.errorMessage}</p>
         <div className='tournament-form__button-container'>
         <button onClick={initialData? updateTournament:createTournament} className='tournament-form__create-button tournament-form__create-button--hover'>{initialData ? 'Update':'Create'}</button>
         <button onClick={(e)=> closeForm(e)} className='tournament-form__cancel-button tournament-form__cancel-button--hover'>Cancel</button>
        </div>
    </form>
    )
}

export default TournamentForm;