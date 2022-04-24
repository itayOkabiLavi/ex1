# Project Structure:
## index > body , App (func)
body is reffered to as App (id='r')
Switches between Login window and Chat window, Where Login itself contains the Register window.
App stores the authentications details after login.
## Login
Starts by entering default registered users.
When login btn is clicked the details are searched in the DB "users", and the result changes
the App token state.
When register btn is pressed, the state.registerClicked variable is set to true which turns the
result of the condition {this.state.registerClicked ? /*show register*/ : /*show login*/ } to
the Register window.
###### Notes
> - Hard coded users:
>   -  uname=goku, password=gohan1
>   -  uname=y, password=1
### Register
Allows user to create new account which includes: prof. picture, unique username, nickname and password. Errors and notes during registration will appear on left side of the screen. When input is valid, clicking on "Apply" btn changes the state of the if-statement in App comp. which loads the chat window.
###### Notes
> - username must be unique (not exist in database).
> - password requirements are based on the following regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}/. Meaning pwd is at least 5 chars, with at least on character from each type (capital, low, number).
## ChatComp
Main window displaying the user's chats. Allows user to upload or record image, audio and video files and send in a chat. Contains three parts:
1.  left bar - contains user's data, add chat and logout btns. 
2.  Middle section - contains chats list: an array of ChatItem objects.
3.  Right section - saved for displaying each chat's content.
###### Notes
> - new addressee name must be unique.
### ChatItem
contains all data of the chat: addressee image, name, last message info and mainly - a chatDisplayItem which iteslf contains all messages of the chat. When the chatItem is clicked he requests the main chat component to project its display item on the right section.
#### ChatDisplayItem
Contains all the inputs (text typing area, uploading windows, recording windows) and outputs (all messages sent). Upload/Record btns are made of the ssame object - MultiMediButton - which changes it's purpose according to its attributes values.
###### Notes
> - messages sent by user are in light-green background. Received messages in white background color.
