export function ConvertData(recipeTree : any) {
    const nodes: { id: string; label: string; color?: string }[] = [];
    const edges: { id: string; from: string; to: string; }[] = [];

    function traverse(node: any, parentId: string | null) {
        const nodeId = `${node.element}-${Math.random().toString(36).substr(2, 5)}`;
        nodes.push({
            id: nodeId,
            label: node.element,
            color: node.element === recipeTree.target ? '#FF0000' : '#00FF00',
        });

        if (parentId) {
            edges.push({
                id: `${parentId}-${nodeId}`,
                from: parentId,
                to: nodeId,
            })
        }

        if (node.components && node.components.length > 0) {
            node.components.forEach((childNode: any) => {
                traverse(childNode, nodeId);
            });
        }
    }
    traverse(recipeTree.tree, null);
    return { nodes, edges };
}