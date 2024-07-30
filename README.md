
<div align="center">
    <img
      src="logo.png"
      width="400"
      height="auto"      
    />
  </a>
</div>

<div align="center">
    
[![npm version](https://img.shields.io/badge/npm-v0.0.3-red)](https://www.npmjs.com/package/anyeater)
[![license](https://img.shields.io/github/license/HEITORPS123/anyeater)](https://github.com/HEITORPS123/anyeater?tab=MIT-1-ov-file#readme)
[![Benchmark Suite](https://img.shields.io/github/actions/workflow/status/HEITORPS123/anyeater/release-package.yml)](https://github.com/HEITORPS123/anyeater/actions/workflows/release-package.yml)

</div>

##

AnyEater is a command-line tool that analyzes Typescript code projects and provides a detailed report on the use of the generic type "any". According to Microsoft's own Typescript wiki, the use of "any" should be avoided at all costs, only being acceptable in instances where a codebase is being converted from Javascript to Typescript, therefore it should be considered a code-smell. Inspired by other projects such as Lizard and PMD, aims to eliminate the need to use it by outlining exactly where and how much the generic type is used.

## Install

First of all, you can install the project through the node package manager (npm) which is the main recommended way:

    npm install anyeater

There's also the option of downloading the source code and building it yourself

    node index.js

## Usage

In order to use the AnyEater tool, after a successful installation, you can simply invoke the program via command line

    anyeater <path-to-project>

Or, if the program is not in your path

    npx anyeater

## Options

    -h, --help          exhibits all possible command line options for anyeater
    --version           prints version number
    -V, --verbose       prints all outputs in detailed manner
    -t, --threshold <number>        
                        defines number of generic types used in a file that should generate a warning
    -w, --whitelist <whitelist-path>        
                        defines files that the program should ignore when analyzing a project
    -f, --format <type>        
                        defines type of format output should be printed in

## License

AnyEater is distributed under the MIT license.
