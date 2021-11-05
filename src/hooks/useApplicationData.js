import {useEffect, useState} from "react";
import axios from "axios";


export default function useApplicationData() {
 const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
    },[])



  const setDay = (day) => setState(prev => ({ ...prev, day }));
  
  const updateSpots = function (state, appointments, id) {
    
    const day = state.days.find(day => state.day === day.name)
    let spots = day.spots
    console.log(day)
  
    const oldInterview = state.appointments[id].interview
    const newInterview = appointments[id].interview
  
    if(newInterview && !oldInterview) {
      spots--;
    }
  
    if(oldInterview && !newInterview) {
      spots++;
    }
  
  
  const updatedDays = state.days.map(d => {
  return d.name === day.name? {...d,spots } :d 
  });
  
  return updatedDays
  };




    

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      const days =updateSpots(state, appointments, id)
      setState((state)=> { 
        return {...state, appointments, days }
      
  })})}

  function cancelInterview(id) {

     const deletedInterview = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: deletedInterview
    };
    
  
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({
        ...state,
         id, 
         appointments,
         days: updateSpots(state, appointments, id)
        })
      
    })
  }


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}