function snet_() {this.createFromDlf = function (fileContents,properties,topology,weighted,allowLoops,network) {if (core.equal(core.type(properties),"undefined")) {properties={"n": 0,"m": 0,"directed": true};} else {properties.n=0;properties.m=0;};if (core.equal(core.type(topology),"undefined")) {topology="chain";};if (core.equal(core.type(weighted),"undefined")) {weighted=true;};if (core.equal(core.type(network),"undefined")) {network={"nodes": [],"edges": [],"numberOfSentences": 0,"vocabulary": 0,"density": []};};if (core.equal(core.type(allowLoops),"undefined")) {allowLoops=false;};if (core.equal(properties.directed,true)) {edgeType="arrow";} else {edgeType="line";};findNode = function (list,label) {for (index in list) {var value = list[index];if (core.equal(value.label,label)) {return (value);};};return ("undefined");};findEdge = function (list,source,target,directed) {if (core.equal(core.type(directed),"undefined")) {directed=false;};for (index in list) {var value = list[index];if (directed) {if (core.logicalAND((core.equal(value.source,source)),(core.equal(value.target,target)))) {return (value);};} else {if (core.logicalOR((core.logicalAND((core.equal(value.source,source)),(core.equal(value.target,target)))),(core.logicalAND((core.equal(value.source,target)),(core.equal(value.target,source)))))) {return (value);};};};return ("undefined");};nodes=[];endOfRecord=false;t1=core.date();fileLines=core.split(core.replace(fileContents,"\r\n","\n"),"\n");system.println(core.add(core.add("Processing ",fileLines.length)," lines ..."));for (l=0;core.LT(l,fileLines.length);l=core.add(l,1)) {if (core.logicalAND((core.different(l,0)),(core.equal(core.mod(l,1000),0)))) {system.println(core.add(core.add(core.add(core.add("Processed ",l.toString())," lines of "),fileLines.length.toString()),"."));};line=fileLines[l];line=core.replace(line,"\t"," ");record=core.splitCSV(line.trim()," ",true);if (core.equal(record[0],"{S}")) {network.numberOfSentences=core.add(network.numberOfSentences,1);endOfRecord=true;} else {if (core.equal(l,core.sub(fileLines.length,1))) {network.numberOfSentences=core.add(network.numberOfSentences,1);endOfRecord=true;};};if (core.GE(core.length(record),1)) {if (core.logicalNot(endOfRecord)) {label=core.toString(record[0]);x="";y="";size="";if (core.equal(x,"")) {x=math.random();};if (core.equal(y,"")) {y=math.random();};if (core.equal(size,"")) {size=1;};node={"id": label,"label": label,"x": x,"y": y,"size": size};nodes.push(node);} else {for (index in nodes) {var node = nodes[index];nodeFound=findNode(network.nodes,node.label);if (core.equal(nodeFound,"undefined")) {network.nodes.push(node);network.vocabulary=core.add(network.vocabulary,1);} else {nodeFound.size=core.add(nodeFound.size,1);};};if (core.equal(topology,"chain")) {for (i=0;core.LT(i,core.sub(nodes.length,1));i=core.add(i,1)) {node1=nodes[i];node2=nodes[core.add(i,1)];if (core.logicalNot(allowLoops)) {if (core.equal(node1.id,node2.id)) {continue;};};edgeFound=findEdge(network.edges,node1.id,node2.id,properties.directed);if (core.equal(edgeFound,"undefined")) {edge={"id": core.add("e",network.edges.length),"label": "1","source": node1.id,"target": node2.id,"size": 1,"type": edgeType};network.edges.push(edge);} else {if (weighted) {edgeFound.size=core.add(edgeFound.size,1);edgeFound.label=core.toString(edgeFound.size);};};};} else if (core.equal(topology,"clique")) {for (index1 in nodes) {var node1 = nodes[index1];for (index2 in nodes) {var node2 = nodes[index2];if (core.logicalNot(allowLoops)) {if (core.equal(node1.id,node2.id)) {continue;};};if (core.GT(index1,index2)) {continue;};edgeFound=findEdge(network.edges,node1.id,node2.id,properties.directed);if (core.equal(edgeFound,"undefined")) {edge={"id": core.add("e",network.edges.length),"label": "1","source": node1.id,"target": node2.id,"size": 1,"type": edgeType};network.edges.push(edge);} else {if (weighted) {edgeFound.size=core.add(edgeFound.size,1);edgeFound.label=core.toString(edgeFound.size);};};};};} else if (core.equal(topology,"circle")) {for (i=0;core.LT(i,core.sub(nodes.length,1));i=core.add(i,1)) {node1=nodes[i];node2=nodes[core.add(i,1)];if (core.logicalNot(allowLoops)) {if (core.equal(node1.id,node2.id)) {continue;};};edgeFound=findEdge(network.edges,node1.id,node2.id,properties.directed);if (core.equal(edgeFound,"undefined")) {edge={"id": core.add("e",network.edges.length),"label": "1","source": node1.id,"target": node2.id,"size": 1,"type": edgeType};network.edges.push(edge);} else {if (weighted) {edgeFound.size=core.add(edgeFound.size,1);edgeFound.label=core.toString(edgeFound.size);};};if (core.equal(core.add(i,1),core.sub(nodes.length,1))) {node1=nodes[core.add(i,1)];node2=nodes[0];edgeFound=findEdge(network.edges,node1.id,node2.id,properties.directed);if (core.equal(edgeFound,"undefined")) {edge={"id": core.add("e",network.edges.length),"label": "1","source": node1.id,"target": node2.id,"size": 1,"type": edgeType};network.edges.push(edge);} else {if (weighted) {edgeFound.size=core.add(edgeFound.size,1);edgeFound.label=core.toString(edgeFound.size);};};};};};properties.n=network.nodes.length;properties.m=network.edges.length;if (properties.directed) {density=(core.div(properties.m,(core.mul(properties.n,(core.sub(properties.n,1))))));} else {density=(core.div(core.mul(2,properties.m),(core.mul(properties.n,(core.sub(properties.n,1))))));};network.density.push(density);nodes=[];endOfRecord=false;};};};properties.n=network.nodes.length;properties.m=network.edges.length;t2=core.date();t=core.sub(t2,t1);system.println(core.add(core.add(core.add(core.add("Processed ",l.toString())," lines of "),fileLines.length.toString()),"."));system.println(core.add(core.add("Elapsed time: ",t)," ms."));return (network);};this.createFromJson = function (jsonData,properties,topology,weighted,allowLoops,network) {if (core.equal(core.type(properties),"undefined")) {properties={"n": 0,"m": 0,"directed": true};} else {properties.n=0;properties.m=0;};if (core.equal(core.type(topology),"undefined")) {topology="chain";};if (core.equal(core.type(weighted),"undefined")) {weighted=true;};if (core.equal(core.type(network),"undefined")) {network={"nodes": [],"edges": [],"numberOfSentences": 0,"vocabulary": 0,"density": []};};if (core.equal(core.type(allowLoops),"undefined")) {allowLoops=false;};if (core.equal(properties.directed,true)) {edgeType="arrow";} else {edgeType="line";};findNode = function (list,label) {for (index in list) {var value = list[index];if (core.equal(value.label,label)) {return (value);};};return ("undefined");};findEdge = function (list,source,target,directed) {if (core.equal(core.type(directed),"undefined")) {directed=false;};for (index in list) {var value = list[index];if (directed) {if (core.logicalAND((core.equal(value.source,source)),(core.equal(value.target,target)))) {return (value);};} else {if (core.logicalOR((core.logicalAND((core.equal(value.source,source)),(core.equal(value.target,target)))),(core.logicalAND((core.equal(value.source,target)),(core.equal(value.target,source)))))) {return (value);};};};return ("undefined");};nodes=[];t1=core.date();system.println(core.add(core.add("Processing ",jsonData.length)," records ..."));network.numberOfSentences=jsonData.length;for (r=0;core.LT(r,jsonData.length);r=core.add(r,1)) {if (core.logicalAND((core.different(r,0)),(core.equal(core.mod(r,1000),0)))) {system.println(core.add(core.add(core.add(core.add("Processed ",r.toString())," records of "),jsonData.length.toString()),"."));};record=jsonData[r];if (core.equal(record.length,0)) {continue;};for (w=0;core.LT(w,record.length);w=core.add(w,1)) {word=record[w];label=word.object;x=math.random();y=math.random();size=1;node={"id": label,"label": label,"x": x,"y": y,"size": size,"class": word.class,"subClass": word.subClass,"subSubClass": word.subSubClass};nodes.push(node);};for (index in nodes) {var node = nodes[index];nodeFound=findNode(network.nodes,node.label);if (core.equal(nodeFound,"undefined")) {network.nodes.push(node);network.vocabulary=core.add(network.vocabulary,1);} else {nodeFound.size=core.add(nodeFound.size,1);};};if (core.equal(topology,"chain")) {for (i=0;core.LT(i,core.sub(nodes.length,1));i=core.add(i,1)) {node1=nodes[i];node2=nodes[core.add(i,1)];if (core.logicalNot(allowLoops)) {if (core.equal(node1.id,node2.id)) {continue;};};edgeFound=findEdge(network.edges,node1.id,node2.id,properties.directed);if (core.equal(edgeFound,"undefined")) {edge={"id": core.add("e",network.edges.length),"label": "1","source": node1.id,"target": node2.id,"size": 1,"type": edgeType};network.edges.push(edge);} else {if (weighted) {edgeFound.size=core.add(edgeFound.size,1);edgeFound.label=core.toString(edgeFound.size);};};};} else if (core.equal(topology,"clique")) {for (index1 in nodes) {var node1 = nodes[index1];for (index2 in nodes) {var node2 = nodes[index2];if (core.logicalNot(allowLoops)) {if (core.equal(node1.id,node2.id)) {continue;};};if (core.GT(index1,index2)) {continue;};edgeFound=findEdge(network.edges,node1.id,node2.id,properties.directed);if (core.equal(edgeFound,"undefined")) {edge={"id": core.add("e",network.edges.length),"label": "1","source": node1.id,"target": node2.id,"size": 1,"type": edgeType};network.edges.push(edge);} else {if (weighted) {edgeFound.size=core.add(edgeFound.size,1);edgeFound.label=core.toString(edgeFound.size);};};};};} else if (core.equal(topology,"circle")) {for (i=0;core.LT(i,core.sub(nodes.length,1));i=core.add(i,1)) {node1=nodes[i];node2=nodes[core.add(i,1)];if (core.logicalNot(allowLoops)) {if (core.equal(node1.id,node2.id)) {continue;};};edgeFound=findEdge(network.edges,node1.id,node2.id,properties.directed);if (core.equal(edgeFound,"undefined")) {edge={"id": core.add("e",network.edges.length),"label": "1","source": node1.id,"target": node2.id,"size": 1,"type": edgeType};network.edges.push(edge);} else {if (weighted) {edgeFound.size=core.add(edgeFound.size,1);edgeFound.label=core.toString(edgeFound.size);};};if (core.equal(core.add(i,1),core.sub(nodes.length,1))) {node1=nodes[core.add(i,1)];node2=nodes[0];edgeFound=findEdge(network.edges,node1.id,node2.id,properties.directed);if (core.equal(edgeFound,"undefined")) {edge={"id": core.add("e",network.edges.length),"label": "1","source": node1.id,"target": node2.id,"size": 1,"type": edgeType};network.edges.push(edge);} else {if (weighted) {edgeFound.size=core.add(edgeFound.size,1);edgeFound.label=core.toString(edgeFound.size);};};};};};properties.n=network.nodes.length;properties.m=network.edges.length;if (properties.directed) {density=(core.div(properties.m,(core.mul(properties.n,(core.sub(properties.n,1))))));} else {density=(core.div(core.mul(2,properties.m),(core.mul(properties.n,(core.sub(properties.n,1))))));};network.density.push(density);nodes=[];};properties.n=network.nodes.length;properties.m=network.edges.length;t2=core.date();t=core.sub(t2,t1);system.println(core.add(core.add(core.add(core.add("Processed ",r.toString())," records of "),jsonData.length.toString()),"."));system.println(core.add(core.add("Elapsed time: ",t)," ms."));return (network);};this.calculateIncidenceFidelity = function (jsonData,updateWeights) {if (core.equal(core.type(jsonData),"undefined")) {return ("undefined");};if (core.equal(core.type(updateWeights),"undefined")) {updateWeights=false;};nodes=jsonData.nodes;edges=jsonData.edges;numberOfSentences=jsonData.numberOfSentences;vocabulary=jsonData.vocabulary;ifData={"numberOfSentences": numberOfSentences,"vocabulary": vocabulary,"vocabularyByNumberOfSentences": core.div(vocabulary,numberOfSentences)};findNode = function (list,id) {for (index in list) {var value = list[index];if (core.equal(value.id,id)) {return (value);};};return ("undefined");};rows=[];for (index in edges) {var value = edges[index];source=findNode(nodes,value.source);target=findNode(nodes,value.target);row=[];row.push(value.id);row.push(core.add(core.add(source.label,"-"),target.label));row.push(source.size);row.push(target.size);row.push(value.size);incidence=core.div(value.size,numberOfSentences);fidelity=core.div(value.size,(core.sub(core.add(source.size,target.size),value.size)));incidenceFidelity=core.mul(incidence,fidelity);row.push(incidence);row.push(fidelity);row.push(incidenceFidelity);rows.push(row);if (updateWeights) {value.size=incidenceFidelity;};};ifData.rows=rows;return (ifData);};};snet = new snet_();