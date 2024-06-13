import { FilesReader } from './infra/reader/file'
import { OutputHandler } from './infra/output/handler'
import { ArgumentsParser } from './data/parser/args'
import { OptionValues } from 'commander'
import * as ts from "typescript"
import { CodeParser } from './data/parser/code'

var options: OptionValues

function index() {
    const argsParser = new ArgumentsParser()
    argsParser.createArguments()
    argsParser.parse(process.argv)
    options = argsParser.getOptions()

    const filesReader = new FilesReader(options)
    const filesList = filesReader.getFiles()

    const parser = new CodeParser(options)
    for(const sourceFile of filesList) {
        (() => parser.generateAst(sourceFile, sourceFile, sourceFile.fileName))();
    }

    const outputFormat = options.format ?? 'std'
    switch (outputFormat) {
        case 'std':
            const outputHandler = new OutputHandler(parser.typesDict, parser.genericTypesPerFile, options)
            outputHandler.printOutput()
            break
        case 'csv':
            break
        case 'xml':
            break
    }
}

index()