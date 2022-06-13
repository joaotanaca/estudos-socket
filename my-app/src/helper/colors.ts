const colors: string[] = [];

for (let index = 0; index <= 9; index++) {
    colors.push(Math.floor(Math.random() * 16777215).toString(16));
}

export default colors;
