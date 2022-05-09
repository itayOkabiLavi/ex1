let apiServer = {
    ip: 'https://localhost:7135/api/',
    users: 'https://localhost:7135/api/Users/',
    msgs: 'messages/',
    inv: 'invitations',
    tr: 'transfer',
}

const api = {
    getIP: () => apiServer.ip,
    getRegister: (registrationDetails) => { return apiServer.users + 'register?' +  new URLSearchParams(registrationDetails) },
    getLogin: (loginData) => { return apiServer.users + 'login?' + new URLSearchParams(loginData) },
    getContacts: () => { return apiServer.ip + 'Contacts' },
    getSingleContact: (contactID) => { return apiServer.users + 'contacts/' + contactID }
    
};

export { api };