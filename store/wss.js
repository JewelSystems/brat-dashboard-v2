export const state = () => ({
    // information arrays
    userList: [],
    gamesList: [],
    eventsList: [],
    extrasList: [],
    userRuns: [],
    schedule: [],
    submittedRuns: [],
    runIncentives: [],
    eventRunsList: [],

    // Loads
    newRunLoad: 'waiting',

    curReq: 1,
    wsState: 3,
})

export const getters = {
    schedule: state => state.schedule,
    userList: state => state.userList,
    curReq: state => state.curReq
}

export const mutations= {
    updateRunLoad(state, value){
        state.newRunLoad = value;
    },
    listUsers(state, payload){
    if(payload && payload[0]) state.userList = payload[0];
    },
    listGames(state, payload){
    if(payload && payload[0]) state.gamesList = payload[0];
    },
    // Event
    listEvents(state, payload){
    if(payload && payload[0]) state.eventsList = payload[0];
    },
    updateEventState(state, payload){
    state.eventsList.filter(element => element.id === payload[0].id)[0].active = payload[0].active;
    },
    pushNewEvent(state, payload){
    state.eventsList.push(payload[0]);
    },
    updateEvent(state, payload){
    const event = state.eventsList.find(element => Number(element.id) === Number(payload[0].id));
    console.log('lista: ', state.eventsList);
    console.log('id: ', payload[0].id);
    console.log('evento: ', event);
    event.active = payload[0].active;
    event.donation_link = payload[0].donation_link;
    event.end = payload[0].end;
    event.name = payload[0].name;
    event.start = payload[0].start;
    },

    listExtras(state, payload){
    state.extrasList = payload[0];
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addEventExtra(state, payload){
    console.log(payload);
    },
    listUserRuns(state, payload){
    // state.userRuns = payload[0][0]; //js
    state.userRuns = payload[0]; // ts
    
    // if(payload[0][0].length) state.userRuns = payload[0][0];
    // else state.userRuns = payload[0];
    },
    listSchedule(state, payload){
    state.schedule = payload[0];
    },
    listEventRuns(state, payload){
    state.eventRunsList = payload;
    },
    // Submit Runs
    listSubmitRuns(state, payload){
    // console.log(payload[0]);
    state.submittedRuns = payload[0];
    },
    updateSubmitRun(state, payload){
    const submittedRun = state.submittedRuns.find(element => element.id === payload[0].id);
    submittedRun.reviewed = payload[0].reviewed;
    submittedRun.approved = payload[0].approved;
    submittedRun.waiting = payload[0].waiting;
    if(payload[0].reviewed === true){
        if(payload[0].approved === false){
        for(const idx in state.eventRunsList){
            if(state.eventRunsList[idx].submit_run_id === payload[0].id){
            state.eventRunsList.splice(idx, 1);
            break;
            }
        }
        }else{
        state.eventRunsList.push({
            approved: payload[0].approved,
            id: payload[0].event_run.id,
            reviewed: payload[0].reviewed,
            run_id: payload[0].event_run.run_id,
            submit_run_id: payload[0].id,
            waiting: payload[0].waiting,
        });
        }
    }
    },
    updateSubmitRunIncentives(state, payload){
    const submittedRun = state.submittedRuns.find(element => element.id === payload[0].id);
    submittedRun.reviewed = payload[0].reviewed;
    submittedRun.approved = payload[0].approved;
    submittedRun.waiting = payload[0].waiting;
    submittedRun.approved_incentives = payload[0].approved_incentives;
    submittedRun.goals = payload[0].goals;
    if(payload[0].reviewed === true && payload[0].approved === true){
        state.eventRunsList.push({
        approved: payload[0].approved,
        id: payload[0].event_run_id,
        reviewed: payload[0].reviewed,
        run_id: payload[0].event_run_run_id,
        submit_run_id: payload[0].id,
        waiting: payload[0].waiting,
        });
    }
    },
    removeIncentives(state, payload){
    const incentives = state.submittedRuns.filter(element => element.id === payload[0].id)[0].approved_incentives;
    for(const incentive in incentives){
        incentives[incentive] = false;
    }
    },
    // Incentives
    updateIncentive(state, payload){
    const incentive = state.submittedRuns.find(el1 => el1.incentives.find(el2 => el2.id === payload[0].id)).incentives.find(element => element.id === payload[0].id);
    incentive.BidwarOptions = payload[0].bidwar_options;
    incentive.comment = payload[0].comment;
    incentive.name = payload[0].name;
    },
    listRunIncentives(state, payload){
    state.runIncentives = payload[0];
    },


    updateSchedule(state, payload){
    // console.log("diff", state.schedule.filter(({ id: id1 }) => !payload.some(({ id: id2 }) => id2 === id1)))
    // console.log("payload:", payload);
    // console.log("schedule:", state.schedule);
    for(const val in payload){
        payload[val].order = Number(val) + 1;
    }
    state.schedule = payload;
    },
    // Setter
    updateScheduleList(state, payload){
    // console.log("antes: ", state.schedule);
    // console.log("depois: ", payload);
    for(const val in payload){
        payload[val].order = Number(val) + 1;
    }
    state.schedule = payload;
    },
    SOCKET_SEND(state, message){
    console.log('message sent: ' + message);
    state.curReq++;
    },
    wsState(state, curState){
    state.wsState = curState;
    },
}

export const actions = {
    async login ({ commit }, { username, password }) {
        const response = await this.$axios.$post('/login', {
            username,
            password,
        }).catch(function (error){
            if(error.response){
                return error.response;
            }
        });
        // console.log(response)
        const user = await this.$axios.$get('/user/'+response.id)

        const data ={
            id: response.id,
            token: response.token,
            username: user.res[0].username
        }
        commit('setCredentials', data)

        return response;
    },
    logout ( {commit} ){
        commit ('logout')
    }
}