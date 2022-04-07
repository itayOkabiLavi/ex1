# Project Structure:
## index > body , App (func)
body is reffered to as App (id='r')
Switches between Login window and Chat window, Where Login itself contains the Register window.
App stores the authentications details after login.
## Login (class)
Starts by entering default registered users - goku (pwd = gohan1) and vegeta (pwd = bulma2).
When login btn is clicked the details are searched in the DB "users", and the result changes
the App token state.
When register btn is pressed, the state.registerClicked variable is set to true which turns the
result of the condition {this.state.registerClicked ? /*show register*/ : /*show login*/ } to
the Register window.
### Register