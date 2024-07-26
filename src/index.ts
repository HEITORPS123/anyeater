#!/usr/bin/env node

import { FilesReader } from './infra/reader/file'
import { OutputHandler } from './infra/output/handler'
import { ArgumentsParser } from './data/parser/args'
import { OptionValues } from 'commander'
import * as ts from "typescript"
import { CodeParser } from './data/parser/code'
import { FilesWriter } from './infra/writer/file'

var options: OptionValues

function index() {
    const argsParser = new ArgumentsParser()
    argsParser.createArguments()
    argsParser.parse(process.argv)
    const path = argsParser.getPath()
    options = argsParser.getOptions()

    const filesReader = new FilesReader(path, options)
    const filesList = filesReader.getFiles()
    const numberFilesTotal = Object.keys(filesList).length

    const parser = new CodeParser(options)
    for(const sourceFile of filesList) {
        (() => parser.generateAst(sourceFile, sourceFile, sourceFile.fileName))();
    }

    const outputHandler = new OutputHandler(parser.typesDict, parser.typeCount, parser.genericTypesPerFile, numberFilesTotal, options)
    outputHandler.printTitle()

    const outputFormat = options.format ?? 'std'

    const filesWriter = new FilesWriter(options, parser.genericTypesPerFile)
    switch (outputFormat) {
        case 'std':
            outputHandler.printOutput()
            break
        case 'csv':
            filesWriter.writeCSV()
            break
    }
}

index()