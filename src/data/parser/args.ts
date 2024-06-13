import { Command } from 'commander'
const projectInfos = require('../../package.json')

export class ArgumentsParser {
    program: Command

    constructor() {
        this.program = new Command()
    }

    createArguments() {
        this.program.version(projectInfos.version, '-v, --vers', 'output the current version')
        this.program
            .option('-p, --path <project-path>', 'path to project')
            .option('-t, --threshold', 'limit to define excessive generic type use')
            .option('-V, --verbose', 'activate verbose mode')
            .option('-w, --whitelist', 'path to file containing files to exclude from analysis')
            .option('-f, --format <type>', 'type of format to print (standard, csv, xml)')
    }

    parse(args: string[]) {
        this.program.parse(args)
    }

    getOptions() {
        return this.program.opts()
    }
}