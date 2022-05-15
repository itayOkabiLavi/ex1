let apiServer = {
    ip: 'https://localhost:7135/api/',
    users: 'https://localhost:7135/api/',
    msgs: 'messages/',
    inv: 'invitations',
    tr: 'transfer',
    token: ""
}

const api = {
    changeToken: (newToken) => {apiServer.token = newToken},
    getIP_URL: () => apiServer.ip,
    getRegister_URL: (registrationDetails) => { return apiServer.users + 'register?' +  new URLSearchParams(registrationDetails) },
    getLogin_URL: (loginData) => { return apiServer.users + 'login?' + new URLSearchParams(loginData) },
    getContacts_URL: () => { return apiServer.ip + 'contacts' },
    getSContact_URL: (contactID) => { return apiServer.users + 'Contacts/' + contactID },
    getMessagesOfContact_URL: (contactID) => 
        { return apiServer.users + 'Contacts/' + contactID + '/messages' },
    getSMsgOfContact_URL: (contactID, msgID) =>
        { return apiServer.users + 'Contacts/' + contactID + '/messages/' + msgID },
    getInvitations_URL: (destinationServer) => destinationServer + 'invitation',
    getTransfer_URL: (destinationServer) => destinationServer + 'transfer'
};

export { api };