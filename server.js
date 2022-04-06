const { response } = require('express');
const express = require('express')
const truecallerjs  = require('truecallerjs')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

var mynumber = ""



app.get('/', (req , res) =>{
    res.render('data', {name: "name", carrier:"carrier", city:"city",  timezone:"timezone", email:"Email", code:"Dialing Code"})
    console.log(req.body.myfile)
    
})

// app.post('/', (req, res)=>{
//     console.log(req.body)
//     mynumber = req.body.myfile
//     console.log(mynumber)
// })

    


app.post('/', (req, res) =>{

    let searchData = {
        number: req.body.myfile,
        countryCode: "IN",
        installationId: "a1i0B--YFvJq5-mVMgccpJGeu0qlV9di0kNNTn345hXlCPdPeSGVxNf_K6ICEk4_",
        output: "JSON"
    }
    
    let sn = truecallerjs.searchNumber(searchData);
    sn.then(function(response) {

        console.log(req.body.myfile)

        
        var obj = JSON.parse(response)
        let name = obj.data[0].name
        let carrier  = obj.data[0].phones[0].carrier
        let dialingCode = obj.data[0].phones[0].dialingCode
        
        let city =  obj.data[0].addresses[0].city
        let timeZone = obj.data[0].addresses[0].timeZone
        console.log(obj.data[0].name)
        console.log(obj.data[0].phones[0].carrier)
        console.log(obj.data[0].phones[0].dialingCode)
      
        console.log(obj.data[0].phones[0].countryCode)
        console.log(obj.data[0].addresses[0].city)
        console.log(obj.data[0].addresses[0].timeZone)

        try{

            const email = obj.data[0].internetAddresses[0].id
            if(email == null){

                res.render('data', {name: name, carrier:carrier, city:city,  timezone:timeZone, email:"No email provided",code:dialingCode})
            }
            
            else{
                res.render('data', {name: name, carrier:carrier, city:city,  timezone:timeZone, email:email,code:dialingCode})
                
            }
            
        }catch{
            
            res.render('data', {name: name, carrier:carrier, city:city,  timezone:timeZone, email:"No data Provided",code:dialingCode})
        }

            
        
        


    
    

});



    
})

app.listen(8000, () =>{
    console.log("app listening")
})
