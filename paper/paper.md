---
title: 'CNATool - Complex Network Analysis Tool'
tags:
  - CNATool
  - complex network analysis
  - graph
  - network
  - degree
  - clustering
  - centrality
  - Pajek 
authors:
  - name: Roberto Luiz Souza Monteiro
    orcid: 0000-0002-3931-5953
    affiliation: "1, 2"
    corresponding: true
    email: roberto.monteiro@fieb.org.br
  - name: Renata Souza Freitas Dantas Barreto
    affiliation: 2
    orcid: 0000-0003-3042-2493
  - name: Andréia Rita da Silva
    affiliation: 2
  - name: Alexandre do Nascimento Silva
    orcid: 0000-0001-7436-8818
    affiliation: "2, 3"
  - name: José Roberto de Araújo Fontoura
    orcid: 0000-0002-9703-835X
    affiliation: 2
  - name: Marcos Batista Figueredo
    orcid: 0000-0002-8193-5419
    affiliation: 2
  - name: Hernane Borges de Barros Pereira
    orcid: 0000-0001-7476-9267
    affiliation: "1, 2"
affiliations:
 - name: SENAI CIMATEC University, Brasil \newline
   index: 1
 - name: Universidade do Estado da Bahia, Brasil \newline
   index: 2
 - name: Universidade Estadual de Santa Cruz, Brasil \newline
   index: 3
   
date: 29 Dezembro 2022
bibliography: paper.bib

---

# Summary

CNATool is an online program for analyzing complex and social networks. It was developed to allow quick and simplified analysis of network graphs from any device connected to the Internet. It supports graphs in Pajek and JSON formats, creates graphs of artificial networks, displays graphs, selects the layout algorithm and displays its properties (average degree, density, average clustering coefficient, average shortest path, diameter and efficiency). It also displays detailed properties of the vertices and saves the graph in Pajek, JSON and SVG formats, in addition to generating HTML reports.

# Introduction

The analysis of complex networks has become frequent, considering that many social, biological and technological phenomena can be represented as network diagrams (also known as Graphs), allowing not only a visual analysis of the problem, but the use of tools developed for a given application involving graph theory [@Newman2003], in solving problems different from those originally thought. @Pereira2007, in their study on LPAs (local productive arrangements), used networks theory to study the processes of cooperation and collaboration between companies that make up an LPA of confections by analyzing the data using the Pajek software [@Moody2005; @Prieto2008]. @Vieira2016 studied collaboration processes between researchers at an important research institute, using similar techniques applying Gephi software in their analysis, also used by @Casteigts2012 in their research on time-varying networks (TVGs). @Monteiro2014 proposed a model appropriate to explain evolution of species in an affinity network, based on an evolutive algorithm that incorporates the same network properties. @Pereira2019, analyzed the stock exchanges for 20 countries in a multiscale network identifying the linkages between markets. @Zhou2019 used complex network theory to monitor coupled risks. @Zhu2021 applied centrality calculations to study the functional architecture of healthy individuals trying to determine their regulatory mechanism. @Chang2021 studied the deterioration of associative memory in individuals with mild amnesia, analyzing semantic clusters. @Li2019 analyzed the effect of centrality of directors on social network in charitable donations. @Guo2020 showed how the Chinese construction industry applies complex network analysis to study accident risks. @Zhang2021 proposed a model of public opinion diffusion in social networks applying the theory of scale-free networks. @Krajewski2022 studied the effect of centrality in collaborative networks among criminal members of the Italian-American mafia.

Health studies have also benefited from the use of network theory and its computational tools. @Bullmore2009 studied the structure and functions of the brain using graph theory [@Goulas2015]. Inspired by studies on social networks, they analyzed the neural network of monkey cortex and demonstrated the important role of weak connections in the cohesion of the studied network. @Hilgetag2000 also studied the visual cortex of monkeys and cats using complex network analysis techniques.

These are just some applications involving the use of techniques and software developed for social and complex network analysis. @Watts2004, in its review on the state of the art in complex network analysis presents other applications, highlighting economy, transportation and energy distribution.

# Statement of Need 

@Newman2003 presents the main concepts involved in complex and social network analysis. The author discusses the types of networks, topologies, local and global properties. Regarding the types of networks, Newman highlights social, informational, technological and biological networks. These networks, despite having different natures, present common properties such as number of vertices, number of edges, density [@Pereira2016; @Chatterjee2007], average degree, average clustering coefficient [@Schank2005], average shortest path [@Johnson1977], diameter [@Razzaque2008] and efficiency [@Latora2001]. And even at micro scale, similar parameters are observed, highlighting the clustering coefficient and the closeness [@Freeman1978; @Freeman1979; @Bhardwaj2011] and betweenness [@Freeman1977; @Brandes2001; @Barthelemy2004; @Curado2022] centralities. With regard to topologies, networks of apparently different natures, such as social and biological, often present phenomena common to small-world [@Watts1998; @Marchiori2000; @Emmert2006; @Bakshy2011] and scale-free networks [@Barabasi2002; @Crucitti2003].

Based on this view of the literature, we designed the mind map presented in \autoref{fig:pic1}. Moreover, CNATool implements some properties not found in other software, for example incidence-fidelity index [@Teixeira2010]. \autoref{tb:tb1} presents a summary of the main features presented by each of the analyzed programs.

![Mind map of concepts involving analysis of complex networks. Green means high; yellow means medium and; red mean low value. Olive highlights CNATool’s advantages.\label{fig:pic1}](Picture1.png)

This program is intended for researchers working in the analysis of social and biological networks. Knowledge of network analysis and familiarity with scripting languages is essential.

| Feature	| CNATool	| Gephi	| Pajek	| SocNetV |
| :---- | ---- | ---- | ---- | ----: |
| Has high accuracy	| Yes	| Yes	| Yes	| Yes |
| Is user-friendly	| Yes	| Yes	| No	| No |
| Runs on Windows	| Yes	| Yes	| Yes	| Yes |
| Runs on Linux	| Yes	| Yes	| No | Yes |
| Runs on macOS	| Yes	| Yes	| No	| Yes |
| Runs on Android	| Yes	| No	| No	| No |
| Runs on iOS	| Yes	| No	| No	| No |
| Runs direct on web	| Yes	| No	| No	| No |
| Calculates Efficiency	| Yes	| No	| No	| No |
| Calculates Incidence-fidelity	| Yes	| No	| No	| No |
| Uses the GPU to speed up calculations	| Yes	| No	| No	| No |

Table: Summary of the main features presented by each of the analyzed programs.\label{tb:tb1}

# Conclusions

The CNATool tool was developed having in mind the analysis of complex and social networks from any device connected to the Internet. This application offers a friendly and intuitive user interface, while providing accurate results and detailed reports of global and local network properties being analyzed.

The program allows exporting of results in the most common file formats and also provides a command line tool that allows batch processing, contributing to speed up analysis processes when an experiment requires calculation of properties of a large number of networks.

# References
