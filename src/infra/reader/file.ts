import * as fs from "fs"
import * as glob from 'glob'
import * as ts from "typescript"

export class FilesReader {
    path: string
    options: any
    filePostfix: string

    constructor(path: string, options: any) {
        this.path = path
        this.options = options
        this.filePostfix = '/**/*.ts'
    }

    getFiles() {
        var dirList: string[] = glob.sync(this.path + this.filePostfix)
        var filesToExclude: string[] = []
        if (this.options.whitelist) {
            filesToExclude = fs.readFileSync(this.options.whitelist).toString().split('\n')
        }
    
        const filesList: ts.SourceFile[] = []
        for (var filename of dirList) {
            if (filesToExclude.includes(filename)) {
                continue
            }
            const sourceFile = ts.createSourceFile(filename,
            fs.readFileSync(filename).toString(), 
            ts.ScriptTarget.Latest,
            true);
            filesList.push(sourceFile)
        }
    
        return filesList
    }
}