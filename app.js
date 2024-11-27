// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// async function fetchDataAndRender(
//   filename,
//   appId,
//   highlightWords,
//   appTitle,
//   appDescrip
// ) {
//   const text = await d3.text(filename);

//   const sentences = text.split("\n");

//   const data = { name: "•", children: [] };
//   let wordCount = 0;
//   sentences.forEach((sentence) => {
//     const words = sentence.split(" ");
//     let currentNode = data;

//     words.forEach((input) => {
//       const word = input.replace(/[^a-zA-Z ]/g, "");

//       if (word == "peace") {
//         wordCount = wordCount + 1;
//       }
//       const existingNode = currentNode.children.find(
//         (child) => child.name === word
//       );

//       if (existingNode) {
//         currentNode = existingNode;
//       } else {
//         const newNode = { name: word, children: [] };
//         currentNode.children.push(newNode);
//         currentNode = newNode;
//       }
//     });
//   });
//   console.log(wordCount);

//   const app = d3
//     .select(`#${appId}`)
//     .html("")
//     .append("div")
//     // .style("margin", "0 auto")
//     .style("padding", "10px")
//     .style("border-radius", "10px")
//     // .style("width", "fit-content")
//     .style("background", "#002868")
//     .style("box-shadow", "0px 0px 2px hsla(0, 0%, 0%, 0.1)");

//   const title = app
//     .append("h2")
//     .style("margin", "10")
//     .style("padding", "8px")
//     // .style("font-size", "2.1rem")
//     .style("font-weight", 100)
//     .style("color", "white")
//     .text(appTitle);

//   const Descrip = app
//     .append("h3")
//     .style("margin", "10")
//     .style("padding", "8px")
//     // .style("font-size", "2.1rem")
//     .style("font-weight", 100)
//     .style("color", "white")
//     .text(appDescrip);

//   const WIDTH = 1000,
//     HEIGHT = 1000;

//   const root = d3.hierarchy(data, function (d) {
//     return d.children;
//   });

//   const tree = d3.tree().size([WIDTH, HEIGHT]);

//   tree(root);

//   const svg = app.append("svg").attr("width", WIDTH).attr("height", HEIGHT);
//   // .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);

//   const chart = svg.append("g").attr("transform", "translate(50 5)");

//   chart
//     .selectAll("path")
//     .data(root.descendants().slice(1))
//     .enter()
//     .append("path")
//     .attr("d", function (d) {
//       return `M ${
//         d.y
//       } ${d.x} C ${d.parent.y + 50} ${d.x} ${d.parent.y + 150} ${d.parent.x} ${d.parent.y} ${d.parent.x}`;
//     })
//     .style("fill", "none")
//     .attr("stroke", (d) => {
//       if (d.parent.data.name === "Start") {
//         return "transparent";
//       } else {
//         return "none";
//       }
//     });

//   chart
//     .selectAll("g")
//     .data(root.descendants())
//     .enter()
//     .append("g")
//     .attr("transform", function (d) {
//       return "translate(" + d.y + "," + d.x + ")";
//     })
//     .call((g) => {
//       g.append("text")
//         .attr("text-anchor", (d) => {
//           return d.children ? "end" : "start";
//         })
//         .attr("transform", (d) => {
//           const x = d.children ? -20 : 20;
//           return `translate(${x} 0)`;
//         })
//         .attr("font-size", (d) => {
//           return highlightWords.some(
//             (word) => d.data.name.toLowerCase() === word.toLowerCase()
//           )
//             ? "18px"
//             : "8px";
//         })
//         .attr("font-weight", (d) => {
//           return highlightWords.some(
//             (word) => d.data.name.toLowerCase() === word.toLowerCase()
//           )
//             ? "bold"
//             : "normal";
//         })
//         .style("fill", (d) => {
//           return highlightWords.some(
//             (word) => d.data.name.toLowerCase() === word.toLowerCase()
//           )
//             ? "white"
//             : "#BF0A30";
//         })
//         .style("z-index", (d) => {
//           return highlightWords.some(
//             (word) => d.data.name.toLowerCase() === word.toLowerCase()
//           )
//             ? "5" // Valid z-index
//             : "1"; // Valid z-index
//         })
//         .style("border", "2px solid black")
//         .style("border-radius", "2px")
//         .style("padding", "2px")
//         .html((d) => d.data.name);
//     });
// }

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function fetchDataAndRender(
  filename,
  appId,
  highlightWords,
  appTitle,
  appDescrip
) {
  const text = await d3.text(filename);

  const sentences = text.split("\n");

  const data = { name: "•", children: [] };
  let wordCount = 0;
  sentences.forEach((sentence) => {
    const words = sentence.split(" ");
    let currentNode = data;

    words.forEach((input) => {
      const word = input.replace(/[^a-zA-Z ]/g, "");

      if (word == "peace") {
        wordCount += 1;
      }
      const existingNode = currentNode.children.find(
        (child) => child.name === word
      );

      if (existingNode) {
        currentNode = existingNode;
      } else {
        const newNode = { name: word, children: [] };
        currentNode.children.push(newNode);
        currentNode = newNode;
      }
    });
  });
  console.log(wordCount);

  const app = d3
    .select(`#${appId}`)
    .html("")
    .append("div")
    .style("padding", "10px")
    .style("border-radius", "10px")
    .style("background", "#002868")
    .style("box-shadow", "0px 0px 2px hsla(0, 0%, 0%, 0.1)");

  const title = app
    .append("h2")
    .style("margin", "10")
    .style("padding", "8px")
    .style("font-weight", 100)
    .style("color", "white")
    .text(appTitle);

  const description = app
    .append("h3")
    .style("margin", "10")
    .style("padding", "8px")
    .style("font-weight", 100)
    .style("color", "white")
    .text(appDescrip);

  // Dynamic dimensions based on viewport size
  const containerWidth = window.innerWidth; // Full width of the viewport
  const containerHeight = window.innerHeight; // Full height of the viewport
  const WIDTH = Math.min(containerWidth, 1000); // Max width of 1000px
  const HEIGHT = Math.min(containerHeight, 1000); // Max height of 1000px

  const root = d3.hierarchy(data, (d) => d.children);

  const tree = d3.tree().size([HEIGHT - 100, WIDTH - 200]); // Adjust tree layout
  tree(root);

  const svg = app
    .append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`) // Ensure scalability
    .attr("preserveAspectRatio", "xMinYMin meet");

  const chart = svg.append("g").attr("transform", "translate(50, 50)");

  // Draw links
  chart
    .selectAll("path")
    .data(root.descendants().slice(1))
    .enter()
    .append("path")
    .attr("d", (d) => {
      return `M ${d.y} ${d.x} C ${d.parent.y + 50} ${d.x} ${d.parent.y + 150} ${
        d.parent.x
      } ${d.parent.y} ${d.parent.x}`;
    })
    .style("fill", "none")
    .attr("stroke", (d) => {
      return d.parent.data.name === "Start" ? "transparent" : "none";
    });

  // Draw nodes and labels
  chart
    .selectAll("g")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.y},${d.x})`)
    .call((g) => {
      g.append("text")
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        .attr("transform", (d) => `translate(${d.children ? -10 : 10}, 0)`)
        .attr("font-size", (d) => {
          const baseSize = highlightWords.some(
            (word) => d.data.name.toLowerCase() === word.toLowerCase()
          )
            ? 18
            : 8;

          // Scale font size based on width
          const scaledSize = Math.max(baseSize * (WIDTH / 1000), 6);
          return `${scaledSize}px`;
        })
        .attr("font-weight", (d) =>
          highlightWords.some(
            (word) => d.data.name.toLowerCase() === word.toLowerCase()
          )
            ? "bold"
            : "normal"
        )
        .style("fill", (d) =>
          highlightWords.some(
            (word) => d.data.name.toLowerCase() === word.toLowerCase()
          )
            ? "white"
            : "#BF0A30"
        )
        .style("z-index", (d) =>
          highlightWords.some(
            (word) => d.data.name.toLowerCase() === word.toLowerCase()
          )
            ? "5"
            : "1"
        )
        .style("border", "2px solid black")
        .style("border-radius", "2px")
        .style("padding", "1px")
        .html((d) => d.data.name);
    });
}

fetchDataAndRender(
  "./text/Clinton_2000.txt",
  "app1",
  ["peace", ""],
  "Clinton Jan 27, 2000",
  "Peace in amongst 7,451 words"
);
fetchDataAndRender(
  "./text/Bush_2008.txt",
  "app2",
  ["peace", ""],
  "Bush Jan 28, 2008",
  "Peace in amongst 5,752 words"
);
fetchDataAndRender(
  "./text/Obama_2016.txt",
  "app3",
  ["peace", ""],
  "Obama Jan 12, 2016",
  "Peace in amongst 5,438 words"
);
fetchDataAndRender(
  "./text/Trump_2020.txt",
  "app4",
  ["peace", ""],
  "Trump Feb 4, 2020",
  "Peace in amongst 6,220 words"
);

fetchDataAndRender(
  "./text/Clinton_2000.txt",
  "app5",
  ["climate", ""],
  "Clinton Jan 27, 2000",
  "Climate in amongst 7,451 words"
);
fetchDataAndRender(
  "./text/Bush_2008.txt",
  "app6",
  ["climate", ""],
  "Bush Jan 28, 2008",
  "Climate in amongst 5,752 words"
);
fetchDataAndRender(
  "./text/Obama_2016.txt",
  "app7",
  ["climate", ""],
  "Obama Jan 12, 2016",
  "Climate in amongst 5,438 words"
);
fetchDataAndRender(
  "./text/Trump_2020.txt",
  "app8",
  ["climate", ""],
  "Trump Feb 4, 2020",
  "Climate in amongst 6,220 words"
);
