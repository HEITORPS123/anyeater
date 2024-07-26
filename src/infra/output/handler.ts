import CliTable3 from "cli-table3"
import chalk from "chalk"
import figlet from "figlet"

export class OutputHandler {
    typesInfo: any
    typeCount: any
    infosList: any
    options: any
    numberFilesFlagged: number
    numberFilesTotal: number

    constructor(typesInfo: any, typeCount: any, infosList: Record<string, number>, numberFilesTotal: any, options: any) {
        this.typesInfo = typesInfo
        this.typeCount = typeCount
        this.infosList = Object.fromEntries(
            Object.entries(infosList).sort(([,a],[,b]) => a-b)
        )
        this.options = options
        this.numberFilesFlagged = Object.keys(this.infosList).length
        this.numberFilesTotal = numberFilesTotal
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
        console.log(this.numberFilesTotal.toString() + ' files were analyzed')
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
        console.log(this.numberFilesFlagged.toString() + ' files contained generic types')
        console.log('--------------------------------------------------------------')

        let totalNgt = 0
        let totalFirstType = 0
        let totalSecondType = 0
        for (let filename in this.infosList) {
            totalNgt += this.infosList[filename]
            totalFirstType += this.typesInfo[filename][keysSorted[0]] ?? 0
            totalSecondType += this.typesInfo[filename][keysSorted[1]] ?? 0
        }

        let sumTable = new CliTable3({
            head: ['Number of Files', 'Total NGT', `Total ${keysSorted[0]}`, `Total ${keysSorted[1]}`]
        })
        sumTable.push([this.numberFilesFlagged.toString(), totalNgt, totalFirstType, totalSecondType])
        console.log(sumTable.toString())
    }
}
