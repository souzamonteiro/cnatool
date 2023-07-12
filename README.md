# CNATool (Complex Network Analysis Tool)

Copyright (C) 2020,2021 Roberto Luiz Souza Monteiro, Renata Souza Barreto, Hernane Borges de Barros Pereira.

The software is provided under the terms of the Apache License, version 2.0, but some modules provided
by third parties may be under different licenses.

Please read the file LICENSE for further information.

The CNATool tool was developed, using the MaiaScript programming language, to allow quick and simplified analysis of graphs of complex networks, from any device connected to the Internet.

The complete documentation, including the EBNF grammar file and the compiler's
syntax diagrams (railroad diagrams), for MaiaScript, can be found in the grammar directory.

For more information send mail to: [mailto:support@maiascript.com](mailto:support@maiascript.com)

Currently the tool allows:

- Display network graph;
- Layout graph;
- Calculat basic properties: Average Grade, Density, Average Clustering - Coefficient, Average Shortest Path, Diameter and Graph Efficiency;
- Display detailed properties of the vertices: Degrees, Clustering, Centrality;
- Save graph in Pajek format;
- Export graph in SVG format;
- Save a summary of graph’s properties in HTML format;
- Use the GPU when available.

To use the online tool, access:

[http://www.maiascript.com/cnatool]

## DEPENDENCIES

The program depends on the following packages:
- algebrite
Install using the command:
`npm install -g algebrite`
- web-worker
Install using the command:
`npm install -g web-worker`
- cross-blob
Install using the command:
`npm install -g cross-blob`
- gpu.js
Install using the command:
`npm install -g gpu.js`

## INSTALL COMMAND LINE INTERFACE (CLI):

To install the CNATool command line tool use the command:

`npm install -g cnatool`

Or, get it from GitHub:

`git clone https://github.com/souzamonteiro/cnatool.git`

Or, download the latest zipped version:

`unzip cnatool-main.zip`

`cd cnatool-main`

`npm install -g .`

## PROBLEMS WHEN INSTALLING USING NPM

Some packages may not be compatible with some Linux distributions or Windows. In these cases, download the program via gitgub, unzip the file and double-click on the index.html file. The GUI will run. It has been tested on Windows, Linux, macOS, iOS and Android using Google Chrome.

## RUN TESTS:

To run the test scripts execute:

`./test.sh`

Please, any testing or development must be carried out in a UNIX environment and if you want to do this in Windows, you must install Cygwin or MSYS. These tools provide a complete UNIX environment on Windows and can be obtained from [https://www.cygwin.com] and [https://www.msys2.org] respectively. Explanations on how to install and use the programs provided with them can be found on their websites.

To facilitate testing in a Windows environment, a script for PowerShell test.cmd is provided, but it is preferable to test this software using the environments provided by Cygwin or MSYS.

To run the tests on Windows, open a command prompt, move to the directory where you unzipped this program and run:

test.cmd

## USING THE COMMAND LINE INTERFACE (CLI) AND CNATool:

To run the command line tool, use the command:

`cnatool [options] [network.net] [--] [arguments]`

To see the command line tool options run the command:

`cnatool --help`

To launch CNATool open the file `index.html`, in the main directory of the package, in a browser.

To try CNATool on-line go to [http://www.maiascript.com/cnatool]

## USING THE SAMPLE FILES

Use the example network files to practice using the command line tool as well as the GUI. They were created by the author and are available under the same license as the program.

### Neural Network of C. elegans

The `examples/c_elegans_neural_network.net` file contains a neural network representation of the C. elegans worm. This network was created for my doctoral thesis and I distribute it here because it is a network with hybrid characteristics (small world and free of scale).

To calculate the parameters of this network, execute the following command, from inside the directory where you unzipped this program:

`./bin/cnatool.js --all examples/c_elegans_neural_network.net`

### Semantic Network

The `semantic.txt` file contains the original text used to create the `semantic.dlf` file, which was manually created from the text file. The DLF file can be used to create a semantic network using the following command:

`./bin/cnatool.js --build --weighted --directed --loops --topology chain examples/semantic.dlf`

This will create the `semantic-net.json` file.

To calculate the parameters of the semantic network created, use the command:

`./bin/cnatool.js --all examples/semantic-net.json`

This will create the `semantic-net.html` file containing the calculated data.

### Complete, Random, Scale-Free, Small World, and Hybrid Networks

In the examples directory there are artificial networks with Complete, Random, Scale-Free, Small World and Hybrid topologies, created using CNATOOL.

To recreate this networks, use the commands:

`./bin/cnatool.js --create --topology complete --vertices 50 --avgdeg 3 --prefix examples/complete`

`./bin/cnatool.js --create --topology random --vertices 50 --avgdeg 3 --prefix examples/random`

`./bin/cnatool.js --create --topology scalefree --vertices 50 --avgdeg 3 --probability 0.3 --prefix examples/scalefree`

`./bin/cnatool.js --create --topology smallworld --vertices 50 --avgdeg 3 --probability 0.3 --prefix examples/smallworld`

`./bin/cnatool.js --create --topology hybrid --vertices 50 --avgdeg 3 --probability 0.3 --prefix examples/hybrid`

The files `complete-1.net`, `random-1.net`, `scalefree-1.net`, `smallworld-1.net` and `hybrid-1.net` will be created.

You can use these files to test the program's graphical interface. For information on how to open files and view them in the graphical interface, consult the program's manual, in the `manual` folder.

## CONTRIBUTORS

Contributions are always appreciated. You can contribute with code improvements, documentation improvements, implementation of new features or testing programs and sending us a report with the results you get.

To contribute to this project, please clone the repository on github, make the changes, and send the link to your repository containing your contributions to support@maiascript.com.

## LICENSE

Copyright 2020,2021 Roberto Luiz Souza Monteiro, Renata Souza Barreto, Hernane Borges de Barros Pereira.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Lauro de Freitas, October 2023.

Roberto Luiz Souza Monteiro
