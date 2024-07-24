import * as ts from "typescript"

export class CodeParser {
    options: any
    typesDict: { [id: string] : any; }
    typeCount: { [id: string]: number; }
    genericTypesPerFile: { [id: string] : number; }

    constructor(options: any) {
        this.options = options
        this.typesDict = {}
        this.typeCount = {}
        this.genericTypesPerFile = {}
    }

    generateAst(node: ts.Node, sourceFile: ts.SourceFile, filename: string) {
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
            if (this.options.verbose) {
                console.log(`${parentType}    ${sourceFile.fileName}@${line}:${character}`)
            }
            this.typeCount[parentType] !== undefined ? this.typeCount[parentType]++ : this.typeCount[parentType] = 1
            this.genericTypesPerFile[filename] !== undefined ? this.genericTypesPerFile[filename]++ : this.genericTypesPerFile[filename] = 1

            if (this.typesDict[filename] === undefined) this.typesDict[filename] = {}
            if (this.typesDict[filename][parentType] === undefined) {
                this.typesDict[filename][parentType] = 1
            } else {
                this.typesDict[filename][parentType] += 1
            }
        }
    
        node.forEachChild((child) => this.generateAst(child, sourceFile, filename));
    }
}