import {setUser, readConfig} from "./config"


function main(){
    setUser("Vadney");
    const config = readConfig();

    console.log(config)
}

main();