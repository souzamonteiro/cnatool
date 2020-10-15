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
     * Calculates graph properties.
     * @param {object}   adj - Adjascence matrix.
     * @param {object}   property - Network properties (n, m and directed).
     * @return           Graph properties.
     */
    this.calculateProperties = function(adj, property) {
        property.networkLabel = cna.getLabels(adj);
        property.networkDegree = cna.getDegrees(adj, property.directed);
        property.networkAverageDegree = cna.getAverageDegree(property.networkDegree);
        property.networkDensity = cna.getDensity(adj, property.directed);
        property.networkClustering = cna.getClustering(adj, property.directed);
        property.networkAverageClustering = cna.getAverageClustering(property.networkClustering);
        property.networkShortestPath = cna.getShortestPath(adj);
        property.networkAverageShortestPath = cna.getAverageShortestPath(property.networkShortestPath);
        property.networkDiameter = cna.getDiameter(property.networkShortestPath);
        property.networkVertexEfficiency = cna.getVertexEfficiency(property.networkShortestPath);
        property.networkGlobalEfficiency = cna.getGlobalEfficiency(property.networkVertexEfficiency);
    }

    /**
     * Create summary report.
     * @param {object}   property - Network properties (n, m and directed).
     * @return           Summary report in HTML format.
     */
    this.getSummaryReport = function(property) {
        property.networkDegreeDistribution = cna.getDegreeDistribution(property.networkDegree)
        dimNetworkDegreeDistribution = core.dim(property.networkDegreeDistribution)

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
        html = html + '<table style="margin-left: auto; margin-right: auto; border: 1px solid black;">'
        html = html + '<caption style="text-align: center; font-family: Arial; font-weight: bold;">Degree Disribuion</caption>'
        html = html + '<tr><th style="text-align: left; font-family: Arial; font-weight: bold;">Cluster</th><th style="text-align: left; font-family: Arial; font-weight: bold;">Frequency</th><th style="text-align: left; font-family: Arial; font-weight: bold;">Frequency(%)</th></tr>'
        for (i = 0; i < dimNetworkDegreeDistribution[0]; i = i + 1) {
           html = html + '<tr><td style="text-align: right; padding: 2px;">' + core.toString(property.networkDegreeDistribution[i][0]) + '</td><td style="text-align: right; padding: 2px;">' + core.toString(property.networkDegreeDistribution[i][1]) + '</td><td style="text-align: right; padding: 2px;">' + string.sprintf('%.2f', property.networkDegreeDistribution[i][2]) + '</td></tr>'
        }
        html = html + '</table>'
        html = html + '<br />'

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
     * @param {object}   adj - Adjascence matrix.
     * @param {object}   property - Network properties (n, m and directed).
     * @return           Vertices centralities report in HTML format.
     */
    this.getCentralitiesReport = function(adj, property) {
        dimNetworkLabel = core.dim(property.networkLabel)

        property.networkCentrality = cna.getCentrality(adj, property.networkShortestPath, property.directed)
         
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
    this.run = function()
    {
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
            var jsonFile = '';
            var includeAll = false;
            var includeClustering = false;
            var includeCentralities = false;
            var includeDegrees = false;
            var isDirected = false;
            var createGraph = false;
            var saveInJson = false;
            var topology = 'random';
            var prefix = '';
            var vertices = 0;
            var edges = 0;
            var probability = 0
            var avgdegree = 0;
            var nfiles = 1;
            var vinc = 0;
            var einc = 0;
            var dinc = 0;

            // Get command line arguments.
            if (argv.length > 2) {
                var i = 2;
                while (i < argv.length) {
                    if (argv[i] == '-c') {
                        justCompile = true;
                    } else if ((argv[i] == '-h') | (argv[i] == '--help')) {
                        system.log('CNATool Command Line Interface (CLI)');
                        system.log('Usage: cnatool [options] [network.net] [--] [arguments]');
                        system.log('Options:');
                        system.log('       --all                Include all properties in report;');
                        system.log('-j                          JSON output file name;');
                        system.log('       --clu                Include vertices clustering in report;');
                        system.log('       --cen                Include vertices centralities in report;');
                        system.log('       --deg                Include vertices degrees in report;');
                        system.log('       --d                  Network is a directed graph;');
                        system.log('-h     --help               Displays this help message;');
                        system.log('-o     [report.html]        Output report file name;');
                        system.log('       --create             Creates a network file in Pajet format;');
                        system.log('       --json               Save the network file in JSON format;');
                        system.log('       --topology           Graph topology (complete, random, scalefree, smallworld, hybrid);');
                        system.log('       --prefix             File name prefix for multiple file creation;');
                        system.log('       --vertices           Number of vertices;');
                        system.log('       --edges              Number of edges;');
                        system.log('       --probability        Edge probability;');
                        system.log('       --avgdeg             Average degree;');
                        system.log('       --nfiles             number of files to create;');
                        system.log('       --vinc               increment to number of vertices;');
                        system.log('       --einc               increment to number of edges;');
                        system.log('       --dinc               increment to average degree.');
                        process.exit(0);
                    } else if (argv[i] == '--all') {
                        includeAll = true;
                    } else if (argv[i] == '-j') {
                        i++;
                        jsonFile = argv[i];
                    } else if (argv[i] == '--clu') {
                        includeClustering = true;
                    } else if (argv[i] == '--cen') {
                        includeCentralities = true;
                    } else if (argv[i] == '--deg') {
                        includeDegrees = true;
                    } else if (argv[i] == '-d') {
                        isDirected = true;
                    } else if (argv[i] == '-o') {
                        i++;
                        outputFile = argv[i];
                    } else if (argv[i] == '--create') {
                        createGraph = true;
                    } else if (argv[i] == '--json') {
                        saveInJson = true;
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
                    if (prefix == '') {
                        prefix = topology;
                    }
                    for (var i = 1; i <= nfiles; i++) {
                        var adj = cna.createNetwork(topology, vertices, edges, probability, avgdegree);
                        var fileIndex = string.sprintf('%0' + core.toString(core.length(core.toString(nfiles))) + '.' + core.toString(core.length(core.toString(nfiles))) + 'd', i);
                        var pajekFileContents = cna.createPajekFile(adj, 'edges');
                        if (saveInJson) {
                            var outputFileName = prefix + '-' + fileIndex + '.json';
                            var jsonContents = cna.pajekFileToJson(pajekFileContents);
                            var outputFileContents = JSON.stringify(jsonContents);
                        } else {
                            var outputFileName = prefix + '-' + fileIndex + '.net';
                            var outputFileContents = pajekFileContents;
                        }
                        fs.writeFile(outputFileName, outputFileContents, function (err) {
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
                            var graphsData = [];
                            for (var i = 0; i < files.length; i++) {
                                file = files[i];
                                var fileName = file.split('.').shift();
                                var fileExtension = file.split('.').pop();

                                if (outputFile == '') {
                                    outputFile = fileName + '.html';
                                }

                                var fileContents = read(String(file));
                                
                                var property = {
                                    'n': 0,
                                    'm': 0,
                                    'directed': false,
                                    'density': 0,
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

                                if (fileExtension == 'json') {
                                    var network = JSON.parse(fileContents);
                                    var pajekFileContents = cna.jsonToPajekFile(network);
                                    var adj = cna.parsePajekFile(pajekFileContents, property);
                                } else if (fileExtension == 'net') {
                                    var adj = cna.parsePajekFile(fileContents, property);
                                } else {
                                    system.log('Unsupported file format when processing file ' + file + '');
                                }

                                if (isDirected) {
                                    property.directed = true;
                                }

                                cnatool.calculateProperties(adj, property);

                                var html = '<!DOCTYPE html>';
                                    html = html + '<html lang="en"><head><meta charset="UTF-8"><title>Network Properties Report' + file + '</title></head>';
                                    html = html + '<body>';
                                    html = html + cnatool.getSummaryReport(property);
                                    if (includeDegrees || includeAll) {
                                        html = html + cnatool.getDegreesReport(property);
                                    }
                                    if (includeClustering || includeAll) {
                                        html = html + cnatool.getClusteringReport(property);
                                    }
                                    if (includeCentralities || includeAll) {
                                        html = html + cnatool.getCentralitiesReport(adj, property);
                                    }
                                    html = html + '</body>';
                                    html = html + '</html>';
                                fs.writeFile(outputFile, html, function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                });
                                
                                outputFile = '';

                                if (jsonFile != '') {
                                    graphProperty = {
                                        'fileName': file,
                                        'properties': property
                                    }
                                    graphsData.push(graphProperty);
                                }
                            }
                            if (jsonFile != '') {
                                fs.writeFile(jsonFile, JSON.stringify(graphsData), function (err) {
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
    const { JSDOM } = jsdom;
    var doc = new JSDOM();
    var DOMParser = doc.window.DOMParser;
    
    var alert = system.log;

    cnatool.run();
}
