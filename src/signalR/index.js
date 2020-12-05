// import './jquery';
//import './signalr';
// import signalr from 'react-native-signalr';
// import {Main,SESSIONID} from './../config/Connectors.js';

// const connection = signalr.hubConnection(Main, {
//   qs: {
//     access_token:
//     '',
//   },
// });
// connection.logging = true;

// connection.disconnected(async () => {
//   await start();
// });

// export const start = async () => {
//   try {
    
//     await connection.start().done(() => {
//       console.log('Connection Established between the host'+SESSIONID);
//     }).fail(() => {
//       console.log('Failed');
//     });
    
//     console.log(`connected with connectid ${connection.id}`);
    
//     return connection.createHubProxy('sessionHub');
//   } catch (err) {
//     console.log('Error while connecting to signalrhub retrying to connect!');
//     console.error(err);
//     setTimeout(() => start(), 5000);
//   }
// };

// Start the connection.
