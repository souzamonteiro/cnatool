# HELP

## Command Line Interface (CLI) Options

```
CNATool Command Line Interface (CLI)
Usage: cnatool [options] [network.net] [--] [arguments]
Options:
-h     --help               Displays this help message;
       --all                Include all properties in report;
       --cen                Include vertices centralities in report;
       --clu                Include vertices clustering in report;
       --deg                Include vertices degrees in report;
       --spath              Include only average shortest path in report;
       --gpu                Uses the GPU to speed up calculations;
       --csv                CSV output file name;
-j                          JSON output file name;
-l                          Log output file name;
-o     [report.html]        Output report file name;
-p     [properties.json]    Properties file name;
-r                          Replace commas by dots in CSV numeric columns;
-s                          CSV column separator;
       --build              Builds a semantic network from a file in DLF format;
       --weighted           The created network must be weighted based
                            on the number of occurrences of the connections
                            between the vertices;
       --if                 Calculate the incidence fidelity index
       --create             Creates a network file in Pajek format;
       --directed           Network is a directed graph;
       --export             Exports the network file in Pajek format;
       --json               Save the network file in JSON format;
       --loops              Allow loops;
       --topology           Graph topology (complete, random, scalefree, smallworld or hybrid.
                            For semantic networks it can be: chain, circle or clique);
       --prefix             File name prefix for multiple file creation;
       --vertices           Number of vertices;
       --edges              Number of edges;
       --probability        Edge probability;
       --avgdeg             Average degree;
       --minw               Minimum weight;
       --nfiles             number of files to create;
       --vinc               increment to number of vertices;
       --einc               increment to number of edges;
       --dinc               increment to average degree.
```
