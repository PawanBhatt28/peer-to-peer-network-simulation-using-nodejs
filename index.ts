// Go beyond basic messaging: Instead of just sending text messages, implement functionalities like file sharing or collaborative editing. 
// This demonstrates a more comprehensive understanding of peer-to-peer applications.
// Incorporate a discovery mechanism: Manually setting up servers limits scalability. 
// Explore implementing a discovery mechanism using services like DNS-based Service Discovery or Zeroconf. This showcases your knowledge 
// of real-world solutions for peer-to-peer networks.
// Security Considerations: Think about security implications in a peer-to-peer network. 
// How will you authenticate users and prevent unauthorized access? Consider implementing encryption techniques to secure communication.
// This demonstrates your awareness of security best practices.

import { Request, Response } from "express";
import express from "express";
import {getRandomSeedServer} from "./src/getRandomSeedServer";
import {registerWithSeedServer} from "./src/registerWithSeedServer";
import {register} from "./src/Routes/register";
import {lookup} from "./src/Routes/lookup";
import {seeds} from "./seeds";
import {addNode, allNodes} from "./src/servers";
import { send } from "./src/Routes/send";
import { message } from "./src/Routes/message";

const app = express();
const PORT = process.env.PORT ?? 3000;
const delay = parseInt(process.env.DELAY || "0");
console.log(`Delay : ${delay}`);


// some middleware converting POST body into JSON i guess.
app.use(express.json());


app.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
})

app.get("/", (req : Request, res : Response) => {res.send("wassup biatch!!");})

app.post("/register", register);
app.get("/lookup", lookup);
app.post("/send", send);
app.post("/message", message);

async function initialise(){
    console.log("-----------------------------------------");

    console.log("Manually adding nodes : ");
    for(let seed of seeds){
        addNode(seed); // adding to server Object inside servers.ts file.
    }

    
    const randomSeedServer = getRandomSeedServer();
    console.log(`Seed server found : ${randomSeedServer.user}`);

    const registeredJSON = await registerWithSeedServer(randomSeedServer.uri);    //will return a promise, if user registered or not.
    console.log("-----------------------------------------");

}
    
initialise();
// }

// setTimeout( () => {
//     main();
// }, delay);

