function cht(addressee, addresseeImg, contactInfo, messages = []) {
    return {
        addressee: addressee,
        img: addresseeImg,
        contactInfo: contactInfo,
        messages: messages
    }
}

function msg(fromMe, txtContent, mmContent, dateDate, dateTime, type = "text") {
    if (type !== "text" && type !== "image" && type !== "audio" && type !== "video")
        console.log("wrong type: ", type)
    return {
        fromMe: fromMe,
        type: type,
        content: { txt: txtContent, mm: mmContent },
        date: { time: dateTime, date: dateDate }
    }
}

let users = [
    {
        userName: 'y',
        password: '1',
        chats: [
            cht('Itay',
                'https://www.israelhayom.co.il/wp-content/uploads/2021/08/17/-%D7%9C%D7%95%D7%99-%D7%93%D7%95%D7%93%D7%99-%D7%97%D7%A1%D7%95%D7%9F-e1631619007774-960x640.jpg',
                'itay@gmail.com',
                [
                    msg(false, "?כמה עוד ימים כמה לילות", "", "14/04/2022", "08:05"),
                    msg(false, "רק שלוש מילים מה יכול להיות", "", "14/04/2022", "08:05"),
                    msg(true, "אז למה קשה בעברית? זו אותה משמעות", "", "14/04/2022", "08:06"),
                    msg(false, "לא יודע מי אני כבר בלעדייך", "", "14/04/2022", "08:06"),
                    msg(true, "נכון אתה פוחד כמו אידיוט כך לשלוף רגשות", "", "14/04/2022", "08:07"),
                    msg(false, "תפסיק לריב כבר עם עצמך זו אותה משמעות תתחיל להיות קצת סימפטי", "https://ak.picdn.net/shutterstock/videos/1072243031/preview/stock-footage-lucca-itay-may-the-cathedral-of-san-martino-in-lucca-in-tuscany-seen-from-the-ancient.webm", "14/04/2022", "08:08", "video"),
                    msg(false, "", "https://ak.picdn.net/shutterstock/audio/1214413/preview/preview.mp3", "14/04/2022", "08:08", "audio"),
                    msg(true, "", "https://image.shutterstock.com/image-photo/cluster-blue-grape-orange-neon-600w-1770293675.jpg", "19/04/2022", "14:30", "image"),
                    msg(false, "חפרת יאללה ביי", "", "19/04/2022", "14:32"),
                ]),
                cht('Matthew Tuck',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Bullet_for_My_Valentine_-_Rock_am_Ring_2018-4319.jpg/800px-Bullet_for_My_Valentine_-_Rock_am_Ring_2018-4319.jpg',
                'matt@gmail.com',
                [
                    msg(false, "No more I'm taking this hatred from you", "", "19/04/2022", "15:51"),
                    msg(true, "You make me feel dead when I'm talking to you", "", "19/04/2022", "15:53"),
                    msg(false, "You take me for granted when I'm not around", "", "19/04/2022", "15:52"),
                    msg(true, "So burn all your bridges Cause I'm not going down", "", "19/04/2022", "15:54"),
                    msg(false, "", "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT6upbtI6yjl7MzjMEXO01bYzjBHg2-UPBPl6FjQGI8xTcqgkQU", "19/04/2022", "15:57","image"),
                    msg(true, "", "https://ak.picdn.net/shutterstock/videos/1052695055/preview/stock-footage-musician-playing-the-guitar-during-a-live-performance-shot-on-red-camera-in-k.webm", "19/04/2022", "16:00", "video"),
                    msg(false, "", "https://ak.picdn.net/shutterstock/audio/473606/preview/preview.mp3", "19/04/2022", "16:02", "audio"),
                ])
        ]
    },
    {
        userName: 'goku',
        password: 'gohan1',
        isMail: true,
        contactInfo: 'asd@gmail.com',
        img: 'https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg',
        chats: [
            cht('chi chi',
                'https://dragonball.guru/wp-content/uploads/2021/03/Chi-Chi-Profile-Pic-415x415.png',
                'chichi@gmail.com',
                [
                    msg(false, "hey", "", "14/04/2022", "08:05"),
                    msg(false, "buy cucumber", "", "14/04/2022", "08:05"),
                    msg(true, "what is cucumber?", "", "14/04/2022", "08:06"),
                    msg(false, "that thing you don't like to eat", "", "14/04/2022", "08:06"),
                    msg(true, "?", "", "14/04/2022", "08:07"),
                    msg(false, "", "https://static.libertyprim.com/files/familles/concombre-large.jpg?1569271746", "14/04/2022", "08:08", "image"),
                    msg(false, "", "https://www.myinstants.com/media/sounds/you-are-so-dumb.mp3", "14/04/2022", "08:08", "audio")
                ]),
            cht("Gohan",
                'https://dragonball.guru/wp-content/uploads/2021/03/toppng.com-mystic-gohan-dragon-ball-z-gohan-1021x2859-1-e1617011806816-400x400.png',
                "gohan@gmail.com",
                [
                    msg(false, "", "https://c.tenor.com/WwcEYQgSFUkAAAAC/oxpp-gohan.gif", "14/04/1995", "09:00", "image"),
                    msg(false, "dad look how i kick majin buu's ass!", "", "14/04/1995", "09:00"),
                    msg(true, "awsome son!", "", "14/04/1995", "10:00"),
                    msg(true, "remember how he swallowed me and vegeta and we almost kicked YOUR ass? ", "https://c.tenor.com/VfHWZaLOl-4AAAAd/gohan-vs-super-buu-gohan-definitivo.gif", "14/04/1995", "10:05", "image")
                ]
            ),
            cht(
                "Vegeta the bro",
                "https://dragonball.guru/wp-content/uploads/2021/03/vegeta-profile-400x400.png",
                "vegy@gmail.com",
                [
                    msg(true, "look what chi chi made for lunch!", "", "14/04/1991", "15:00"),
                    msg(true, "", "https://player.vimeo.com/external/660047081.sd.mp4?s=89df34e0a895d745610373968575885e84e3c6db&profile_id=165&oauth_token_id=57447761", "14/04/1991", "15:00", "video"),
                    msg(false, "I don't care", "", "14/04/1991", "15:00"),
                ]
            )
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