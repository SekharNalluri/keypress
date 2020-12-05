import axios from 'axios';
import {
  fetchSessionTestResultsLoading,
  fetchSessionTestResultsSuccess,
  fetchSessionTestResultsError,
  setSessionTestResultsLoading,
  setSessionTestResultsSuccess,
  setSessionTestResultsError,
  fetchTermOfServiceLoading,
  fetchTermOfServiceSuccess,
  fetchTermOfServiceError,
  fetchSessionLoading,
  fetchSessionSuccess,
  fetchSessionError,
  postPaymentLoading,
  postPaymentSuccess,
  postPaymentError,
  setPatientSessionId,
  setPatientTwilioToken
} from '../actions/patient.actions';

import { EndPoints } from './../../config/Connectors.js';

const applicationCache = {

}
export default patientService = {
  getCache : (key) =>{
    return applicationCache[key]
  },
  setCache: (key, data) => {
    applicationCache[key]= data;
  },
  runAsync: (method, data) => {
    setTimeout(()=>{
      if(typeof method=="function"){
       method(data);
      }
    },100);
  },
  getDataByPatientId: (data) => {
    return axios({
      method: 'get',
      //TODO get it from config
      url:
        EndPoints.getPatinetData,
      params: {
        id: data.patientId
      }
    });
      
  },
  getData: (data) => {
    let url = `${EndPoints.getTestResults}?sessionGuid=${data.sessionId}&type=${data.type}`;
    console.log(url); 
    return axios({
      method: 'get',
      url:       url
    });
      
  },
  saveData: (data) => {
    return axios({
      method: 'post',
      //TODO get it from config
      url:
        EndPoints.SetTestResults,
      data: {
        sessionGuid: data.sessionId,
        type: data.type,
        data: JSON.stringify(data.payload),
        status: data.formCompleted ? 'completed' : 'started',
      }
    });
  }
} 

export const fetchTestResults = (data) => {
  
  return (dispatch) => {
    dispatch(fetchSessionTestResultsLoading());
    axios({
      method: 'get',
      //TODO get it from config
      url:
        EndPoints.getTestResults,
      params: {
        sessionGuid: data.sessionId,
        type: data.type,
      }
    })
      .then(function (res) {
        console.log('PHANIDATA ========>'+JSON.stringify(res));
        let result = {
          res: res.data.data,
          type: data.type,
        };
        console.log(`PATIENTDATA GetTestResults Res For ${data.sessionId}: ${JSON.stringify(result)}`);
        dispatch(fetchSessionTestResultsSuccess(result));
      })
      .catch((error) => {
              axios({
                method: 'get',
                //TODO get it from config
                url:
                  EndPoints.getPatinetData,
                params: {
                  id: data.patientId,
                }
              })
                .then(function (res) {
                  let result = {
                    res: res.data.data,
                    type: data.type,
                  };
                  console.log(`PATIENTDATA GetTestResults Res For ${data.sessionId}: ${JSON.stringify(result)}`);
                  dispatch(fetchSessionTestResultsSuccess(result));
                })
                .catch((error) => {
                  
              console.error(`PATIENTDATAERROR GetTestResults Error : ${JSON.stringify(error)}`);
              dispatch(fetchSessionTestResultsError(error));
                });
      });
  };
};

export const setTestResults = (data) => {
  return (dispatch) => {
    dispatch(setSessionTestResultsLoading());

    axios({
      method: 'post',
      //TODO get it from config
      url:
        EndPoints.SetTestResults,
      data: {
        sessionGuid: data.sessionId,
        type: data.type,
        data: JSON.stringify(data.payload),
        status: data.formCompleted ? 'completed' : 'started',
      },
    })
      .then(function (res) {
        //console.log(`SetTestResults Res : ${JSON.stringify(res)}`);
        dispatch(setSessionTestResultsSuccess(res));
      })
      .catch((error) => {
        console.error(`SetTestResults Error : ${JSON.stringify(error)}`);
        dispatch(setSessionTestResultsError(error));
      });
  };
};

export const fetchTermOfService = () => {
  return (dispatch) => {
    dispatch(fetchTermOfServiceLoading());
    axios
      .get(
        //TODO get it from config
        EndPoints.SystemSettings,
        {
          params: { name: 'TermsOfService' },
        },
      )
      .then(function (res) {
        if (res && res.data) {
          dispatch(fetchTermOfServiceSuccess(res.data.value));
        }
      })
      .catch((error) => {
        console.error(`Error while fetching Terms : ${JSON.stringify(error)}`);
        dispatch(fetchTermOfServiceError(error));
      });
  };
};


export const fetchSession = (sessionId) => {
  return (dispatch) => {
    dispatch(fetchSessionLoading());
    axios
      .get(EndPoints.LoadSession + sessionId)
      .then(function (res) {//
        if (res && res.data) {
          //console.log('PHANISESS Load Session ==>>'+JSON.stringify(res.data));
          dispatch(fetchSessionSuccess(res.data));
        }
      })
      .catch((error) => {
        console.error(`Error while fetching session : ${JSON.stringify(error)}`);
        dispatch(fetchSessionError(error));
      });
  };
};


export const setSessionId = (sessionId) => {
  return (dispatch) => dispatch(setPatientSessionId(sessionId));
};

export const setTwilioToken = (twilioToken) => {
  return (dispatch) => dispatch(setPatientTwilioToken(twilioToken));
};

export const postPayment = (data) => {
  return (dispatch) => {
    dispatch(postPaymentLoading());
    axios
      .post(EndPoints.paymentEndpoint, data)
      .then(function (res) {
        if (res && res.data && res.data.status === 200) {
          dispatch(postPaymentSuccess(res.data));
        } else {
          dispatch(postPaymentError(res.data));
        }
      })
      .catch((error) => {
        console.info(`Error while posting payment : ${JSON.stringify(error)}`);
        dispatch(postPaymentError(error));
      });
  };
};
