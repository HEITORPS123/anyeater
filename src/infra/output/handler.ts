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
        
        for (let filename in this.infosList) {
        console.log(this.infosList[filename] + '                               ' + filename)
        }

        console.log('--------------------------------------------------------------')

        for (let nodeType in this.typesInfo) {
        console.log(nodeType + '  =  ' + this.typesInfo[nodeType])
        }
    }
}
