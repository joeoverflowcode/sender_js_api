import fetch from 'node-fetch'
import express from 'express'
import dotenv from 'dotenv'

const app = express()
app.use(express.json())
dotenv.config()

// interface SubscriberData{
//     email: string;
//     firstname: string;
//     lastname: string;
//     groups: string[];
//     phone: string;
//     trigger_automation: boolean;
// }

const BEARER_TOKEN = process.env.BEARER_TOKEN
const handleAddSubscriber = async (req, res) => {
    try {
        console.log('received new POST request')
        console.log('request body:', req.body)
        const url = new URL("https://api.sender.net/v2/subscribers")

        const headers = {
            "Authorization": `Bearer ${BEARER_TOKEN}`,
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }

        const data = 
        //     {
        //     "email": "server@test.joe",
        //     "firstname" : "server",
        //     "lastname" : "test",
        //     "groups" : ["erX9Jw"],
        //     "fields" : {
        //         "{$test_text}": "Documentation example",
        //         "{$test_num}": 8
        //     },
        //     "phone": "+18881112233",
        //     "trigger_automation" : false
        // },


        // {
        //     "email": "test@sender05.com",
        //     "firstname": "Sender05",
        //     "lastname": "severTest",
        //     "groups": ["erX9Jw", "avDZNV", "dwZrOJ"],
        //     "phone": "+18888888881",
        //     "trigger_automation": false,
        //   }
        {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            groups: req.body.groups,
            phone: req.body.phone,
            trigger_automation: false,
        }
        
        console.log('Sending data:', data)

        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        })

        const result = await response.json()

        console.log('Response from API:', result)

        res.status(200).json(result)
    } catch (error) {
        console.error('Error during subscriber creation',error)
        res.status(500).json({error: 'Internal server error'})
    }
}

app.post('/subscribers', handleAddSubscriber)

app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})
