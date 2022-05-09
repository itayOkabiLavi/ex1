let apiServer = {
    ip: 'https://localhost:7135/api/',
    users: 'https://localhost:7135/api/Users/',
    msgs: 'messages/',
    inv: 'invitations',
    tr: 'transfer',
}

const api = {
    getIP_URL: () => apiServer.ip,
    getRegister_URL: (registrationDetails) => { return apiServer.users + 'register?' +  new URLSearchParams(registrationDetails) },
    getLogin_URL: (loginData) => { return apiServer.users + 'login?' + new URLSearchParams(loginData) },
    getAllContacts_URL: () => { return apiServer.ip + 'Contacts' },
    getSingleContact_URL: (contactID) => { return apiServer.users + 'contacts/' + contactID }
    
};

export { api };