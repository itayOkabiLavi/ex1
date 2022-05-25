let apiServer = {
    domain: "https://0.0.0.0:7135/",
    ip: 'https://0.0.0.0:7135/api/',
    users: 'https://0.0.0.0:7135/api/Users/',
    msgs: 'messages/',
    inv: 'invitations',
    tr: 'transfer',
}

const api = {
    getUser: () => apiServer.users + "getUser",
    getDomain: () => apiServer.domain,
    getIP_URL: () => apiServer.ip,
    getRegister_URL: () => { return apiServer.users + 'register' },
    getLogin_URL: () => { return apiServer.users + 'login' },
    postContacts_URL: () => { return apiServer.ip + 'Contacts' },
    getContacts_URL: () => { return apiServer.ip + 'Contacts' },
    getSContact_URL: (contactID) => { return apiServer.ip + 'Contacts/' + contactID },
    getMessagesOfContact_URL: (contactID) => { return apiServer.ip + 'Contacts/' + contactID + '/messages' },
    getSMsgOfContact_URL: (contactID, msgID) => { return apiServer.users + 'Contacts/' + contactID + '/messages/' + msgID },
    getInvitations_URL: () => apiServer.ip + 'invitation',
    getTransfer_URL: () => apiServer.ip + 'transfer',
    postCreateMessage: (id) => apiServer.ip + "contacts/" + id + "/messages",
    hub: () => apiServer.domain + "chatHub"
};

export { api };