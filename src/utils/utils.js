export function ConvertData(recipeTree, target) {
    return {
        nodes: ConvertDataNode(recipeTree.nodes, target),
        edges: ConvertDataEdge(recipeTree.edges)
    }
}

export function ConvertDataNode(nodeArr, target) {
    const nodes = [];

    for (let i = 0; i < nodeArr.length; i++) {
        nodes.push({
            id: nodeArr[i].id,
            label: nodeArr[i].name,
            color: nodeArr[i].color === target ? "#FFD700" : "#70a1ff"
        })
    }
    
    return nodes;
}

export function ConvertDataEdge(edgeArr) {
    const edges = [];

    for (let i = 0; i < edgeArr.length; i++) {
        edges.push({
            id: i,
            from: edgeArr[i].from,
            to: edgeArr[i].to
        })
    }

    return edges;
}

export async function fetchData(element) {
    try {
        const response = await fetch(`http://localhost:3000/api/${element}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Data fetched successfully");
        return data;
    } catch (error) {
        console.error('Error fetching data from API: ', error);
        throw error; 
    }
}