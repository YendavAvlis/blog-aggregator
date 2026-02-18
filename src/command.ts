import { setUser } from "./config";

export type CommandHandler = (cmdName: string, ...args: string[]) => void;
export type CommandRegistry = Record<string, CommandHandler>;

export function handlerLogin(cmdName: string, ...args: string[]) {
    if(args.length === 0) {
        throw new Error ("the login handler expects a single argument, the username")
    }

    const username = args[0];
    setUser(username)
    console.log("The username has been set!")

}

export function registerCommand(registry: CommandRegistry, cmdName: string, handler: CommandHandler) {
    const key = cmdName
    const value = handler

    registry[key] = value
}

export function runCommand(registry: CommandRegistry, cmdName: string, ...args: string[]) {
    const handler = registry[cmdName]

    if(!handler){
        throw new Error(`Unknown command: ${cmdName}`)
    }

    handler(cmdName, ...args)
}