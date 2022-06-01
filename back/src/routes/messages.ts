const messages: any[] = [];

export const addMessage = (data: any) => {
    messages.push(data);

    return data;
};

export const getChannelMessages = (channel: any) =>
    messages.filter((message) => message.channel === channel);
