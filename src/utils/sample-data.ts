export const sampleRecipe = {
  target: "Human",
  tree: {
    element: "Human",
    components: [
      {
        element: "Life",
        components: [
          {
            element: "Energy",
            components: [], // Base element
          },
          {
            element: "Swamp",
            components: [
              {
                element: "Mud",
                components: [], // Base element
              },
              {
                element: "Water",
                components: [], // Base element
              },
            ],
          },
        ],
      },
      {
        element: "Clay",
        components: [
          {
            element: "Mud",
            components: [], // Already defined above
          },
          {
            element: "Stone",
            components: [], // Base element
          },
        ],
      },
    ],
  },
};