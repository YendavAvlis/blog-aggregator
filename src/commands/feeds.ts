import { readConfig } from "src/config";
import { createFeed, getAllFeeds } from "src/lib/db/queries/feeds";
import { getUser, getUserById } from "src/lib/db/queries/users";
import { Feed, User } from "../lib/db/schema";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <name> <url>`);
    }

    const config = readConfig();
    const user = await getUser(config.currentUserName);

    if(!user) {
        throw new Error(`User ${config.currentUserName} not found`);
    }

    const feedName = args[0]
    const feedUrl = args[1]

    const feed = await createFeed(feedName, feedUrl, user.id)

    if (!feed) {
        throw new Error(`Failed to create feed: ${feedName}`);
    }

    console.log("Feed created successfully!");

    function printFeed(feed: Feed, user: User) {

        console.log(`* User ID: ${user.id}`)
        console.log(`* Feed Name: ${feed.name}`)
        console.log(`* Feed URL: ${feed.url}`)
    }

    printFeed(feed, user);

}

export async function handlerListFeeds(cmdName: string, ...args: string[]) {
    const feeds = await getAllFeeds()

    for(const feed of feeds){
        const user = await getUserById(feed.userId);
        if (user) {
            console.log(`* User: ${user.name}`);
        }

        console.log(`* ${feed.name}`)
        console.log(`* ${feed.url}`)
    
    }
}