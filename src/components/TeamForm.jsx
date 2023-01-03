
import React, { useState } from 'react';
import '../styles/TeamForm.css'




const TeamForm =({closeForm, initialData}) =>{

const [formData, setFormData] = useState(initialData || {name:'', errorMessage:''})


const UpdateForm =  ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value });
      };
const onClose= (data)=>{
  closeForm()
}

  const  createTeam = (e)=>{
    e.preventDefault()

    const body =  { 
      name: formData.name
    }

    fetch('/teams', { method:'POST', headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)})
    .then(res => res.json())
    .then(res =>  res.statusCode === 400 ? setFormData({...formData, errorMessage: res.message[0]}): onClose(res))
    .catch(err => console.log(err))
  }

  const  updateTeam = (e)=>{
    e.preventDefault()
    console.log(formData)

    const body =  { 
      name: formData.name,
    }

    fetch(`/teams/${formData.id}`, { method:'PATCH', headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)})
    .then(res => res.json())
    .then(res =>  res.statusCode === 400 ? setFormData({...formData, errorMessage: res.message[0]}): onClose(res))
    .catch(err => console.log(err))
  }

    return(
        <form className="team-form">
        <label className='team-form__label' >Name</label>
        <input name='name' onChange={(e)=>UpdateForm(e)} 
        className='team-form__input' type="text"  />

         <p className='team-form__error'>{formData.errorMessage}</p>
         <div className='team-form__button-container'>
         <button onClick={initialData ? updateTeam:createTeam} className='team-form__create-button team-form__create-button--hover'>{initialData ?'Update':'Create'}</button>
         <button onClick={(e)=> closeForm(e)} className='team-form__cancel-button team-form__cancel-button--hover'>Cancel</button>
        </div>
    </form>
    )
}

export default TeamForm;