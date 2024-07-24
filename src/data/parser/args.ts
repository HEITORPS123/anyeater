import { Command } from 'commander'
const projectInfos = require('../../../package.json')

export class ArgumentsParser {
    program: Command
    path: string

    constructor() {
        this.program = new Command()
        this.path = './'
    }

    createArguments() {
        this.program.version(projectInfos.version, '-v, --vers', 'output the current version')
        this.program
            .argument('[path]', 'path to the project you wish to analyze', './')
            .option('-t, --threshold <number>', 'limit to define excessive generic type use')
            .option('-V, --verbose', 'activate verbose mode')
            .option('-w, --whitelist <whitelist-path>', 'path to file containing files to exclude from analysis')
            .option('-f, --format <type>', 'type of format to print (standard, csv, xml)')
            .action((path) => {
                this.path = path
            })
    }

    parse(args: string[]) {
        this.program.parse(args)
    }

    getOptions() {
        return this.program.opts()
    }

    getPath() {
        return this.path
    }
}