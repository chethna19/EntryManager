# Entry Manager
An entry management application that captures the details of the visitor and the host and notifies them through email and sms

## Steps to run the project:
1. Install mongodb. 
Link for installation instruction https://docs.mongodb.com/manual/administration/install-community. 
2. Then start mongodb using the command `sudo service mongod start`.
3. Clone this repository and open the folder cloned through the command line.
4. Make sure you have npm, nodeJS installed. 
5. To send the sms, you will need to have an account on twilio. 
You can either buy a number or use the trial number.
6. If using the trial number, the numbers to which messages have to be sent will have to be entered in 
the list of verified numbers on the twilio website. https://www.twilio.com/console/phone-numbers/verified
7. Navigate to server/controllers/details.js. 
8. Here enter the Account Sid, Auth Token and the number from which you want to send the messages from your twilio account.
9. Also enter your email id and password for the account through which the email has to be sent.
10. Navigate to the server folder through the terminal and type the command `sudo npm install`. Then type command `sudo node index.js`.
11. In another terminal, navigate to the client folder and type the command `sudo npm install`. Then type command `sudo npm start`.
12. This should open the development server automatically. If not, then go to `http://localhost:3000` to see the application running.

## Approach
### Front-end: ReactJS
### Backend: NodeJS, MongoDB and Express
The details of the visitor and the host is captured using a form and stored in MongoDB. Node packages nodemailer and twilio
are used for sending emails and sms respectively.
