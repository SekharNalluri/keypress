import {combineReducers} from 'redux';
import patientReducer from './patient.reducer';
//import proxyReducer from './proxy.reducer';

export default combineReducers({
  patient: patientReducer,
  //proxy: proxyReducer,
});
