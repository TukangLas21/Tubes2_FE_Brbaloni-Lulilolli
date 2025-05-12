export function ConvertData(recipeTree, target) {
    return {
        nodes: ConvertDataNode(recipeTree.nodes, target),
        edges: ConvertDataEdge(recipeTree.edges)
    }
}

export function getNodeCount(nodeArr) {
    let count = 0;
    nodeArr.forEach(node => {
        if (node.label !== "+") {
            count++;
        } 
    })
    return count;
}

export function ConvertDataNode(nodeArr, target) {
    const nodes = [];

    nodeArr.forEach(node => {
        if (node.label === "+") {
            nodes.push({
                id: node.id,
                label: node.label,
                color: '#857a7a'
            })
        } else if (node.label === target) {
            nodes.push({
                id: node.id,
                label: node.label,
                color: '#FFD700'
            })
        } else if (node.label === "Fire") {
            nodes.push({
                id: node.id,
                label: node.label,
                color: '#f10000'
            })
        } else if (node.label === "Water") {
            nodes.push({
                id: node.id,
                label: node.label,
                color: '#1E90FF'
            })
        } else if (node.label === "Earth") {
            nodes.push({
                id: node.id,
                label: node.label,
                color: '#943e00'
            })
        } else if (node.label === "Air") {
            nodes.push({
                id: node.id,
                label: node.label,
                color: '#c8c6c5'
            })
        } else {
            nodes.push({
                id: node.id,
                label: node.label,
                color: '#70A1FF'
            })
        }
    })
    
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