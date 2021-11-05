const getAppointmentsForDay = function(state, day) {
  const filter = state.days.filter((selectedDay) => {
    
    return selectedDay.name === day
  })
  if(filter.length === 0) {
    return [];
  }
  const mapAppt = filter[0].appointments.map((appt) => {
    return state.appointments[appt];
  })
  return mapAppt;
}

const getInterview = function(state, interview) {
  if(!interview) {
    return null
  }
  const stateInterview ={
    ...interview,
    interviewer: {...state.interviewers[interview.interviewer]}
  }
  return stateInterview
}

const getInterviewersForDay = function(state, day) {
  const find = state.days.find((selectedDay) => {
    
    return selectedDay.name === day
  })
  if(state.days.length === 0) {
    return [];
  }
  if(find === undefined){
    return [];
  }
  const intAppt = find.interviewers.map((intId) => {
    return state.interviewers[intId];
  })
  return intAppt;

}

/*
{

}
*/

export {getAppointmentsForDay, getInterview, getInterviewersForDay}