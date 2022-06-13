export type Cursor = {
    id: string;
    name: string;
    x: string;
    y: string;
    color?: string;
};

export type Message = {
    id: string;
    user: {
        id: string;
        name: string;
    };
    value: string;
    time: number;
};
