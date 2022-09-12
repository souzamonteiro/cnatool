/**
 * @license
 * Copyright 2020 Roberto Luiz Souza Monteiro,
 *                Renata Souza Barreto,
 *                Hernane Borges de Barros Pereira.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * CNATool core class.
 * @class
 */
function CNATool() {
    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
    }

    /**
     * Calculates the average shortest path.
     * @param {object}   property - Network properties (n, m and directed).
     * @param {boolean}  useGPU - Uses the GPU to speed up calculations.
     * @return           Graph properties.
     */
    this.calculateAverageShortestPath = function(property, useGPU) {
        if (typeof useGPU == 'undefined') {
            var useGPU = false;
        }
        property.networkShortestPath = cna.getShortestPath(property.adj, useGPU);
        property.networkAverageShortestPath = cna.getAverageShortestPath(property.networkShortestPath);
    }

    /**
     * Calculates graph properties.
     * @param {object}   property - Network properties (n, m and directed).
     * @param {boolean}  useGPU - Uses the GPU to speed up calculations.
     * @return           Graph properties.
     */
    this.calculateProperties = function(property, useGPU) {
        if (typeof useGPU == 'undefined') {
            var useGPU = false;
        }
        property.networkLabel = cna.getLabels(property.adj);
        property.networkDegree = cna.getDegrees(property.adj, property.directed);
        property.networkAverageDegree = cna.getAverageDegree(property.networkDegree);
        property.networkDensity = cna.getDensity(property.adj, property.directed);
        property.networkClustering = cna.getClustering(property.adj, property.directed);
        property.networkAverageClustering = cna.getAverageClustering(property.networkClustering);
        property.networkShortestPath = cna.getShortestPath(property.adj, useGPU);
        property.networkAverageShortestPath = cna.getAverageShortestPath(property.networkShortestPath);
        property.networkDiameter = cna.getDiameter(property.networkShortestPath);
        property.networkVertexEfficiency = cna.getVertexEfficiency(property.networkShortestPath);
        property.networkGlobalEfficiency = cna.getGlobalEfficiency(property.networkVertexEfficiency);
    }

    /**
     * Create summary report.
     * @param {object}   property - Network properties (n, m and directed).
     * @param {boolean}  includeDegDist - Include degree distribution in report.
     * @return           Summary report in HTML format.
     */
    this.getSummaryReport = function(property, includeDegDist) {
        if (typeof includeDegDist == 'undefined') {
            var includeDegDist = true;
        }
        if (includeDegDist) {
            property.networkDegreeDistribution = cna.getDegreeDistribution(property.networkDegree)
            dimNetworkDegreeDistribution = core.dim(property.networkDegreeDistribution)
        }
        var html = '';
        html = html + '<table style="margin-left: auto; margin-right: auto; border: 1px solid black;">'
        html = html + '<caption style="text-align: center; font-family: Arial; font-weight: bold;">Network Properties</caption>'
        html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Vertices:</th><td style="text-align: right; padding: 2px;">' + core.toString(property.n) + '</td></tr>'
        html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Edges:</th><td style="text-align: right; padding: 2px;">' + core.toString(property.m) + '</td></tr>'
        html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Density:</th><td style="text-align: right; padding: 2px;">' + string.sprintf('%.4f', property.networkDensity) + '</td></tr>'
        html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Avg. Degree:</th><td style="text-align: right; padding: 2px;">' + string.sprintf('%.4f', property.networkAverageDegree) + '</td></tr>'
        html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Avg. Clustering Coef.:</th><td style="text-align: right; padding: 2px;">' + string.sprintf('%.4f', property.networkAverageClustering) + '</td></tr>'
        html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Avg. Shortest Path:</th><td style="text-align: right; padding: 2px;">' + string.sprintf('%.4f', property.networkAverageShortestPath) + '</td></tr>'
        html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Diameter:</th><td style="text-align: right; padding: 2px;">' + core.toString(property.networkDiameter) + '</td></tr>'
        html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Global Efficiency:</th><td style="text-align: right; padding: 2px;">' + string.sprintf('%.4f', property.networkGlobalEfficiency) + '</td></tr>'
        html = html + '</table>'
        html = html + '<br />'
        if (includeDegDist) {
            html = html + '<table style="margin-left: auto; margin-right: auto; border: 1px solid black;">'
            html = html + '<caption style="text-align: center; font-family: Arial; font-weight: bold;">Degree Disribuion</caption>'
            html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Cluster</th><th style="text-align: left; font-family: Arial; font-weight: bold;">Frequency</th><th style="text-align: left; font-family: Arial; font-weight: bold;">Frequency(%)</th></tr>'
            for (i = 0; i < dimNetworkDegreeDistribution[0]; i = i + 1) {
                html = html + '<tr><td style="text-align: right; padding: 2px;">' + core.toString(property.networkDegreeDistribution[i][0]) + '</td><td style="text-align: right; padding: 2px;">' + core.toString(property.networkDegreeDistribution[i][1]) + '</td><td style="text-align: right; padding: 2px;">' + string.sprintf('%.2f', property.networkDegreeDistribution[i][2]) + '</td></tr>'
            }
            html = html + '</table>'
            html = html + '<br />'
        }
        return html;
    }

    /**
     * Create vertices degrees report.
     * @param {object}   property - Network properties (n, m and directed).
     * @return           Vertices degrees report in HTML format.
     */
    this.getDegreesReport = function(property) {
        dimNetworkLabel = core.dim(property.networkLabel)

        var html = '';
        html = html + '<table style="margin-left: auto; margin-right: auto; border: 1px solid black;">'
        html = html + '<caption style="text-align: center; font-family: Arial; font-weight: bold;">Vertices Degrees</caption>'
        html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Vertex</th><th style="text-align: left; font-family: Arial; font-weight: bold;">Out-degree</th><th style="text-align: left; font-family: Arial; font-weight: bold;">In-degree</th><th style="text-align: left; font-family: Arial; font-weight: bold;">Degree</th></tr>'
        for (i = 1; i < dimNetworkLabel[0]; i = i + 1) {
            html = html + '<tr><td style="text-align: right; padding: 2px;">' + property.networkLabel[i] + '</td><td style="text-align: right; padding: 2px;">' + core.toString(property.networkDegree[i][0]) + '</td><td style="text-align: right; padding: 2px;">' + core.toString(property.networkDegree[i][1]) + '</td><td style="text-align: right; padding: 2px;">' + string.sprintf('%.4f', property.networkDegree[i][2]) + '</td></tr>'
        }
        html = html + '</table>'
        html = html + '<br />'

        return html;
    }

    /**
     * Create vertices clustering report.
     * @param {object}   property - Network properties (n, m and directed).
     * @return           Vertices clustering report in HTML format.
     */
    this.getClusteringReport = function(property) {
        dimNetworkLabel = core.dim(property.networkLabel)

        var html = '';
        html = html + '<table style="margin-left: auto; margin-right: auto; border: 1px solid black;">'
        html = html + '<caption style="text-align: center; font-family: Arial; font-weight: bold;">Vertices Clustering</caption>'
        html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Vertex</th><th style="text-align: left; font-family: Arial; font-weight: bold;">Clustering</th></tr>'
        for (i = 1; i < dimNetworkLabel[0]; i = i + 1) {
            html = html + '<tr><td style="text-align: right; padding: 2px;">' + property.networkLabel[i] + '</td><td style="text-align: right; padding: 2px;">' + string.sprintf('%.4f', property.networkClustering[i][0]) + '</td></tr>'
        }
        html = html + '</table>'
        html = html + '<br />'

        return html;
    }

    /**
     * Create vertices centralities report.
     * @param {object}   property - Network properties (n, m and directed).
     * @return           Vertices centralities report in HTML format.
     */
    this.getCentralitiesReport = function(property) {
        dimNetworkLabel = core.dim(property.networkLabel)

        property.networkCentrality = cna.getCentrality(property.adj, property.networkShortestPath, property.directed)

        var html = '';
        html = html + '<table style="margin-left: auto; margin-right: auto; border: 1px solid black;">'
        html = html + '<caption style="text-align: center; font-family: Arial; font-weight: bold;">Vertices Centralities</caption>'
        html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Vertex</th><th style="text-align: left; font-family: Arial; font-weight: bold;">Geodesics</th><th style="text-align: left; font-family: Arial; font-weight: bold;">Closeness</th><th style="text-align: left; font-family: Arial; font-weight: bold;">Betweenness</th><th style="text-align: left; font-family: Arial; font-weight: bold;">nCloseness</th><th style="text-align: left; font-family: Arial; font-weight: bold;">nBetweenness</th></tr>'
        for (i = 1; i < dimNetworkLabel[0]; i = i + 1) {
            html = html + '<tr><td style="text-align: right; padding: 2px;">' + property.networkLabel[i] + '</td><td style="text-align: right; padding: 2px;">' + core.toString(property.networkCentrality[i][4]) + '</td><td style="text-align: right; padding: 2px;">' + string.sprintf('%.4f', property.networkCentrality[i][0]) + '</td><td style="text-align: right; padding: 2px;">' + string.sprintf('%.4f', property.networkCentrality[i][1]) + '</td><td style="text-align: right; padding: 2px;">' + string.sprintf('%.4f', property.networkCentrality[i][2]) + '</td><td style="text-align: right; padding: 2px;">' + string.sprintf('%.4f', property.networkCentrality[i][3]) + '</td></tr>'
        }
        html = html + '</table>'
        html = html + '<br />'

        return html;
    }

    /**
     * Interpret the options passed on the command line,
     * process the files and generate the requested reports.
     */
    this.run = function() {
        // Supports only the Node.js interpreter.
        if (typeof process !== 'undefined') {
            var command = 'node';
            var argv = process.argv.slice();
            var fs = require('fs');
            var readTextFile = fs.readFileSync;

            // Read file callback.
            function read(input) {
                if (/^{.*}$/.test(input)) {
                    return input.substring(1, input.length - 1);
                } else {
                    var content = readTextFile(input, 'utf-8');
                    return content.length > 0 && content.charCodeAt(0) == 0xFEFF ? content.substring(1) : content;
                }
            }
            
            // Command line arguments.
            system.argv = argv.slice();
            system.argc = argv.length;

            // Command line options.
            var inputFile = '';
            var outputFile = '';
            var propertiesFile = '';
            var csvFile = '';
            var jsonFile = '';
            var logFile = '';
            var columnSeparator = ',';
            var replaceCommas = false;
            var includeAll = false;
            var includeClustering = false;
            var includeCentralities = false;
            var includeDegrees = false;
            var onlyAvgShortestpath = false;
            var useGPU = false;
            var buildGraph = false;
            var isWeighted = false;
            var calculateIncidenceFidelity = false;
            var createGraph = false;
            var isDirected = false;
            var exportGraph = false;
            var saveInJson = false;
            var allowLoops = false;
            var topology = '';
            var prefix = '';
            var vertices = 0;
            var edges = 0;
            var probability = 0
            var avgdegree = 0;
            var minw;
            var nfiles = 1;
            var vinc = 0;
            var einc = 0;
            var dinc = 0;

            // Properties object.
            var property = {
                'adj': [],
                'n': 0,
                'm': 0,
                'directed': false,
                'networkLabel': [],
                'networkDegree': [],
                'networkAverageDegree': 0,
                'networkDegreeDistribution': [],
                'networkDensity': 0,
                'networkClustering': [],
                'networkAverageClustering': 0,
                'networkShortestPath': [],
                'networkAverageShortestPath': 0,
                'networkDiameter': 0,
                'networkCentrality': [],
                'networkVertexEfficiency': [],
                'networkGlobalEfficiency': 0
            };

            // Get command line arguments.
            if (argv.length > 2) {
                var i = 2;
                while (i < argv.length) {
                    if (argv[i] == '-c') {
                        justCompile = true;
                    } else if ((argv[i] == '-h') || (argv[i] == '--help')) {
                        system.log('CNATool Command Line Interface (CLI)');
                        system.log('Usage: cnatool [options] [network.net] [--] [arguments]');
                        system.log('Options:');
                        system.log('-h     --help               Displays this help message;');
                        system.log('       --all                Include all properties in report;');
                        system.log('       --cen                Include vertices centralities in report;');
                        system.log('       --clu                Include vertices clustering in report;');
                        system.log('       --deg                Include vertices degrees in report;');
                        system.log('       --spath              Include only average shortest path in report;');
                        system.log('       --gpu                Uses the GPU to speed up calculations;');
                        system.log('       --csv                CSV output file name;');
                        system.log('-j                          JSON output file name;');
                        system.log('-l                          Log output file name;');
                        system.log('-o     [report.html]        Output report file name;');
                        system.log('-p     [properties.json]    Properties file name;');
                        system.log('-r                          Replace commas by dots in CSV numeric columns;');
                        system.log('-s                          CSV column separator;');
                        system.log('       --build              Builds a semantic network from a file in DLF format;');
                        system.log('       --weighted           The created network must be weighted based');
                        system.log('                            on the number of occurrences of the connections');
                        system.log('                            between the vertices;');
                        system.log('       --if                 Calculate the incidence fidelity index');
                        system.log('       --create             Creates a network file in Pajek format;');
                        system.log('       --directed           Network is a directed graph;');
                        system.log('       --export             Exports the network file in Pajek format;');
                        system.log('       --json               Save the network file in JSON format;');
                        system.log('       --loops              Allow loops;');
                        system.log('       --topology           Graph topology (complete, random, scalefree, smallworld or hybrid.');
                        system.log('                            For semantic networks it can be: chain, circle or clique);');
                        system.log('       --prefix             File name prefix for multiple file creation;');
                        system.log('       --vertices           Number of vertices;');
                        system.log('       --edges              Number of edges;');
                        system.log('       --probability        Edge probability;');
                        system.log('       --avgdeg             Average degree;');
                        system.log('       --minw               Minimum weight;');
                        system.log('       --nfiles             number of files to create;');
                        system.log('       --vinc               increment to number of vertices;');
                        system.log('       --einc               increment to number of edges;');
                        system.log('       --dinc               increment to average degree.');
                        process.exit(0);
                    } else if (argv[i] == '--all') {
                        includeAll = true;
                    } else if (argv[i] == '--cen') {
                        includeCentralities = true;
                    } else if (argv[i] == '--clu') {
                        includeClustering = true;
                    } else if (argv[i] == '--deg') {
                        includeDegrees = true;
                    } else if (argv[i] == '--spath') {
                        onlyAvgShortestpath = true;
                    } else if (argv[i] == '--gpu') {
                        useGPU = true;
                    } else if (argv[i] == '--csv') {
                        i++;
                        csvFile = argv[i];
                    } else if (argv[i] == '-j') {
                        i++;
                        jsonFile = argv[i];
                    } else if (argv[i] == '-l') {
                        i++;
                        logFile = argv[i];
                    } else if (argv[i] == '-o') {
                        i++;
                        outputFile = argv[i];
                    } else if (argv[i] == '-p') {
                        i++;
                        propertiesFile = argv[i];
                    } else if (argv[i] == '-r') {
                        replaceCommas = true;
                    } else if (argv[i] == '-s') {
                        i++;
                        columnSeparator = argv[i];
                    } else if (argv[i] == '--build') {
                        buildGraph = true;
                    } else if (argv[i] == '--weighted') {
                        isWeighted = true;
                    } else if (argv[i] == '--if') {
                        calculateIncidenceFidelity = true;
                    } else if (argv[i] == '--create') {
                        createGraph = true;
                    } else if (argv[i] == '--directed') {
                        isDirected = true;
                    } else if (argv[i] == '--export') {
                        exportGraph = true;
                    } else if (argv[i] == '--json') {
                        saveInJson = true;
                    } else if (argv[i] == '--loops') {
                        allowLoops = true;
                    } else if (argv[i] == '--topology') {
                        i++;
                        topology = argv[i];
                    } else if (argv[i] == '--prefix') {
                        i++;
                        prefix = argv[i];
                    } else if (argv[i] == '--vertices') {
                        i++;
                        vertices = core.toNumber(argv[i]);
                    } else if (argv[i] == '--edges') {
                        i++;
                        edges = core.toNumber(argv[i]);
                    } else if (argv[i] == '--probability') {
                        i++;
                        probability = core.toNumber(argv[i]);
                    } else if (argv[i] == '--avgdeg') {
                        i++;
                        avgdegree = core.toNumber(argv[i]);
                    } else if (argv[i] == '--minw') {
                        i++;
                        minw = core.toNumber(argv[i]);
                    } else if (argv[i] == '--nfiles') {
                        i++;
                        nfiles = core.toNumber(argv[i]);
                    } else if (argv[i] == '--vinc') {
                        i++;
                        vinc = core.toNumber(argv[i]);
                    } else if (argv[i] == '--einc') {
                        i++;
                        einc = core.toNumber(argv[i]);
                    } else if (argv[i] == '--dinc') {
                        i++;
                        dinc = core.toNumber(argv[i]);
                    } else {
                        inputFile = argv[i];
                        break;
                    }
                    i++;
                }
                system.argv = argv.slice(i);
                system.argc = system.argv.length;

                if (createGraph) {
                    if (topology == '') {
                        topology = 'random';
                    }
                    if (prefix == '') {
                        prefix = topology;
                    }
                    for (var i = 1; i <= nfiles; i++) {
                        property = {
                            'adj': [],
                            'n': 0,
                            'm': 0,
                            'directed': false,
                            'networkLabel': [],
                            'networkDegree': [],
                            'networkAverageDegree': 0,
                            'networkDegreeDistribution': [],
                            'networkDensity': 0,
                            'networkClustering': [],
                            'networkAverageClustering': 0,
                            'networkShortestPath': [],
                            'networkAverageShortestPath': 0,
                            'networkDiameter': 0,
                            'networkCentrality': [],
                            'networkVertexEfficiency': [],
                            'networkGlobalEfficiency': 0
                        };

                        property.adj = cna.createNetwork(topology, vertices, edges, probability, avgdegree);
                        var fileIndex = string.sprintf('%0' + core.toString(core.length(core.toString(nfiles))) + '.' + core.toString(core.length(core.toString(nfiles))) + 'd', i);
                        var pajekFileContents = cna.createPajekFile(property.adj, 'edges');
                        if (saveInJson) {
                            var outputFileName = prefix + '-' + fileIndex + '.json';
                            var jsonContents = cna.pajekFileToJson(pajekFileContents);
                            var outputFileContents = JSON.stringify(jsonContents);
                        } else {
                            var outputFileName = prefix + '-' + fileIndex + '.net';
                            var outputFileContents = pajekFileContents;
                        }
                        fs.writeFile(outputFileName, outputFileContents, function(err) {
                            if (err) {
                                throw err;
                            }
                        });
                        if (vinc != 0) {
                            vertices = vertices + vinc;
                        }
                        if (einc != 0) {
                            edges = edges + einc;
                        }
                        if (dinc != 0) {
                            avgdegree = avgdegree + dinc;
                        }
                    }
                }

                if (inputFile != '') {
                    var Glob = require('glob');
                    // Process each file based on glob pattern.
                    function processFiles(er, files) {
                        if (files.length == 0) {
                            system.log('CNATool Command Line Interface (CLI)');
                            system.log('Usage: cnatool [options] [network.net] [--] [arguments]');
                        } else {
                            property = {
                                'adj': [],
                                'n': 0,
                                'm': 0,
                                'directed': false,
                                'networkLabel': [],
                                'networkDegree': [],
                                'networkAverageDegree': 0,
                                'networkDegreeDistribution': [],
                                'networkDensity': 0,
                                'networkClustering': [],
                                'networkAverageClustering': 0,
                                'networkShortestPath': [],
                                'networkAverageShortestPath': 0,
                                'networkDiameter': 0,
                                'networkCentrality': [],
                                'networkVertexEfficiency': [],
                                'networkGlobalEfficiency': 0
                            };
                            var graphsData = [];
                            var csvData = 'fileName' +
                                          columnSeparator +
                                          'n' +
                                          columnSeparator +
                                          'm' +
                                          columnSeparator +
                                          'networkAverageDegree' +
                                          columnSeparator +
                                          'networkDensity' +
                                          columnSeparator +
                                          'networkAverageClustering' +
                                          columnSeparator +
                                          'networkAverageShortestPath' +
                                          columnSeparator +
                                          'networkDiameter' +
                                          columnSeparator +
                                          'networkGlobalEfficiency' +
                                          '\r\n';
                            var logData = 'fileName' + columnSeparator + 'elapsedTime' + '\r\n';
                                
                            for (var i = 0; i < files.length; i++) {
                                file = files[i];
                                
                                var fileName = file.split('.').shift();
                                var fileExtension = file.split('.').pop();

                                if (propertiesFile == '') {
                                    propertiesFile = fileName + '-properties.json';
                                }

                                var fileContents = read(String(file));

                                if (buildGraph) {
                                    if (topology == '') {
                                        topology = 'chain';
                                    }

                                    var outputFileName = fileName + '-net.json';
                                    
                                    if (isDirected) {
                                        property.directed = true;
                                    }
                                    
                                    if (fileExtension == 'json') {
                                        var jsonData = JSON.parse(fileContents);
                                        graphsData = snet.createFromJson(jsonData, property, topology, isWeighted, allowLoops);
                                    } else {
                                        graphsData = snet.createFromDlf(fileContents, property, topology, isWeighted, allowLoops);
                                    }

                                    if (calculateIncidenceFidelity) {
                                        var ifDataOutputFileName = fileName + '-if.json';
                                        var ifData = snet.calculateIncidenceFidelity(graphsData,true);

                                        fs.writeFile(ifDataOutputFileName, JSON.stringify(ifData), function(err) {
                                            if (err) {
                                                throw err;
                                            }
                                        });

                                        var ifDataCsvOutputFileName = fileName + '-if.csv';
                                        var ifCsvData = ''

                                        ifCsvData += 'Network file: ' + fileName + '\n';
                                        ifCsvData += 'Total of sentences: ' + ifData.numberOfSentences + '\n';
                                        ifCsvData += 'Vocabulary: ' + ifData.vocabulary + '\n';
                                        ifCsvData += 'Vocabulary / Number of sentences: ' + ifData.vocabularyByNumberOfSentences + '\n';
                                        ifCsvData += '\n';
                                        ifCsvData += 'Id;Pair;QtSentencesPhi;QtSentencesPsi;FreqOfPair;Incidence;Fidelity;IF\n';

                                        for (j = 0; j < ifData.rows.length; j++) {
                                            var row = ifData.rows[j].join(';');
                                            ifCsvData += row + '\n';
                                        }
                                        
                                        fs.writeFile(ifDataCsvOutputFileName, ifCsvData, function(err) {
                                            if (err) {
                                                throw err;
                                            }
                                        });
                                    }

                                    var dansityDataCsvOutputFileName = fileName + '-density.csv';
                                    var densityCsvData = ""
                                    for (k = 0; k < graphsData.density.length; k++) {
                                        let n = graphsData.density[k][0]
                                        let m = graphsData.density[k][1]
                                        let density = graphsData.density[k][2]
                                        densityCsvData = densityCsvData + n + columnSeparator + m + columnSeparator + density + "\r\n"
                                    }
                                    fs.writeFile(dansityDataCsvOutputFileName, densityCsvData, function(err) {
                                        if (err) {
                                            throw err;
                                        }
                                    });

                                    fs.writeFile(outputFileName, JSON.stringify(graphsData), function(err) {
                                        if (err) {
                                            throw err;
                                        }
                                    });
                                } else {
                                    if (!exportGraph) {
                                        if (outputFile == '') {
                                            outputFile = fileName + '.html';
                                        }

                                        if (fileExtension == 'csv') {
                                            property.adj = cna.parseMatrixFile(fileContents, property, columnSeparator, replaceCommas);
                                        } else if (fileExtension == 'json') {
                                            var network = JSON.parse(fileContents);
                                            var pajekFileContents = cna.jsonToPajekFile(network);
                                            property.adj = cna.parsePajekFile(pajekFileContents, property);
                                        } else if (fileExtension == 'net') {
                                            property.adj = cna.parsePajekFile(fileContents, property);
                                        } else {
                                            system.log('Unsupported file format when processing file ' + file + '');
                                        }

                                        if (isDirected) {
                                            property.directed = true;
                                        }

                                        system.log('Processing file: ' + file + ' ...\n');
                                        if (onlyAvgShortestpath) {
                                            var startTime = new Date();
                                            cnatool.calculateAverageShortestPath(property, useGPU);
                                            var endTime = new Date();
                                        } else {
                                            var startTime = new Date();
                                            cnatool.calculateProperties(property, useGPU);
                                            var endTime = new Date();
                                        }
                                        var elapsedTime = endTime - startTime;
                                        system.log('Elapsed time: ' + elapsedTime + ' ms\n');

                                        var html = '<!DOCTYPE html>';
                                        html = html + '<html lang="en"><head><meta charset="UTF-8"><title>Network Properties Report' + file + '</title></head>';
                                        html = html + '<body>';
                                        if ((property.n > 0) && (property.m > 0)) {
                                            html = html + cnatool.getSummaryReport(property, !onlyAvgShortestpath);
                                            if (includeDegrees || includeAll) {
                                                html = html + cnatool.getDegreesReport(property);
                                            }
                                            if (includeClustering || includeAll) {
                                                html = html + cnatool.getClusteringReport(property);
                                            }
                                            if (includeCentralities || includeAll) {
                                                html = html + cnatool.getCentralitiesReport(property);
                                            }
                                        }
                                        html = html + '</body>';
                                        html = html + '</html>';
                                        fs.writeFile(outputFile, html, function(err) {
                                            if (err) {
                                                throw err;
                                            }
                                        });
                                    } else {
                                        var network = JSON.parse(fileContents);
                                        property.n = network.nodes.length
                                        property.m = network.edges.length
                                        var outputFileContents = cna.jsonToPajekFile(network)
                                        var outputFileName = fileName + '.net';
                                        fs.writeFile(outputFileName, outputFileContents, function(err) {
                                            if (err) {
                                                throw err;
                                            }
                                        });
                                    }
                                    
                                    if (propertiesFile != '') {
                                        fs.writeFile(propertiesFile, JSON.stringify(property), function(err) {
                                            if (err) {
                                                throw err;
                                            }
                                        });
                                    }

                                    outputFile = '';
                                    propertiesFile = '';

                                    if (csvFile != '') {
                                        csvData += file +
                                                columnSeparator +
                                                property.n +
                                                columnSeparator +
                                                property.m +
                                                columnSeparator +
                                                property.networkAverageDegree +
                                                columnSeparator +
                                                property.networkDensity +
                                                columnSeparator +
                                                property.networkAverageClustering +
                                                columnSeparator +
                                                property.networkAverageShortestPath +
                                                columnSeparator +
                                                property.networkDiameter +
                                                columnSeparator +
                                                property.networkGlobalEfficiency +
                                                '\r\n';
                                    }
                                    if (jsonFile != '') {
                                        graphProperty = {
                                            'fileName': file,
                                            'properties': {
                                                'n': property.n,
                                                'm': property.m,
                                                'networkAverageDegree': property.networkAverageDegree,
                                                'networkDensity': property.networkDensity,
                                                'networkAverageClustering': property.networkAverageClustering,
                                                'networkAverageShortestPath': property.networkAverageShortestPath,
                                                'networkDiameter': property.networkDiameter,
                                                'networkGlobalEfficiency': property.networkGlobalEfficiency
                                            }
                                        };
                                        graphsData.push(graphProperty);
                                    }
                                    if (logFile != '') {
                                        logData += file + columnSeparator + elapsedTime + '\r\n';
                                    }
                                }
                            }
                            
                            if (csvFile != '') {
                                fs.writeFile(csvFile, csvData, function(err) {
                                    if (err) {
                                        throw err;
                                    }
                                });
                            }
                            if (jsonFile != '') {
                                fs.writeFile(jsonFile, JSON.stringify(graphsData), function(err) {
                                    if (err) {
                                        throw err;
                                    }
                                });
                            }
                            if (logFile != '') {
                                fs.writeFile(logFile, logData, function(err) {
                                    if (err) {
                                        throw err;
                                    }
                                });
                            }
                        }
                    }

                    options = {};

                    // Get all file names based on glob pattern.
                    var glob = new Glob(inputFile, options, processFiles);
                } else {
                    if (!createGraph) {
                        system.log('CNATool Command Line Interface (CLI)');
                        system.log('Usage: cnatool [options] [network.net] [--] [arguments]');
                    }
                }
            } else {
                system.log('CNATool Command Line Interface (CLI)');
                system.log('Usage: cnatool [options] [network.net] [--] [arguments]');
            }
        }
    }
}

cnatool = new CNATool();

/*
 * Run CNATool code if this script has been invoked
 * from the command line.
 */
if (typeof process !== 'undefined') {
    // Emulate DOM.
    const jsdom = require('jsdom');
    const {
        JSDOM
    } = jsdom;
    var doc = new JSDOM();
    var DOMParser = doc.window.DOMParser;

    var alert = system.log;

    cnatool.run();
}