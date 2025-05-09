'use client';

import React from 'react';
import { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network';
import "vis-network/styles/vis-network.css";
import { ConvertData } from '@/utils/convert-data';

export default function RecipeTree({ data }: { data: any }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !data) return;

        const { nodes, edges } = ConvertData(data);

        const visNodes = new DataSet(nodes);
        const visEdges = new DataSet(edges);

        const networkData = { nodes: visNodes, edges: visEdges };
        const options = {
            layout: {
                hierarchical: {
                    sortMethod: 'directed',
                    enabled: true,
                    levelSeparation: 200,
                    nodeSpacing: 200,
                    treeSpacing: 200,
                    blockShifting: true,
                    edgeMinimization: true,
                    parentCentralization: true,
                    direction: 'UD',
                },
            },
            physics: {
                enabled: false,
            },
            nodes: {
                shape: 'box',
                font: { size: 14 },
            },
            edges: {
                smooth: {
                    enabled: true,
                    type: 'dynamic',
                    roundness: 0.5,
                }
            },
        };

        new Network(containerRef.current, networkData, options);
    }, [data]);

    return <div ref={containerRef} className="w-full h-full bg-white rounded-lg shadow-lg" />;
}