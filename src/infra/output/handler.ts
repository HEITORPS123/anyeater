export class OutputHandler {
    typesInfo: any
    infosList: any
    options: any

    constructor(typesInfo: any, infosList: any, options: any) {
        this.typesInfo = typesInfo
        this.infosList = infosList
        this.options = options
    }

    printOutput() {
        console.log('--------------------------------------------------------------')
        console.log(' files analyzed')
        console.log('==============================================================')
        console.log('NGT             >>>>>>            file')
        console.log('--------------------------------------------------------------')
        
        const threshold = parseInt(this.options.threshold)
        let thresholdViolations: string[] = []
        if (threshold) {
            for (let filename in this.infosList) {
                const output = `${this.infosList[filename]}                               ${filename}`
                if (this.infosList[filename] < threshold) {
                    console.log(output)
                } else {
                    thresholdViolations.push(output)
                }
            }

            console.log()
            console.log(`-------------!!! WARNING: NUMBER OF 'any's > ${threshold} !!!------------`)
            console.log()
            for (const line of thresholdViolations) {
                console.log(line)
            }
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
