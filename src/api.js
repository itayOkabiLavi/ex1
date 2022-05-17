let apiServer = {
    domain: "https://localhost:7135/",
    ip: 'https://localhost:7135/api/',
    users: 'https://localhost:7135/api/Users/',
    msgs: 'messages/',
    inv: 'invitations',
    tr: 'transfer',
}

const api = {
    getDomain: () => apiServer.domain,
    getIP_URL: () => apiServer.ip,
    getRegister_URL: (registrationDetails) => { return apiServer.users + 'register?' + new URLSearchParams(registrationDetails) },
    getLogin_URL: (loginData) => { return apiServer.users + 'login?' + new URLSearchParams(loginData) },
    postContacts_URL: (contactData) => { return apiServer.ip + 'Contacts?' + new URLSearchParams(contactData) },
    getContacts_URL: () => { return apiServer.ip + 'Contacts' },
    getSContact_URL: (contactID) => { return apiServer.ip + 'Contacts/' + contactID },
    getMessagesOfContact_URL: (contactID) => { return apiServer.ip + 'Contacts/' + contactID + '/messages' },
    getSMsgOfContact_URL: (contactID, msgID) => { return apiServer.users + 'Contacts/' + contactID + '/messages/' + msgID },
    getInvitations_URL: () => apiServer.ip + 'invitation',
    getTransfer_URL: () => apiServer.ip + 'transfer',
    postCreateMessage: (id, content) => apiServer.ip + "contacts/" + id + "/messages?" + "id=" + id + "&content=" + content,
    hub: () => apiServer.domain + "chatHub"
};

export { api };