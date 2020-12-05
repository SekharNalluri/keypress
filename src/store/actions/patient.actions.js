export const FETCH_TEST_RESULTS_LOADING = 'FETCH_TEST_RESULTS_LOADING';
export const FETCH_TEST_RESULTS_SUCCESS = 'FETCH_TEST_RESULTS_SUCCESS';
export const FETCH_TEST_RESULTS_ERROR = 'FETCH_TEST_RESULTS_ERROR';
export const SET_TEST_RESULTS_LOADING = 'SET_TEST_RESULTS_LOADING';
export const SET_TEST_RESULTS_SUCCESS = 'SET_TEST_RESULTS_SUCCESS';
export const SET_TEST_RESULTS_ERROR = 'SET_TEST_RESULTS_ERROR';
export const FETCH_TERMS_OF_SERVICE_LOADING = 'FETCH_TERMS_OF_SERVICE_LOADING';
export const FETCH_TERMS_OF_SERVICE_SUCCESS = 'FETCH_TERMS_OF_SERVICE_SUCCESS';
export const FETCH_TERMS_OF_SERVICE_ERROR = 'FETCH_TERMS_OF_SERVICE_ERROR';
export const FETCH_SESSION_LOADING = 'FETCH_SESSION_LOADING';
export const FETCH_SESSION_SUCCESS = 'FETCH_SESSION_SUCCESS';
export const FETCH_SESSION_ERROR = 'FETCH_SESSION_ERROR';
export const POST_PAYMENT_LOADING = 'POST_PAYMENT_LOADING';
export const POST_PAYMENT_SUCCESS = 'POST_PAYMENT_SUCCESS';
export const POST_PAYMENT_ERROR = 'POST_PAYMENT_ERROR';
export const SET_PATIENT_SESSION_ID = 'SET_PATIENT_SESSION_ID';
export const SET_PATIENT_TWILIO_TOKEN = 'SET_PATIENT_TWILIO_TOKEN';

export const fetchSessionTestResultsLoading = () => {
  return {
    type: FETCH_TEST_RESULTS_LOADING,
  };
};

export const fetchSessionTestResultsSuccess = (testRes) => {
  return {
    type: FETCH_TEST_RESULTS_SUCCESS,
    testRes,
  };
};

export const fetchSessionTestResultsError = (error) => {
  return {
    type: FETCH_TEST_RESULTS_ERROR,
    error,
  };
};

export const setSessionTestResultsLoading = () => {
  return {
    type: SET_TEST_RESULTS_LOADING,
  };
};

export const setSessionTestResultsSuccess = (res) => {
  return {
    type: SET_TEST_RESULTS_SUCCESS,
    res,
  };
};

export const setSessionTestResultsError = (error) => {
  return {
    type: SET_TEST_RESULTS_ERROR,
    error,
  };
};

export const fetchTermOfServiceLoading = () => {
  return {
    type: FETCH_TERMS_OF_SERVICE_LOADING,
  };
};

export const fetchTermOfServiceSuccess = (terms) => {
  return {
    type: FETCH_TERMS_OF_SERVICE_SUCCESS,
    terms,
  };
};

export const fetchTermOfServiceError = (error) => {
  return {
    type: FETCH_TERMS_OF_SERVICE_ERROR,
    error,
  };
};

export const fetchSessionLoading = () => {
  return {
    type: FETCH_SESSION_LOADING,
  };
};

export const fetchSessionSuccess = (session) => {
  return {
    type: FETCH_SESSION_SUCCESS,
    session,
  };
};

export const fetchSessionError = (error) => {
  return {
    type: FETCH_SESSION_ERROR,
    error,
  };
};

export const postPaymentLoading = () => {
  return {
    type: POST_PAYMENT_LOADING,
  };
};

export const postPaymentSuccess = (paymentResp) => {
  return {
    type: POST_PAYMENT_SUCCESS,
    paymentResp,
  };
};

export const postPaymentError = (error) => {
  return {
    type: POST_PAYMENT_ERROR,
    error,
  };
};

export const setPatientSessionId = (sessionId) => {
  return {
    type: SET_PATIENT_SESSION_ID,
    sessionId,
  };
};

export const setPatientTwilioToken = (twilioToken) => {
  return {
    type: SET_PATIENT_TWILIO_TOKEN,
    twilioToken,
  };
};
