import {seeds} from "../seeds";

export function getRandomSeedServer(){

    const seedWithoutMeSeed = seeds.filter(seed => seed.user != process.env.USER_NAME);

    console.log("-----------------------------------------");
    console.log("getting random seed server.");
    console.log("-----------------------------------------");
    
    return seedWithoutMeSeed[Math.floor(Math.random()*seedWithoutMeSeed.length)];
}