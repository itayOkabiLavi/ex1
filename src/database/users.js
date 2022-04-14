function cht(addressee, addresseeImg, contactInfo, messages=[]) {
    return {addressee: addressee,
    img: addresseeImg,
    contactInfo: contactInfo,
    messages: messages}
}

function msg(fromMe, txtContent, mmContent, dateDate, dateTime, type="text" ) {
    if (type !== "text" && type !== "image" && type !== "audio" && type !== "video")
        console.log("wrong type: ", type)
    return {   fromMe: fromMe, 
        type: type, 
        content:{txt: txtContent, mm: mmContent}, 
        date: {time: dateTime, date: dateDate}}
}

let users= [
    {
        userName: 'y',
        password: '1',
    },
    {
        userName: 'goku',
        password: 'gohan1',
        isMail: true,
        contactInfo: 'asd@gmail.com',
        img: 'https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg',
        chats: [
            {   addressee: 'chi chi',
                img: 'https://dragonball.guru/wp-content/uploads/2021/03/Chi-Chi-Profile-Pic-415x415.png',
                contactInfo: 'chichi@gmail.com',
                messages: [
                    msg(false, "hey", "", "14/04/2022", "08:05"),
                    msg(false, "buy cucumber", "", "14/04/2022", "08:05"),
                    msg(true, "what is cucumber?", "", "14/04/2022", "08:06"),
                    msg(false, "that thing you don't like to eat", "", "14/04/2022", "08:06"),
                    msg(true, "?", "", "14/04/2022", "08:07"),
                    msg(false, "...", "https://static.libertyprim.com/files/familles/concombre-large.jpg?1569271746", "14/04/2022", "08:08", "image")
            ]},
            cht("Gohan",
                'https://dragonball.guru/wp-content/uploads/2021/03/toppng.com-mystic-gohan-dragon-ball-z-gohan-1021x2859-1-e1617011806816-400x400.png',
                "gohan@gmail.com",
                [
                    msg(false, "", "https://c.tenor.com/WwcEYQgSFUkAAAAC/oxpp-gohan.gif", "14/04/1995", "09:00", "image"),
                    msg(false, "dad look how i kick majin buu's ass!", "", "14/04/1995", "09:00"),
                    msg(true, "awsome son!", "", "14/04/1995", "10:00"),
                    ]
                ),
        ]
    },
    {
        userName: 'vegeta',
        password: 'bulma2',
        isMail: true,
        contactInfo: 'asd@gmail.com',
        img: 'https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg'
    }
]
export default users;