"use client";

import { useEffect, useRef } from "react";
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data"
import "vis-network/styles/vis-network.css";
import { ConvertDataNode, ConvertDataEdge } from "../utils/utils";

interface RecipeTreeProps {
    nodesArr: any;
    edgesArr: any;
    target: string | undefined;
}

export default function RecipeTree({ nodesArr, edgesArr, target }: RecipeTreeProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !nodesArr || !edgesArr) return;

        const nodes = ConvertDataNode(nodesArr, target);
        const edges = ConvertDataEdge(edgesArr);

        const visNodes = new DataSet(nodes);
        const visEdges = new DataSet(edges);

        const data = { nodes: visNodes, edges: visEdges };
        const options = {
            layout: {
                hierarchical: {
                    levelSeparation: 75,
                    direction: "DU",
                    sortMethod: "directed",
                },
            },
            groups: {
                myGroup: {
                    shape: "box",
                    color: { background:'red', border: "#000000" },
                },
            },
            physics: {
                enabled: true,
            },
            nodes: {
                font: { size: 14 },
                margin: { top: 10 },
            },
            edges: {
                smooth: true,
                arrows: { to: { enabled: true, scaleFactor: 0.5 } },
            },
        };

        new Network(containerRef.current, data, options);
    }, [nodesArr, edgesArr]);

    return <div ref={containerRef} style={{ height: "100%", width: "100%" }} />;
}