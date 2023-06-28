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

## RUN TESTS:

To run the test scripts execute:

`./test.sh`

## USING THE COMMAND LINE INTERFACE (CLI) AND CNATool:

To run the command line tool, use the command:

`cnatool [options] [network.net] [--] [arguments]`

To see the command line tool options run the command:

`cnatool --help`

To launch CNATool open the file `index.html`, in the main directory of the package, in a browser.

To try CNATool on-line go to [http://www.maiascript.com/cnatool]

Lauro de Freitas, October 2020.

Roberto Luiz Souza Monteiro

## CONTRIBUTORS
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