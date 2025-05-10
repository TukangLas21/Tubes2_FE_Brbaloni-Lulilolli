"use client";

import { useEffect, useRef } from "react";
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data"
import "vis-network/styles/vis-network.css";
import { ConvertData } from "../utils/convert-data";
import { group } from "console";

export default function RecipeTree({ recipeData }: { recipeData: any }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !recipeData) return;

        const { nodes, edges } = ConvertData(recipeData);

        const visNodes = new DataSet([
            {id:1, group:'myGroup', label:"Node1"},
            {id:2, group:'myGroup', label:"Node2"}
        ]); 
        const visEdges = new DataSet([
            { id: 1, from: 1, to: 2}
        ]);

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
    }, [recipeData]);

    return <div ref={containerRef} style={{ height: "100%", width: "100%" }} />;
}