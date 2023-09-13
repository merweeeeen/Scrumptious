const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// THIS IS GET /ROLE => TO GET 
app.get('/role', async (req, res) => {
    // This is to check if email parameter contails anything
    console.log("Role MS successfully called")
    console.log(req.body)
    //{
    //   email: 'lixuen.low.2021@scis.smu.edu.sg',
    //   subject: 'test from FreeBee',
    //   message: 'This is a test from FreeBee!'
    // }
    // console.log(req.params)
    // console.log(req.params.email)
    if (req.body != null && req.body != undefined && req.body != '' && req.body != ' ' && req.body != {}){
        console.log("sending mail ")
        console.log(req.body)
        email = req.body.email
        subject = req.body.subject
        message = req.body.message
        // try {
        //     // This tries to send the email
        //     const result = await mail.sendingMail(email, subject, message);
        //     console.log(result)
        //     // res.status(200).send('ITS OKAY!!')
        //     // If the email sending is successful, it will return a string
        //     if ( result.includes("Message sent") ){
        //         console.log('email sent ' + 250)
        //         let result = { result: "successful", statusCode: '250' };
        //         res.json(result);
        //         return result;
        //     }
        // } catch (error) {
        // console.log('email not sent ' + 500)
        // let result = { result: "internal error with emailing.js", statusCode: '500' };
        // res.json(result);
        // return result;
        // }
    }
    else{
        let result = { result: "invalid parsing", statusCode: '422' };
        res.json(result);
        return result;
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})