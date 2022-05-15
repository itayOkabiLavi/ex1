let apiServer = {
    domain:"https://localhost:7135/",
    ip: 'https://localhost:7135/api/',
    users: 'https://localhost:7135/api/Users/',
    msgs: 'messages/',
    inv: 'invitations',
    tr: 'transfer',
    token: ""
}

const api = {
<<<<<<< HEAD
    changeToken: (newToken) => {apiServer.token = newToken},
=======
    getDomain:()=>apiServer.domain,
>>>>>>> d386545d08e20ad424dca7bbe4c8fee619d7b2e4
    getIP_URL: () => apiServer.ip,
    getRegister_URL: (registrationDetails) => { return apiServer.users + 'register?' + new URLSearchParams(registrationDetails) },
    getLogin_URL: (loginData) => { return apiServer.users + 'login?' + new URLSearchParams(loginData) },
<<<<<<< HEAD
    getContacts_URL: () => { return apiServer.ip + 'contacts' },
    getSContact_URL: (contactID) => { return apiServer.users + 'Contacts/' + contactID },
    getMessagesOfContact_URL: (contactID) => 
        { return apiServer.users + 'Contacts/' + contactID + '/messages' },
    getSMsgOfContact_URL: (contactID, msgID) =>
        { return apiServer.users + 'Contacts/' + contactID + '/messages/' + msgID },
    getInvitations_URL: (destinationServer) => destinationServer + 'invitation',
    getTransfer_URL: (destinationServer) => destinationServer + 'transfer'
=======
    postContacts_URL: (contactData) => { return apiServer.ip + 'Contacts?' + new URLSearchParams(contactData) },
    getContacts_URL: () => { return apiServer.ip + 'Contacts' },
    getSContact_URL: (contactID) => { return apiServer.ip + 'Contacts/' + contactID },
    getMessagesOfContact_URL: (contactID) => { return apiServer.ip + 'Contacts/' + contactID + '/messages' },
    getSMsgOfContact_URL: (contactID, msgID) => { return apiServer.users + 'Contacts/' + contactID + '/messages/' + msgID },
    getInvitations_URL: () => apiServer.ip + 'invitation',
    getTransfer_URL: () => apiServer.ip + 'transfer',
    postCreateMessage: (id, content) => apiServer.ip + "contacts/" + id + "/messages?" +"id="+id+ "&content=" + content
>>>>>>> d386545d08e20ad424dca7bbe4c8fee619d7b2e4
};

export { api };