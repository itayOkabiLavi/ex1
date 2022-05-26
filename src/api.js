// let apiServer = {
//     domain: "https://localhost:7135/",
//     //ip: apiServer.domain+'api/',
//     //users: apiServer.ip+'Users/',
//     //ip: 'https://10.0.0.30:7135/api/',
//     //users: 'https://10.0.0.30:7135/api/Users/',
//     msgs: 'messages/',
//     inv: 'invitations',
//     tr: 'transfer',
// }
let origin = "https://localhost:7135/";
let domainApi = origin + 'api/';
let users = domainApi + 'Users/';
const api = {
    getRatings: () => origin + 'ratings',
    getUser: () => users + "getUser",
    getDomain: () => origin,
    getIP_URL: () => domainApi,
    getRegister_URL: () => { return users + 'register' },
    getLogin_URL: () => { return users + 'login' },
    postContacts_URL: () => { return domainApi + 'Contacts' },
    getContacts_URL: () => { return domainApi + 'Contacts' },
    getSContact_URL: (contactID) => { return domainApi + 'Contacts/' + contactID },
    getMessagesOfContact_URL: (contactID) => { return domainApi + 'Contacts/' + contactID + '/messages' },
    getSMsgOfContact_URL: (contactID, msgID) => { return users + 'Contacts/' + contactID + '/messages/' + msgID },
    getInvitations_URL: () => domainApi + 'invitation',
    getTransfer_URL: () => domainApi + 'transfer',
    postCreateMessage: (id) => domainApi + "contacts/" + id + "/messages",
    hub: () => origin + "chatHub"
};

export { api };