const users: { [key: string]: string | number } = {};

const addUser = (nickname: string, socketId: any) => {
    users[nickname] = socketId;
};

const removeUser = (nickname: string) => {
    if (users.hasOwnProperty(nickname)) {
        delete users[nickname];
    }
};

module.exports = { users, addUser, removeUser };
