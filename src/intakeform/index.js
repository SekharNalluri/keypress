import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  fetchTestResults,
  setTestResults,
} from '../store/actioncreators/patient.actioncreator';
import Intake from './intake.component';

function mapStateToProps(state) {
  return {
    session: state.patient.session,
    sessionId: state.patient.sessionId,
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchTestResults, setTestResults}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Intake);
