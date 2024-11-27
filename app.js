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
  speechDetails,
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
    .append("h1")
    .style("margin", "4px")
    .style("padding", "8px")
    .style("font-weight", 100)
    .style("color", "white")
    .text(appTitle);

  const blurb = app

    .append("h3")
    .style("margin", "4px")
    .style("padding", "8px")
    .style("font-weight", 100)
    .style("color", "white")
    .style("width", "450px")
    .style("display", "inline-block")
    .style("border", "1px solid white")
    // .style("background-color", "#BF0A30")
    .text(appDescrip);

  const description = app
    .append("h2")
    .style("margin", "10")
    .style("padding", "8px")
    .style("font-weight", 100)
    .style("color", "white")
    .text(speechDetails);

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
  "./text/Biden_2023.txt",
  "app1",
  ["peace", ""],
  "Biden Feb 7, 2023",
  "Peace in amongst 7,223 words",
  "The 2023 State of the Union Address was given by the 46th president of the United States, Joe Biden, on February 7, 2023, at 9:00 p.m. EST, in the chamber of the House of Representatives to the 118th Congress."
);
fetchDataAndRender(
  "./text/Trump_2020.txt",
  "app2",
  ["peace", ""],
  "Trump Feb 4, 2020",
  "Peace in amongst 6,220 words",
  "The 2020 State of the Union Address was given by the 45th president of the United States, Donald Trump, on February 4, 2020, at 9:00 p.m. EST, in the chamber of the United States House of Representatives to the 116th United States Congress."
);

fetchDataAndRender(
  "./text/Obama_2016.txt",
  "app3",
  ["peace", ""],
  "Obama Jan 12, 2016",
  "Peace in amongst 5,438 words",
  "The 2016 State of the Union Address was given by the 44th president of the United States, Barack Obama, on January 12, 2016, at 9:00 p.m. EST, in the chamber of the United States House of Representatives to the 114th United States Congress."
);
fetchDataAndRender(
  "./text/Bush_2008.txt",
  "app4",
  ["peace", ""],
  "Bush Jan 28, 2008",
  "Peace in amongst 5,752 words",
  "The 2008 State of the Union Address was given by the 43rd president of the United States, George W. Bush, on January 28, 2008, at 9:00 p.m. EST, in the chamber of the United States House of Representatives to the 110th United States Congress."
);
fetchDataAndRender(
  "./text/Clinton_2000.txt",
  "app5",
  ["peace", ""],
  "Clinton Jan 27, 2000",
  "Peace in amongst 7,451 words",
  "The 2000 State of the Union Address was given by the 42nd president of the United States, Bill Clinton, on January 27, 2000, at 9:00 p.m. EST, in the chamber of the United States House of Representatives to the 106th United States Congress."
);
fetchDataAndRender(
  "./text/Biden_2023.txt",
  "app6",
  ["climate", ""],
  "Biden Feb 7, 2023",
  "Climate in amongst 7,223 words",
  "The 2023 State of the Union Address was given by the 46th president of the United States, Joe Biden, on February 7, 2023, at 9:00 p.m. EST, in the chamber of the House of Representatives to the 118th Congress."
);
fetchDataAndRender(
  "./text/Trump_2020.txt",
  "app7",
  ["climate", ""],
  "Trump Feb 4, 2020",
  "Climate in amongst 6,220 words",
  "The 2020 State of the Union Address was given by the 45th president of the United States, Donald Trump, on February 4, 2020, at 9:00 p.m. EST, in the chamber of the United States House of Representatives to the 116th United States Congress. "
);
fetchDataAndRender(
  "./text/Obama_2016.txt",
  "app8",
  ["climate", ""],
  "Obama Jan 12, 2016",
  "Climate in amongst 5,438 words",
  "The 2016 State of the Union Address was given by the 44th president of the United States, Barack Obama, on January 12, 2016, at 9:00 p.m. EST, in the chamber of the United States House of Representatives to the 114th United States Congress."
);
fetchDataAndRender(
  "./text/Bush_2008.txt",
  "app9",
  ["climate", ""],
  "Bush Jan 28, 2008",
  "Climate in amongst 5,752 words",
  "The 2008 State of the Union Address was given by the 43rd president of the United States, George W. Bush, on January 28, 2008, at 9:00 p.m. EST, in the chamber of the United States House of Representatives to the 110th United States Congress."
);
fetchDataAndRender(
  "./text/Clinton_2000.txt",
  "app10",
  ["climate", ""],
  "Clinton Jan 27, 2000",
  "Climate in amongst 7,451 words",
  "The 2000 State of the Union Address was given by the 42nd president of the United States, Bill Clinton, on January 27, 2000, at 9:00 p.m. EST, in the chamber of the United States House of Representatives to the 106th United States Congress."
);
