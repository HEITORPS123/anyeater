# AnyEater

AnyEater is a command-line tool that analyzes Typescript code projects and provides a detailed report on the use of the generic type "any". According to Microsoft's own Typescript wiki, the use of "any" should be avoided at all costs, only being acceptable in instances where a codebase is being converted from Javascript to Typescript, therefore it should be considered a code-smell.

# Getting Started

First of all, you can install the project through the node package manager (npm) which is the main recommended way:

``` npm install anyeater ``` 

There's also the option of downloading the source code and building it yourself

``` node index.js ```

# Usage

In order to use the AnyEater tool, after a successful installation, you can simply invoke the program via command line

``` anyeater <path-to-project> ``` 

Visualize the available command-line arguments via the help command

``` anyeater --help ``` 
