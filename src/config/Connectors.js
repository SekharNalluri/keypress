export const SESSIONID = '4fa25fef-d066-4489-b710-1ad031318662'
export const SESSIONID_SELF = 'FBE034F0-C4E5-4588-AF9D-31EEB84643D4'
export const Main = 'https://onlineassessmentwebapp-development1.azurewebsites.net/'
export const EndPoints = {
    connectionProviderURL: Main + '',
    paymentEndpoint: Main + 'Payments/Process/',
    getTestResults: Main + 'Sessions/GetTestResults',
    SetTestResults: Main + 'Sessions/SetTestResults',
    getPatinetData: Main + 'Patients/Get',
    SystemSettings: Main + 'SystemSettings/Get',
    Payments: Main + 'Payments/Process',
    AddAcknowledgement: Main + 'Sessions/AddAcknowledgement',
    LoadSession: Main + 'Sessions/LoadSession/',
    SetCompanion: Main + 'Sessions/SetCompanion',
    GetWaitingRoomContent: Main + 'Sessions/GetWaitingRoomContent',
    GetConfig: Main + 'SelfGuided/GetConfig',
    StartSession: Main + 'SelfGuided/StartSession',
    GetItemsList: Main + 'SelfGuided/GetItemsList',
    SetResults: Main + 'SelfGuided/SetTestResults',
    PatientSignIn: Main + 'SelfGuided/PatientSignIn',

}
export default {
    Main, EndPoints, SESSIONID, SESSIONID_SELF
};

