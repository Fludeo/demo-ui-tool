import { useEffect, useState } from "react"



const useTeams = (id) =>{

const [teams,setTeams] = useState({teams:[], count:0})


    useEffect(()=>{

        if(id){
            fetch(`/teams/${id}`,{ mode: 'no-cors'})
            .then(res => res.json())
            .then(res => setTeams(res))
            .catch(err => console.log(err))
        }
        else {
        fetch('/teams',{ mode: 'no-cors'})
        .then(res => res.json())
        .then(res => setTeams(res))
        .catch(err => console.log(err))
    }
    },[teams])

    return teams
}

export default useTeams