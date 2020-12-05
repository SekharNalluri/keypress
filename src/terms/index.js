import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  fetchTermOfService,
  setSessionId,
  fetchSession,
} from '../store/actioncreators/patient.actioncreator';
import Terms from './terms.component';

function mapStateToProps(state) {
  return {
    terms:
      state.patient.session && state.patient.session.terms
        ? state.patient.session.terms
        : '',
    loading: state.patient.loading,
    //sessionId: state.patient.sessionId,
    //TODO: get fallback value
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchTermOfService, setSessionId, fetchSession}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
