import * as ts from "typescript"

export class CodeParser {
    options: any
    typesDict: { [id: string] : number; }
    genericTypesPerFile: { [id: string] : number; }

    constructor(options: any) {
        this.options = options
        this.typesDict = {}
        this.genericTypesPerFile = {}
    }

    generateAst(node: ts.Node, sourceFile: ts.SourceFile, filename: string) {
        const syntaxKind = ts.SyntaxKind[node.kind];
        const nodeText = node.getText(sourceFile);
    
        var currentNode = node.parent
        //if (ts.isTypeNode(node)) {
        //    console.log(nodeText)
        //}
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
            this.typesDict[parentType] !== undefined ? this.typesDict[parentType]++ : this.typesDict[parentType] = 1
            this.genericTypesPerFile[filename] !== undefined ? this.genericTypesPerFile[filename]++ : this.genericTypesPerFile[filename] = 1
        }
    
        node.forEachChild((child) => this.generateAst(child, sourceFile, filename));
    }
}