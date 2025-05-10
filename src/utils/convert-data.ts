export function ConvertData(recipeTree: any) {
    // array of nodes and edges
    const nodes: { 
        id: string; 
        label: string; 
        color?: string
    }[] = [];
    const edges: { 
        id:string; 
        from: string; 
        to: string 
    }[] = [];

    // helper function to traverse JSON file
    function traverse(node: any, parentId: string | null = null) {
        const nodeId = `${node.element}-${Math.random().toString(36).substr(2, 5)}`; 

        nodes.push({ 
            id: nodeId, 
            label: node.element,
            color: node.components.length === 0 ? "#FFD700" : "#70a1ff", 
        });

        if (parentId) {
            edges.push({ 
                id: `${parentId}-${nodeId}`,
                from: parentId, 
                to: nodeId 
            });
        }

        if (node.components && node.components.length > 0) {
            node.components.forEach((child: any) => traverse(child, nodeId));
        }
    }

    traverse(recipeTree.tree);
    return { nodes, edges };
}