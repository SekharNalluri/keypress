import {
  FETCH_TEST_RESULTS_LOADING,
  FETCH_TEST_RESULTS_SUCCESS,
  FETCH_TEST_RESULTS_ERROR,
  SET_TEST_RESULTS_LOADING,
  SET_TEST_RESULTS_SUCCESS,
  SET_TEST_RESULTS_ERROR,
  FETCH_TERMS_OF_SERVICE_LOADING,
  FETCH_TERMS_OF_SERVICE_SUCCESS,
  FETCH_TERMS_OF_SERVICE_ERROR,
  FETCH_SESSION_LOADING,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_ERROR,
  POST_PAYMENT_LOADING,
  POST_PAYMENT_SUCCESS,
  POST_PAYMENT_ERROR,
  SET_PATIENT_SESSION_ID,
  SET_PATIENT_TWILIO_TOKEN
} from '../actions/patient.actions';

const initialState = {
  loading: false,
  session: {},
  error: null,
  sessionId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEST_RESULTS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_TEST_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        session: {
          ...state.session,
          [action.testRes.type]: action.testRes.res,
        },
      };

    case FETCH_TEST_RESULTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case SET_TEST_RESULTS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_TEST_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        //TODO check below we are not getting anything in response
        //session: action.res,
      };

    case SET_TEST_RESULTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case FETCH_TERMS_OF_SERVICE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_TERMS_OF_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        session: {
          ...state.session,
          terms: action.terms,
        },
      };

    case FETCH_TERMS_OF_SERVICE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case FETCH_SESSION_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        session: {
          ...state.session,
          sessionData: action.session,
        },
      };

    case FETCH_SESSION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case POST_PAYMENT_LOADING:
      return {
        ...state,
        loading: true,
      };

    case POST_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        session: {
          ...state.session,
          paymentResp: action.paymentResp,
        },
      };

    case POST_PAYMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case SET_PATIENT_SESSION_ID:
      return {
        ...state,
        sessionId: action.sessionId,
      };

    case SET_PATIENT_TWILIO_TOKEN:
      return {
        ...state,
        twilioToken: action.twilioToken,
      };

    default:
      return state;
  }
};
