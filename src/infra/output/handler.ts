import CliTable3 from "cli-table3"

export class OutputHandler {
    typesInfo: any
    infosList: any
    options: any
    numberOfFiles: number

    constructor(typesInfo: any, infosList: any, options: any) {
        this.typesInfo = typesInfo
        this.infosList = infosList
        this.options = options
        this.numberOfFiles = Object.keys(this.infosList).length
    }

    printOutput() {
        let table = new CliTable3({
            head: ['NGT', 'Filename']
        })

        console.log('--------------------------------------------------------------')
        console.log(this.numberOfFiles.toString() + ' files analyzed')
        console.log('==============================================================')
       
        const threshold = parseInt(this.options.threshold)
        let thresholdViolations: string[] = []
        if (threshold) {
            for (let filename in this.infosList) {
                if (this.infosList[filename] < threshold) {
                    table.push([this.infosList[filename],filename])
                } else {
                    thresholdViolations.push(filename)
                }
            }
            table.push(['-',`WARNING: NUMBER OF 'any's > ${threshold} !!!`])
            for (const filename of thresholdViolations) {
                table.push([this.infosList[filename],filename])
            }
            console.log(table.toString())
        } else {
            for (let filename in this.infosList) {
                console.log(this.infosList[filename] + '                               ' + filename)
            }
        }

        console.log('--------------------------------------------------------------')

        for (let nodeType in this.typesInfo) {
        console.log(nodeType + '  =  ' + this.typesInfo[nodeType])
        }
    }
}
