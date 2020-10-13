# CNATool (Complex Network Analysis Tool)

Copyright (C) 2020 Roberto Luiz Souza Monteiro, Renata Souza Barreto, Hernane Borges de Barros Pereira.

This software is distributed under the terms of several open sources licenses.

Please read the files LICENSE, COPYING or COPYING.LIB for further information.

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
- Save a summary of graph’s properties in HTML format.

To use the online tool, access:

[http://www.maiascript.com/cnatool]

## INSTALL COMMAND LINE INTERFACE (CLI):

To install the CNATool command line tool use the command:

`npm install -g cnatool`

Or, get it from GitHub:

`git clone https://github.com/souzamonteiro/cnatool.git`

Or, download the latest zipped version:

`unzip cnatool-main.zip`

`cd cnatool-main`

`npm install -g .`

## USING THE COMMAND LINE INTERFACE (CLI) AND CNATool:

To run the command line tool, use the command:

`cnatool [options] [script.maia] [--] [arguments]`

To see the command line tool options run the command:

`cnatool --help`

To launch CNATool open the file `index.html`, in the main directory of the package, in a browser.

To try CNATool on-line go to [http://www.maiascript.com/cnatool]

Lauro de Freitas, October 2020.

Roberto Luiz Souza Monteiro