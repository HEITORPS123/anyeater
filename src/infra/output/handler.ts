import CliTable3 from "cli-table3"
import chalk from "chalk"
import figlet from "figlet"

export class OutputHandler {
    typesInfo: any
    typeCount: any
    infosList: any
    options: any
    numberOfFiles: number

    constructor(typesInfo: any, typeCount: any, infosList: any, options: any) {
        this.typesInfo = typesInfo
        this.typeCount = typeCount
        this.infosList = infosList
        this.options = options
        this.numberOfFiles = Object.keys(this.infosList).length
    }

    printTitle() {
        console.log(figlet.textSync("AnyEater", {font: "Standard"}));
    }

    printOutput() {
        let list = this.typeCount
        const keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]})
        keysSorted.reverse()

        let table = new CliTable3({
            head: ['Filename', 'NGT', keysSorted[0], keysSorted[1]]
        })

        console.log('--------------------------------------------------------------')
        console.log(this.numberOfFiles.toString() + ' files were analyzed')
        console.log('--------------------------------------------------------------')

        const threshold = parseInt(this.options.threshold)
        let thresholdViolations: string[] = []
        if (threshold) {
            for (let filename in this.infosList) {
                if (this.infosList[filename] < threshold) {
                    table.push([filename, this.infosList[filename], this.typesInfo[filename][keysSorted[0]] ?? 0, this.typesInfo[filename][keysSorted[1]] ?? 0])
                } else {
                    thresholdViolations.push(filename)
                }
            }
            table.push([chalk.bgRed.bold(`WARNING: NUMBER OF 'any's > ${threshold} !!!`), '-', '-', '-'])
            for (const filename of thresholdViolations) {
                table.push([filename, this.infosList[filename], this.typesInfo[filename][keysSorted[0]] ?? 0 , this.typesInfo[filename][keysSorted[1]] ?? 0])
            }
        } else {
            for (let filename in this.infosList) {
                table.push([filename, this.infosList[filename], this.typesInfo[filename][keysSorted[0]] ?? 0, this.typesInfo[filename][keysSorted[1]] ?? 0])
            }
        }

        console.log(table.toString())
        console.log('--------------------------------------------------------------')

        for (let nodeType in this.typeCount) {
            console.log(nodeType + '  =  ' + this.typeCount[nodeType])
        }
    }
}
