const [, , ...args] = process.argv;

class MaqeBot {
    constructor(args) {
        this.facing = "North";
        this.positionX = 0;
        this.positionY = 0;
        this.args = args;
        this.directions = ["R", "L"];
    }

    init() {
        if (!this.args.length || this.args.length > 1) {
            return "Error: Invalid args";
        } else {
            const command = this.args[0] || "";
            if (command) {
                if (/^[WRL0-9]+$/.test(command)) {
                    if (!/[RL]\d+/.test(command)) {
                        const result = this.process(command);
                        return result;
                    } else {
                        return "Error: Invalid walk command";
                    }
                } else {
                    return "Error: Invalid command";
                }
            } else {
                return "Error: Invalid command";
            }
        }
    }

    process(command) {
        const actions = command.split(/(?=[RL]+)|(?=W\d+)/).filter(Boolean);
        actions.forEach((action) => {
            if (this.directions.includes(action)) {
                this.direction(action);
            } else {
                const walkSteps = action.split(/W/g).filter(Boolean);
                this.walk(walkSteps[0]);
            }
        });

        return `X: ${this.positionX}, Y: ${this.positionY}, Direction: ${this.facing}`;
    }

    walk(walkSteps) {
        switch (this.facing) {
            case "North":
                this.positionY = +walkSteps + this.positionY;
                break;
            case "South":
                this.positionY = this.positionY - +walkSteps;
                break;
            case "East":
                this.positionX = +walkSteps + this.positionX;
                break;
            case "West":
                this.positionX = this.positionX - +walkSteps;
                break;
            default:
                break;
        }
    }

    direction(direction) {
        switch (this.facing) {
            case "North":
                this.facing = direction === "R" ? "East" : "West";
                break;
            case "East":
                this.facing = direction === "R" ? "South" : "North";
                break;
            case "South":
                this.facing = direction === "R" ? "West" : "East";
                break;
            case "West":
                this.facing = direction === "R" ? "North" : "South";
                break;
            default:
                break;
        }
    }
}

const bot = new MaqeBot(args);
const result = bot.init();
console.log(result);
