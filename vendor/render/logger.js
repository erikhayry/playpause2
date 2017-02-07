export class Logger {
    constructor(name, color) {
        this.name = name;
        this.style = `color: ${color}; font-weight: bold;`;
    }
    log(where, ...args) {
        console.log(`%c ${this.name}.${where}`, this.style, args);
    }
}
