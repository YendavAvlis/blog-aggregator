import fs from "fs"
import os from "os"
import path from "path"

export type Config = {
    dbUrl: string;
    currentUserName: string;
}

export function readConfig(): Config {
    const filePath = path.join(os.homedir(), ".gatorconfig.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const rawConfig = JSON.parse(fileContents)

    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    }

    return config;

}

export function setUser(username: string): void {
    const config = readConfig();
    config.currentUserName = username;

    const jsonConfig = {
        db_url: config.dbUrl,
        current_user_name: config.currentUserName
    };

    const filePath = path.join(os.homedir(), ".gatorconfig.json");
    fs.writeFileSync(filePath, JSON.stringify(jsonConfig))
}

