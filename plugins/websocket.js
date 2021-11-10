export default function websocket({store}){
  const wss = new WebSocket(process.env.WS_BASE_URL || 'ws://localhost:3001');
    wss.addEventListener('message', function (event){
      const payload = JSON.parse(event.data);
      console.log(payload)
      switch(payload.endpoint){
          case "getUsers":
            store.commit('wss/listUsers', payload.data);
            break;
          case "getGames":
            store.commit('wss/listGames', payload.data);
            break;
          // Events
          case "getEvents":
            store.commit('wss/listEvents', payload.data);
            break;
          case "updateEventState":
            store.commit('wss/updateEventState', payload.data);
            break;
          case "createEvent":
            store.commit('wss/pushNewEvent', payload.data);
            break;
          case "updateEvent":
            store.commit('wss/updateEvent', payload.data);
            break;
          case "createEventExtra":
            store.commit('wss/listExtras', payload.data);
            break;
          case "getEventExtras":
            store.commit('wss/listExtras', payload.data);
            break;
          case "getUserRuns":
            store.commit('wss/listUserRuns', payload.data);
            break;
          case "getEventSchedule":
            store.commit('wss/listSchedule', payload.data);
            break;
          // Permissions
          case "addPermission":
            store.commit('wss/addPermission', payload.data);
            break;
          case "removePermission":
            store.commit('wss/removePermission', payload.data);
            break;
          // SubmitRun
          case "getSubmitRuns":
            store.commit('wss/listSubmitRuns', payload.data);
            break;
          case "updateSubmitRun":
            store.commit('wss/updateSubmitRun', payload.data);
            break;
          case "updateSubmitRunNRunIncentives":
            console.log(payload.data);
            store.commit('wss/updateSubmitRunIncentives', payload.data);
            break;
          case "refuseSubmitRunNRemoveIncentives":
            store.commit('wss/updateSubmitRun', payload.data);
            store.commit('wss/removeIncentives', payload.data);
            break;
          // Incentives
          case "updateIncentive":
            store.commit('wss/updateIncentive', payload.data);
            break;
          case "getRunIncentives":
            store.commit('wss/listRunIncentives', payload.data);
            break;
          // Runs
          case "createRun":
            if(payload.info.msg === "Server error"){
              store.commit('wss/updateRunLoad', 'failed');
            }else{
              store.commit('wss/updateRunLoad', 'created');
            }
            break;
          case "createRunNGame":
            if(payload.info.msg === "Server error"){
              store.commit('wss/updateRunLoad', 'failed');
            }else{
              store.commit('wss/updateRunLoad', 'created');
            }
            break;
            
          // Schedule communication
          case "updateEventSchedule":
            store.commit('wss/updateScheduleList', payload.data[0].success);
            break;
          case "createSetupEventSchedule":
            store.commit('wss/updateScheduleList', payload.data[0].success);
            break;
          case "deleteEventSchedule":
            store.commit('wss/updateScheduleList', payload.data[0].success);
            break;
          case "createEventSchedule":
            store.commit('wss/updateScheduleList', payload.data[0].success);
            break;
          // Event Run
          case "getEventRuns":
            store.commit('wss/listEventRuns', payload.data[0]);
            break;
          // User
          case "updateUser":
            store.dispatch('wss/loadUser', payload.data[0]);
            break;
          default:
            console.log("Mensagem do servidor: ", payload);
            // store.commit('receiveData', payload);
      }
    });
    store.subscribe(mutation => {
      if (mutation.type === 'wss/SOCKET_SEND') {
        store.commit('wss/wsState', wss.readyState);
        console.log(JSON.stringify(mutation.payload))
        wss.send(JSON.stringify(mutation.payload))
      }
    })
}