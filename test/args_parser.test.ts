import { ArgumentsParser } from '../src/data/parser/args'

describe("Test ArgumentsParser", () => {
    let parser: ArgumentsParser

    beforeEach(() => {
        parser = new ArgumentsParser()
        parser.createArguments()
    })
      
    test('Parse threshold', () => {
        parser.parse(['node', 'anyeater', '-t', '5'])
        const options = parser.getOptions()
        expect(options.threshold).toBe('5')
    })

    test('Parse verbose', () => {
        parser.parse(['node', 'anyeater', '-V'])
        const options = parser.getOptions()
        expect(options.verbose).toBe(true)
    })

    test('Parse whitelist', () => {
        parser.parse(['node', 'anyeater', '-w', 'exemplo.txt'])
        const options = parser.getOptions()
        expect(options.whitelist).toBe('exemplo.txt')
    })

    test('Parse format', () => {
        parser.parse(['node', 'anyeater', '-f', 'csv'])
        const options = parser.getOptions()
        expect(options.format).toBe('csv')
    })
})