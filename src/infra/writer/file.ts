import * as fs from "fs"

export class FilesWriter {
    options: any
    infosList: any

    constructor(options: any, infosList: any) {
        this.infosList = infosList
    }

    writeCSV() {
        let data: string = "NGT,filename\n"
        for (let filename in this.infosList) {
            data += `${this.infosList[filename]},${filename}\n`
        }
        this.writeToFile(data)
    }

    writeXML() {
        console.error("Method not implemented")
    }

    writeToFile(data: string) {
        fs.writeFile('form-tracking/formList.csv', data, 'utf8', function (err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.')
            } else{
                console.log('It\'s saved!')
            }
        })
    }
}