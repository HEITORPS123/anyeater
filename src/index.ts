import { OutputHandler } from './data/outputHandler'
import * as ts from "typescript"
import * as fs from "fs"
import * as glob from 'glob'
  
var typesDict: { [id: string] : number; } = {}
var genericTypesPerFile: { [id: string] : number; } = {}

function index() {
    const dir = './typehero'
    const filesList = getFiles(dir)
    for(const sourceFile of filesList) {
        (() => generateAst(sourceFile, sourceFile, sourceFile.fileName))();
    }

    const outputHandler = new OutputHandler(typesDict, genericTypesPerFile)
    outputHandler.printOutput()
}

function getFiles(dir: string) {
    const tsPostfix = '/**/*.ts'
    var dirList: string[] = glob.sync(dir + tsPostfix)

    const filesList: ts.SourceFile[] = []
    for (var filename of dirList) {
        const sourceFile = ts.createSourceFile(filename,
        fs.readFileSync(filename).toString(), 
        ts.ScriptTarget.Latest,
        true);
        filesList.push(sourceFile)
    }

    return filesList
}

const generateAst = (node: ts.Node, sourceFile: ts.SourceFile, filename: string) => {
    const syntaxKind = ts.SyntaxKind[node.kind];
    const nodeText = node.getText(sourceFile);

    var currentNode = node.parent
    if (syntaxKind == 'AnyKeyword') {
        //console.log(filename)
        var parentType = ts.SyntaxKind[currentNode?.kind]
        while (parentType == 'ArrayType' || parentType == 'UnionType') {
        currentNode = currentNode?.parent
        parentType = ts.SyntaxKind[currentNode.kind]
        } 
        console.log(parentType + '  ' + currentNode.getText(sourceFile))
        typesDict[parentType] !== undefined ? typesDict[parentType]++ : typesDict[parentType] = 1
        genericTypesPerFile[filename] !== undefined ? genericTypesPerFile[filename]++ : genericTypesPerFile[filename] = 1
    }

    node.forEachChild((child) => generateAst(child, sourceFile, filename));
}

function printCSV() {}

function printXML() {}

index()