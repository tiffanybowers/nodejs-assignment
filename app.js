const { promises: fs } = require("fs");

const command = process.argv

if(command[2] === 'user.txt' && command[3] === 'tweet.txt') {
    (async() => {
        try {
            let userData = await fs.readFile("user.txt", "ascii");
            let tweetData = await fs.readFile("tweet.txt", "ascii");

            userData = userData.split('\n');
            tweetData = tweetData.split('\n');
            let users = {};

            for (const userRow of userData) {
                const followData = userRow.split(' follows ');
                follower = followData[0];
                followedUsers = followData[1].split(',');

                for (const followedUser of followedUsers) {
                    user = followedUser.trim();

                    if (users[user] === undefined) {
                        users[user] = [follower];
                    } else if (!users[user].includes(follower)) {
                        users[user].push(follower);
                    }
                }

                if (users[follower] === undefined) {
                    users[follower] = [];
                }
            }

            const sortedUsers = Object.keys(users).sort().reduce(
                (obj, key) => {
                    obj[key] = users[key];
                    return obj;
                },
                {}
            );

            for (const user of Object.keys(sortedUsers)) {
                console.log(user);

                for (const tweetRow of tweetData) {
                    const tweet = tweetRow.split("> ");
                    const tweetedUser = tweet[0];
                    const tweetOfUser = tweet[1].substring(0, 140);
                    const followers = users[tweetedUser];

                    if (user === tweetedUser || followers.includes(user)) {
                        console.log('\t@' + tweetedUser + ': ' + tweetOfUser);
                    }
                }
            }


        } catch (e) {
            console.log("err:", e);
        }
    })()
} else {
    console.log("To run this NodeJS program, it needs to take two arguments, namely user.txt and tweet.txt");
    process.exit(1);
}