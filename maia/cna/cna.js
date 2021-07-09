function cna_() {
    this.createNetwork = function(topology, numVertices, numEdges, edgeProbability, averageDegree) {
        adj = ann.createANN(topology, numVertices, numEdges, edgeProbability, averageDegree);
        return (adj);
    };
    this.createPajekFile = function(adj, type) {
        if (core.equal(core.type(type), "undefined")) {
            type = "edges";
        };
        dimAdj = core.dim(adj);
        dimI = dimAdj[0];
        dimJ = dimAdj[1];
        newLine = "\r\n";
        fileContents = core.add(core.add("*Vertices ", (core.sub(dimI, 1))), newLine);
        for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
            fileContents = core.add(core.add(core.add(core.add(core.add(fileContents, i), " \""), adj[i][0]), "\""), newLine);
        };
        if (core.equal(type, "edges")) {
            fileContents = core.add(core.add(fileContents, "*Edges"), newLine);
            for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
                for (j = 1; core.LT(j, dimJ); j = core.add(j, 1)) {
                    if (core.different(adj[i][j], 0)) {
                        fileContents = core.add(core.add(core.add(core.add(core.add(core.add(fileContents, i), " "), j), " "), adj[i][j]), newLine);
                    };
                };
            };;
        } else if (core.equal(type, "arcs")) {
            fileContents = core.add(core.add(fileContents, "*Arcs"), newLine);
            for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
                for (j = 1; core.LT(j, dimJ); j = core.add(j, 1)) {
                    if (core.different(adj[i][j], 0)) {
                        fileContents = core.add(core.add(core.add(core.add(core.add(core.add(fileContents, i), " "), j), " "), adj[i][j]), newLine);
                    };
                };
            };;
        } else if (core.equal(type, "matrix")) {
            fileContents = core.add(core.add(fileContents, "*Matrix"), newLine);
            for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
                for (j = 1; core.LT(j, dimJ); j = core.add(j, 1)) {
                    fileContents = core.add(core.add(fileContents, " "), adj[i][j]);
                };
                fileContents = core.add(fileContents, newLine);
            };
        };
        return (fileContents);
    };
    this.parsePajekFile = function(fileContents, properties) {
        if (core.equal(core.type(properties), "undefined")) {
            properties = {
                "n": 0,
                "m": 0,
                "directed": false
            };
        } else {
            properties.n = 0;
            properties.m = 0;
            properties.directed = false;
        };
        adj = [];
        fileSection = "none";
        fileLines = core.split(fileContents, "\r\n");
        for (l = 0; core.LT(l, fileLines.length); l = core.add(l, 1)) {
            line = fileLines[l];
            record = core.split(line.trim(), " ");
            if (core.logicalOR(core.logicalOR(core.logicalOR((core.equal(core.toLowerCase(record[0]), "*vertices")), (core.equal(core.toLowerCase(record[0]), "*edges"))), (core.equal(core.toLowerCase(record[0]), "*arcs"))), (core.equal(core.toLowerCase(record[0]), "*matrix")))) {
                fileSection = core.toLowerCase(record[0]);
                if (core.equal(fileSection, "*vertices")) {
                    n = "";
                    for (j = 1; core.LT(j, record.length); j = core.add(j, 1)) {
                        if (core.equal(record[j], "")) {
                            continue;
                        };
                        if (core.equal(n, "")) {
                            n = core.toNumber(record[j]);
                            break;
                        };
                    };
                    if (core.equal(n, "")) {
                        break;
                    } else {
                        adj = core.matrix(0, core.add(n, 1), core.add(n, 1));
                        properties.n = n;
                    };
                } else if (core.equal(fileSection, "*arcs")) {
                    properties.directed = true;
                };
                continue;
            };
            if (core.GE(core.length(record), 2)) {
                if (core.equal(fileSection, "*vertices")) {
                    id = "";
                    label = "";
                    for (j = 0; core.LT(j, record.length); j = core.add(j, 1)) {
                        if (core.equal(record[j], "")) {
                            continue;
                        };
                        if (core.equal(id, "")) {
                            id = core.toNumber(record[j]);
                            continue;
                        };
                        if (core.equal(label, "")) {
                            label = core.replace(record[j], core.regExp("\"", "g"), "");
                            continue;
                        };
                    };
                    adj[0][id] = label;
                    adj[id][0] = label;
                } else if (core.equal(fileSection, "*edges")) {
                    source = "";
                    target = "";
                    weight = "";
                    for (j = 0; core.LT(j, record.length); j = core.add(j, 1)) {
                        if (core.equal(record[j], "")) {
                            continue;
                        };
                        if (core.equal(source, "")) {
                            source = core.toNumber(record[j]);
                            continue;
                        };
                        if (core.equal(target, "")) {
                            target = core.toNumber(record[j]);
                            continue;
                        };
                        if (core.equal(weight, "")) {
                            weight = core.toNumber(record[j]);
                            continue;
                        };
                    };
                    if (core.equal(weight, "")) {
                        weight = 1;
                    };
                    adj[source][target] = weight;
                    adj[target][source] = weight;
                    properties.m = core.add(properties.m, 1);
                } else if (core.equal(fileSection, "*arcs")) {
                    source = "";
                    target = "";
                    weight = "";
                    for (j = 0; core.LT(j, record.length); j = core.add(j, 1)) {
                        if (core.equal(record[j], "")) {
                            continue;
                        };
                        if (core.equal(source, "")) {
                            source = core.toNumber(record[j]);
                            continue;
                        };
                        if (core.equal(target, "")) {
                            target = core.toNumber(record[j]);
                            continue;
                        };
                        if (core.equal(weight, "")) {
                            weight = core.toNumber(record[j]);
                            continue;
                        };
                    };
                    if (core.equal(weight, "")) {
                        weight = 1;
                    };
                    adj[source][target] = weight;
                    properties.m = core.add(properties.m, 1);
                };
            };
        };
        return (adj);
    };
    this.pajekFileToJson = function(fileContents, properties) {
        if (core.equal(core.type(properties), "undefined")) {
            properties = {
                "n": 0,
                "m": 0,
                "directed": false
            };
        } else {
            properties.n = 0;
            properties.m = 0;
            properties.directed = false;
        };
        network = {
            "nodes": [],
            "edges": []
        };
        fileSection = "none";
        fileLines = core.split(fileContents, "\r\n");
        for (l = 0; core.LT(l, fileLines.length); l = core.add(l, 1)) {
            line = fileLines[l];
            record = core.split(line.trim(), " ");
            if (core.logicalOR(core.logicalOR(core.logicalOR((core.equal(core.toLowerCase(record[0]), "*vertices")), (core.equal(core.toLowerCase(record[0]), "*edges"))), (core.equal(core.toLowerCase(record[0]), "*arcs"))), (core.equal(core.toLowerCase(record[0]), "*matrix")))) {
                fileSection = core.toLowerCase(record[0]);
                if (core.equal(fileSection, "*vertices")) {
                    n = "";
                    for (j = 1; core.LT(j, record.length); j = core.add(j, 1)) {
                        if (core.equal(record[j], "")) {
                            continue;
                        };
                        if (core.equal(n, "")) {
                            n = core.toNumber(record[j]);
                            break;
                        };
                    };
                    if (core.equal(n, "")) {
                        break;
                    } else {
                        properties.n = n;
                    };
                } else if (core.equal(fileSection, "*arcs")) {
                    properties.directed = true;
                };
                i = 0;
                continue;
            };
            if (core.GE(core.length(record), 2)) {
                if (core.equal(fileSection, "*vertices")) {
                    id = "";
                    label = "";
                    x = "";
                    y = "";
                    size = "";
                    for (j = 0; core.LT(j, record.length); j = core.add(j, 1)) {
                        if (core.equal(record[j], "")) {
                            continue;
                        };
                        if (core.equal(id, "")) {
                            id = core.toString(record[j]);
                            continue;
                        };
                        if (core.equal(label, "")) {
                            label = core.replace(record[j], core.regExp("\"", "g"), "");
                            continue;
                        };
                        if (core.equal(x, "")) {
                            x = core.toNumber(record[j]);
                            continue;
                        };
                        if (core.equal(y, "")) {
                            y = core.toNumber(record[j]);
                            continue;
                        };
                        if (core.equal(size, "")) {
                            size = core.toNumber(record[j]);
                        };
                    };
                    if (core.equal(x, "")) {
                        x = math.random();
                    };
                    if (core.equal(y, "")) {
                        y = math.random();
                    };
                    if (core.equal(size, "")) {
                        size = 1;
                    };
                    node = {
                        "id": core.add("n", id),
                        "label": label,
                        "x": x,
                        "y": y,
                        "size": size
                    };
                    network.nodes.push(node);
                    i = core.add(i, 1);
                } else if (core.equal(fileSection, "*edges")) {
                    source = "";
                    target = "";
                    weight = "";
                    for (j = 0; core.LT(j, record.length); j = core.add(j, 1)) {
                        if (core.equal(record[j], "")) {
                            continue;
                        };
                        if (core.equal(source, "")) {
                            source = core.toNumber(record[j]);
                            continue;
                        };
                        if (core.equal(target, "")) {
                            target = core.toNumber(record[j]);
                            continue;
                        };
                        if (core.equal(weight, "")) {
                            weight = core.toNumber(record[j]);
                            continue;
                        };
                    };
                    if (core.equal(weight, "")) {
                        weight = 1;
                    };
                    edge = {
                        "id": core.add("e", core.toString(i)),
                        "source": core.add("n", core.toString(source)),
                        "target": core.add("n", core.toString(target)),
                        "size": weight
                    };
                    network.edges.push(edge);
                    i = core.add(i, 1);
                    properties.m = core.add(properties.m, 1);
                } else if (core.equal(fileSection, "*arcs")) {
                    source = "";
                    target = "";
                    weight = "";
                    for (j = 0; core.LT(j, record.length); j = core.add(j, 1)) {
                        if (core.equal(record[j], "")) {
                            continue;
                        };
                        if (core.equal(source, "")) {
                            source = core.toNumber(record[j]);
                            continue;
                        };
                        if (core.equal(target, "")) {
                            target = core.toNumber(record[j]);
                            continue;
                        };
                        if (core.equal(weight, "")) {
                            weight = core.toNumber(record[j]);
                            continue;
                        };
                    };
                    if (core.equal(weight, "")) {
                        weight = 1;
                    };
                    edge = {
                        "id": core.add("e", core.toString(i)),
                        "source": core.add("n", core.toString(source)),
                        "target": core.add("n", core.toString(target)),
                        "size": weight
                    };
                    network.edges.push(edge);
                    i = core.add(i, 1);
                    properties.m = core.add(properties.m, 1);
                };
            };
        };
        return (network);
    };
    this.jsonToPajekFile = function(network) {
        n = network.nodes.length;
        m = network.edges.length;
        fileContents = core.add(core.add("*Vertices ", core.toString(n)), "\r\n");
        hash = [];
        for (i = 0; core.LT(i, n); i = core.add(i, 1)) {
            node = network.nodes[i];
            if (core.different(core.type(node), "undefined")) {
                id = core.toString(core.add(i, 1));
                hash[node.id] = id;
                if (core.equal(core.type(node.label), "undefined")) {
                    label = "";
                } else {
                    label = node.label;
                };
                if (core.equal(core.type(node.x), "undefined")) {
                    x = 0;
                } else {
                    x = core.toString(node.x);
                };
                if (core.equal(core.type(node.y), "undefined")) {
                    y = 0;
                } else {
                    y = core.toString(node.y);
                };
                if (core.equal(core.type(node.size), "undefined")) {
                    size = 0;
                } else {
                    size = core.toString(node.size);
                };
                if (core.different(node.label, "")) {
                    fileContents = core.add(core.add(core.add(core.add(core.add(core.add(core.add(core.add(core.add(core.add(fileContents, id), " \""), label), "\" "), x), " "), y), " "), size), "\r\n");
                };
            };
        };
        fileContents = core.add(fileContents, "*Arcs\r\n");
        for (i = 0; core.LT(i, m); i = core.add(i, 1)) {
            edge = network.edges[i];
            if (core.different(core.type(edge), "undefined")) {
                if (core.equal(core.type(edge.source), "undefined")) {
                    source = "";
                } else {
                    source = hash[edge.source];
                };
                if (core.equal(core.type(edge.target), "undefined")) {
                    target = "";
                } else {
                    target = hash[edge.target];
                };
                if (core.equal(core.type(edge.size), "undefined")) {
                    size = 0;
                } else {
                    size = core.toString(edge.size);
                };
                if (core.logicalNot((core.logicalOR((core.equal(edge.source, "")), (core.equal(edge.target, "")))))) {
                    fileContents = core.add(core.add(core.add(core.add(core.add(core.add(fileContents, source), " "), target), " "), size), "\r\n");
                };
            };
        };
        return (fileContents);
    };
    this.getTransitiveClosure = function(a, b) {
        dimA = core.dim(a);
        dimB = core.dim(b);
        if (core.equal(dimA[1], dimB[0])) {
            c = core.matrix(0, dimA[1], dimB[0]);
            for (i = 1; core.LT(i, dimA[0]); i = core.add(i, 1)) {
                for (j = 1; core.LT(j, dimB[1]); j = core.add(j, 1)) {
                    s = 0;
                    for (k = 1; core.LT(k, dimB[0]); k = core.add(k, 1)) {
                        s = core.logicalOR(s, core.logicalAND(a[i][k], b[k][j]));
                    };
                    c[i][j] = s;
                };
            };
            return (c);
        } else {
            throw (Error("The number of columns in matrix A must equal the number of rows in matrix B"));
        };
    };
    this.getBooleanOr = function(a, b) {
        dimA = core.dim(a);
        dimB = core.dim(b);
        if (core.equal(dimA, dimB)) {
            c = core.matrix(0, dimA[0], dimA[1]);
            for (i = 1; core.LT(i, dimA[0]); i = core.add(i, 1)) {
                for (j = 1; core.LT(j, dimA[1]); j = core.add(j, 1)) {
                    c[i][j] = core.logicalOR(a[i][j], b[i][j]);
                };
            };
            return (c);
        } else {
            throw (Error("The dimensions of matrix A must be the same as that of matrix B"));
        };
    };
    this.getDensity = function(adj, directed) {
        if (core.equal(core.type(directed), "undefined")) {
            directed = false;
        };
        dimAdj = core.dim(adj);
        dimI = dimAdj[0];
        n = core.sub(dimI, 1);
        for (i = 0; core.LT(i, dimI); i = core.add(i, 1)) {
            adj[0][i] = 0;
            adj[i][0] = 0;
        };
        nedges = matrix.count(adj);
        if (directed) {
            density = core.div(nedges, (core.mul(n, (core.sub(n, 1)))));
        } else {
            density = core.div((core.div(nedges, 2)), (core.div(core.mul(n, (core.sub(n, 1))), 2)));
        };
        return (density);
    };
    this.getDegrees = function(adj, directed) {
        if (core.equal(core.type(directed), "undefined")) {
            directed = false;
        };
        dimAdj = core.dim(adj);
        dimI = dimAdj[0];
        dimJ = dimAdj[1];
        degrees = core.matrix(0, dimI, 3);
        for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
            degrees[i][0] = matrix.count(adj, i, 1, i, core.sub(dimJ, 1));
            degrees[i][1] = matrix.count(adj, 1, i, core.sub(dimI, 1), i);
            if (directed) {
                degrees[i][2] = math.max(degrees[i][0], degrees[i][1]);
            } else {
                if (core.different(degrees[i][0], 0)) {
                    degrees[i][2] = degrees[i][0];
                } else {
                    degrees[i][2] = degrees[i][1];
                };
            };
        };
        return (degrees);
    };
    this.getDegreeDistribution = function(degrees) {
        dimDegrees = core.dim(degrees);
        dimI = dimDegrees[0];
        degDist = [];
        for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
            degree = degrees[i][2];
            if (core.equal(core.type(degDist[degree]), "undefined")) {
                degDist[degree] = 1;
            } else {
                degDist[degree] = core.add(degDist[degree], 1);
            };
        };
        hist = core.matrix(0, core.length(degDist), 3);
        i = 0;
        for (deg in degDist) {
            var dist = degDist[deg];
            hist[i][0] = deg;
            hist[i][1] = dist;
            i = core.add(i, 1);
        };
        dimHist = core.dim(hist);
        sumDegs = matrix.sum(hist, 0, 1, core.sub(dimHist[0], 1), 1);
        for (i = 0; core.LT(i, dimHist[0]); i = core.add(i, 1)) {
            hist[i][2] = core.mul((core.div(hist[i][1], sumDegs)), 100);
        };
        for (i = 0; core.LT(i, core.sub(dimHist[0], 1)); i = core.add(i, 1)) {
            for (j = i; core.LT(j, dimHist[0]); j = core.add(j, 1)) {
                if (core.GT(hist[i][0], hist[j][0])) {
                    degree = hist[i][0];
                    hist[i][0] = hist[j][0];
                    hist[j][0] = degree;
                    frequency = hist[i][1];
                    hist[i][1] = hist[j][1];
                    hist[j][1] = frequency;
                    percentual = hist[i][2];
                    hist[i][2] = hist[j][2];
                    hist[j][2] = percentual;
                };
            };
        };
        return (hist);
    };
    this.getAverageDegree = function(degrees) {
        dimDegrees = core.dim(degrees);
        avgDeg = matrix.avg(degrees, 1, 2, (core.sub(dimI, 1)), 2);
        return (avgDeg.avg);
    };
    this.getClustering = function(adj, directed) {
        if (core.equal(core.type(directed), "undefined")) {
            directed = false;
        };
        dimAdj = core.dim(adj);
        dimI = dimAdj[0];
        dimJ = dimAdj[1];
        if (directed) {
            for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
                for (j = 1; core.LT(j, dimJ); j = core.add(j, 1)) {
                    if (core.equal(adj[i][j], 1)) {
                        adj[j][i] = 1;
                    };
                };
            };
        };
        clustering = core.matrix(0, dimI, 1);
        for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
            neighbor = [];
            ki = matrix.count(adj, i, 1, i, (core.sub(dimJ, 1)));;
            if (core.GT(ki, 0)) {;
                for (j = 1; core.LT(j, dimJ); j = core.add(j, 1)) {
                    if (core.equal(adj[i][j], 1)) {
                        neighbor.push(j);
                    };
                };
                if (core.GT(core.length(neighbor), 0)) {;
                    n = 0;
                    for (n1 = 0; core.LT(n1, core.length(neighbor)); n1 = core.add(n1, 1)) {
                        for (n2 = 0; core.LT(n2, core.length(neighbor)); n2 = core.add(n2, 1)) {
                            if (core.different(n1, n2)) {
                                if (core.equal(adj[neighbor[n1]][neighbor[n2]], 1)) {
                                    n = core.add(n, 1);
                                };
                            };
                        };
                    };
                };;
                if (core.logicalOR((core.equal(ki, 0)), (core.equal(ki, 1)))) {
                    clustering[i][0] = 0;
                } else {
                    clustering[i][0] = core.div(n, (core.mul(ki, (core.sub(ki, 1)))));
                };
            };
        };
        return (clustering);
    };
    this.getAverageClustering = function(clustering) {
        dimClustering = core.dim(clustering);
        n = core.sub(dimClustering[0], 1);
        avgClustering = core.div(matrix.sum(clustering), n);
        return (avgClustering);
    };
    this.getShortestPath = function(adj) {
        dimAdj = core.dim(adj);
        dimI = dimAdj[0];
        dimJ = dimAdj[1];
        matrixOne = core.one(dimI, dimJ);
        matrixZero = core.zero(dimI, dimJ);
        for (i = 0; core.LT(i, dimI); i = core.add(i, 1)) {
            adj[0][i] = 0;
            adj[i][0] = 0;
        };
        geodesic = core.copyMatrix(adj);
        if (core.logicalOR((core.equal(adj, matrixZero)), (core.equal(adj, matrixOne)))) {
            return (geodesic);
        };
        old = core.copyMatrix(adj);
        prod = core.copyMatrix(adj);
        order = 1;
        while (true) {
            prod = this.getTransitiveClosure(adj, old);
            path = this.getBooleanOr(old, prod);
            order = core.add(order, 1);
            for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
                for (j = 1; core.LT(j, dimJ); j = core.add(j, 1)) {
                    if (core.logicalAND(core.logicalAND((core.equal(prod[i][j], 1)), (core.equal(geodesic[i][j], 0))), (core.different(i, j)))) {
                        geodesic[i][j] = order;
                    };
                };
            };
            if (core.equal(path, matrixOne)) {
                break;
            } else if (core.equal(path, old)) {
                break;
            } else if (core.equal(order, dimI)) {
                break;
            };
            old = prod;
        };
        return (geodesic);
    };
    this.getAverageShortestPath = function(geodesic) {
        dimGeodesic = core.dim(geodesic);
        dimI = dimGeodesic[0];
        dimJ = dimGeodesic[1];
        n = matrix.count(geodesic, 1, 1, core.sub(dimI, 1), core.sub(dimJ, 1));
        if (core.GT(n, 0)) {
            avgshortestpath = core.div(matrix.sum(geodesic, 1, 1, core.sub(dimI, 1), core.sub(dimJ, 1)), n);
        } else {
            avgshortestpath = 0;
        };
        return (avgshortestpath);
    };
    this.getDiameter = function(geodesic) {
        diameter = matrix.max(geodesic);
        return (diameter);
    };
    this.getFloydWarshallShortestPath = function(adj, path) {
        dimAdj = core.dim(adj);
        dimI = dimAdj[0];
        dimJ = dimAdj[1];
        geodesic = core.matrix(Number.MAX_VALUE, dimI, dimJ);
        for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
            for (j = 1; core.LT(j, dimJ); j = core.add(j, 1)) {
                if (core.different(adj[i][j], 0)) {
                    geodesic[i][j] = adj[i][j];
                    if (core.different(core.type(path), "undefined")) {
                        path[i][j] = j;
                    };
                };
            };
        };
        for (i = 0; core.LT(i, dimI); i = core.add(i, 1)) {
            geodesic[i][i] = 0;
            if (core.different(core.type(path), "undefined")) {
                path[i][i] = i;
            };
        };
        for (k = 1; core.LT(k, dimI); k = core.add(k, 1)) {
            for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
                for (j = 1; core.LT(j, dimJ); j = core.add(j, 1)) {
                    if (core.logicalOR((core.equal(geodesic[i][k], Number.MAX_VALUE)), (core.equal(geodesic[k][j], Number.MAX_VALUE)))) {
                        continue;
                    };
                    if (core.GT(geodesic[i][j], (core.add(geodesic[i][k], geodesic[k][j])))) {
                        geodesic[i][j] = core.add(geodesic[i][k], geodesic[k][j]);
                        if (core.different(core.type(path), "undefined")) {
                            path[i][j] = path[i][k];
                        };
                    };
                };
            };
        };
        for (i = 0; core.LT(i, dimI); i = core.add(i, 1)) {
            geodesic[i][i] = 0;
            geodesic[0][i] = 0;
            geodesic[i][0] = 0;
        };
        for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
            for (j = 1; core.LT(j, dimI); j = core.add(j, 1)) {
                if (core.equal(geodesic[i][j], Infinity)) {
                    geodesic[i][j] = 0;
                };
            };
        };
        return (geodesic);
    };
    this.doShortestPathWalk = function(path, i, j) {
        if (core.equal(path[i][j], -1)) {
            return ([]);
        };
        pij = [i];
        while (core.different(i, j)) {
            i = path[i][j];
            pij.push(i);
        };
        return (pij);
    };
    this.getNumberOfGeodesics = function(adj, geodesic, directed) {
        dimGeodesic = core.dim(geodesic);
        dimI = dimGeodesic[0];
        dimJ = dimGeodesic[1];
        gjk = core.copyMatrix(adj);
        for (i = 0; core.LT(i, dimI); i = core.add(i, 1)) {
            gjk[0][i] = 0;
            gjk[i][0] = 0;
            gjk[i][i] = 1;
        };
        diameter = this.getDiameter(geodesic);
        for (p = 2; core.LE(p, diameter); p = core.add(p, 1)) {
            npaths = core.power(adj, p);
            for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
                for (j = 1; core.LT(j, dimJ); j = core.add(j, 1)) {
                    if (core.different(i, j)) {
                        if (core.equal(gjk[i][j], 0)) {
                            gjk[i][j] = npaths[i][j];
                        };
                    };
                };
            };
        };
        return (gjk);
    };
    this.getCentrality = function(adj, geodesic, directed) {
        dimGeodesic = core.dim(geodesic);
        dimI = dimGeodesic[0];
        dimJ = dimGeodesic[1];
        centrality = core.matrix(0, dimI, 5);
        n = core.sub(dimI, 1);
        for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
            s = matrix.sum(geodesic, i, 1, i, core.sub(dimJ, 1));
            if (core.GT(s, 0)) {
                centrality[i][0] = core.div(1, s);
                centrality[i][2] = core.div((core.sub(n, 1)), s);
                centrality[i][4] = s;
            };
        };
        gjk = this.getNumberOfGeodesics(adj, geodesic, directed);
        for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
            bc = 0;
            for (j = 1; core.LT(j, dimI); j = core.add(j, 1)) {
                for (k = 1; core.LT(k, dimJ); k = core.add(k, 1)) {;
                    if (core.logicalAND(core.logicalAND((core.LT(j, k)), (core.different(j, i))), (core.different(i, k)))) {
                        spjk = geodesic[j][k];
                        if (core.equal((core.add(geodesic[j][i], geodesic[i][k])), spjk)) {
                            bc = core.add(bc, core.div(math.max(gjk[j][i], gjk[i][k]), gjk[j][k]));
                        };
                    };
                };
            };
            centrality[i][1] = bc;;
            centrality[i][3] = core.div(bc, (core.div((core.mul((core.sub(n, 1)), (core.sub(n, 2)))), 2)));
        };
        return (centrality);
    };
    this.getVertexEfficiency = function(geodesic) {
        dimGeodesic = core.dim(geodesic);
        dimI = dimGeodesic[0];
        dimJ = dimGeodesic[1];
        efficiency = core.matrix(0, dimI, dimJ);
        for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
            for (j = 1; core.LT(j, dimJ); j = core.add(j, 1)) {
                if (core.different(geodesic[i][j], 0)) {
                    efficiency[i][j] = core.div(1, geodesic[i][j]);
                };
            };
        };
        return (efficiency);
    };
    this.getGlobalEfficiency = function(efficiency) {
        dimEfficiency = core.dim(efficiency);
        n = core.sub(dimEfficiency[0], 1);
        avgeff = core.div(matrix.sum(efficiency), (core.mul(n, (core.sub(n, 1)))));
        return (avgeff);
    };
    this.getLabels = function(adj) {
        dimAdj = core.dim(adj);
        dimI = dimAdj[0];
        labels = [];
        for (i = 1; core.LT(i, dimI); i = core.add(i, 1)) {
            labels[i] = adj[i][0];
        };
        return (labels);
    };
    this.setLabels = function(adj, labels) {
        dimAdj = core.dim(adj);
        dimI = dimAdj[0];
        for (i = 0; core.LT(i, dimI); i = core.add(i, 1)) {
            adj[i][0] = labels[i];
            adj[0][i] = labels[i];
        };
        return (adj);
    };
    this.removeLabels = function(adj) {
        dimAdj = core.dim(adj);
        dimI = dimAdj[0];
        for (i = 0; core.LT(i, dimI); i = core.add(i, 1)) {
            adj[i][0] = 0;
            adj[0][i] = 0;
        };
        return (adj);
    };
};
cna = new cna_();