import { FilesReader } from './infra/reader/file'
import { OutputHandler } from './infra/output/handler'
import { ArgumentsParser } from './data/argsParser'
import { OptionValues } from 'commander'
import * as ts from "typescript"
import * as fs from "fs"
import * as glob from 'glob'
  
var typesDict: { [id: string] : number; } = {}
var genericTypesPerFile: { [id: string] : number; } = {}
var options: OptionValues

function index() {
    // const dir = '../tcc/tmp/alpaca'
    const argsParser = new ArgumentsParser()
    argsParser.createArguments()
    argsParser.parse(process.argv)
    options = argsParser.getOptions()

    const filesReader = new FilesReader(options)
    const filesList = filesReader.getFiles(options.path)
    for(const sourceFile of filesList) {
        (() => generateAst(sourceFile, sourceFile, sourceFile.fileName))();
    }

    const outputFormat = options.format ?? 'std'
    switch (outputFormat) {
        case 'std':
            const outputHandler = new OutputHandler(typesDict, genericTypesPerFile)
            outputHandler.printOutput()
            break
        case 'csv':
            break
        case 'xml':
            break
    }
}

const generateAst = (node: ts.Node, sourceFile: ts.SourceFile, filename: string) => {
    const syntaxKind = ts.SyntaxKind[node.kind];
    const nodeText = node.getText(sourceFile);

    var currentNode = node.parent
    if (syntaxKind == 'AnyKeyword') {
        let { line, character } =  sourceFile.getLineAndCharacterOfPosition(node.getStart())
        var parentType = ts.SyntaxKind[currentNode?.kind]
        while (parentType == 'ArrayType' || parentType == 'UnionType') {
            currentNode = currentNode?.parent
            parentType = ts.SyntaxKind[currentNode.kind]
        } 
        if (options.verbose) {
            console.log(`${parentType}    ${sourceFile.fileName}@${line}:${character}`)
        }
        typesDict[parentType] !== undefined ? typesDict[parentType]++ : typesDict[parentType] = 1
        genericTypesPerFile[filename] !== undefined ? genericTypesPerFile[filename]++ : genericTypesPerFile[filename] = 1
    }

    node.forEachChild((child) => generateAst(child, sourceFile, filename));
}

index()