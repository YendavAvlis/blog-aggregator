import { CommandRegistry, handlerLogin, registerCommand, runCommand } from "./command";
import {setUser, readConfig} from "./config"

function main(){

    try {
        const registry: CommandRegistry = {}
        registerCommand(registry, "login", handlerLogin)

        const args = process.argv.slice(2)

        if(args.length < 1) {
            console.log("Usage: gator <command> [args...]")
            process.exit(1)
        }
        const cmdName = args[0]
        const username = args.slice(1)

        runCommand(registry, cmdName, ...username)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
    
}

main();