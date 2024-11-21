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

  sentences.forEach((sentence) => {
    const words = sentence.split(" ");
    let currentNode = data;

    words.forEach((input) => {
      const word = input.replace(/[^a-zA-Z ]/g, "");

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

  const app = d3
    .select(`#${appId}`)
    .html("")
    .append("div")
    // .style("margin", "0 auto")
    .style("padding", "10px")
    .style("border-radius", "10px")
    // .style("width", "fit-content")
    .style("background", "#002868")
    .style("box-shadow", "0px 0px 2px hsla(0, 0%, 0%, 0.1)");

  const title = app
    .append("h2")
    .style("margin", "10")
    .style("padding", "8px")
    // .style("font-size", "2.1rem")
    .style("font-weight", 100)
    .style("color", "white")
    .text(appTitle);

  const Descrip = app
    .append("h3")
    .style("margin", "10")
    .style("padding", "8px")
    // .style("font-size", "2.1rem")
    .style("font-weight", 100)
    .style("color", "white")
    .text(appDescrip);

  const WIDTH = 600,
    HEIGHT = 500;

  const root = d3.hierarchy(data, function (d) {
    return d.children;
  });

  const tree = d3.tree().size([WIDTH, HEIGHT]);

  tree(root);

  const svg = app.append("svg").attr("width", WIDTH).attr("height", HEIGHT);
  // .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);

  const chart = svg.append("g").attr("transform", "translate(200 5)");

  chart
    .selectAll("path")
    .data(root.descendants().slice(1))
    .enter()
    .append("path")
    .attr("d", function (d) {
      return `M ${
        d.y
      } ${d.x} C ${d.parent.y + 50} ${d.x} ${d.parent.y + 150} ${d.parent.x} ${d.parent.y} ${d.parent.x}`;
    })
    .style("fill", "none")
    .attr("stroke", (d) => {
      if (d.parent.data.name === "Start") {
        return "transparent";
      } else {
        return "none";
      }
    });

  chart
    .selectAll("g")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", function (d) {
      return "translate(" + d.y + "," + d.x + ")";
    })
    .call((g) => {
      g.append("text")
        .attr("text-anchor", (d) => {
          return d.children ? "end" : "start";
        })
        .attr("transform", (d) => {
          const x = d.children ? -20 : 20;
          return `translate(${x} 0)`;
        })
        .attr("font-size", (d) => {
          return highlightWords.some(
            (word) => d.data.name.toLowerCase() === word.toLowerCase()
          )
            ? "18px"
            : "12px";
        })
        .attr("font-weight", (d) => {
          return highlightWords.some(
            (word) => d.data.name.toLowerCase() === word.toLowerCase()
          )
            ? "bold"
            : "normal";
        })
        .style("fill", (d) => {
          return highlightWords.some(
            (word) => d.data.name.toLowerCase() === word.toLowerCase()
          )
            ? "white"
            : "#BF0A30";
        })
        .style("border", "2px solid black")
        .style("border-radius", "2px")
        .style("padding", "2px")
        .html((d) => d.data.name);
    });
}
fetchDataAndRender(
  "./text/Clinton_2000.txt",
  "app1",
  ["peace", ""],
  "Clinton Jan 27, 2000",
  "Peace 6 times from a total of 7,451 words"
);
fetchDataAndRender(
  "./text/Bush_2008.txt",
  "app2",
  ["peace", ""],
  "Bush Jan 28, 2008",
  "Peace 5 times from a total of 5,752 words"
);
fetchDataAndRender(
  "./text/Obama_2016.txt",
  "app3",
  ["peace", ""],
  "Obama Jan 12, 2016",
  "Peace 1 times from a total of 5,438 words"
);
fetchDataAndRender(
  "./text/Trump_2020.txt",
  "app4",
  ["peace", ""],
  "Trump Feb 4, 2020",
  "Peace 1 times from a total of 6,391 words"
);

fetchDataAndRender(
  "./text/Clinton_2000.txt",
  "app5",
  ["climate", ""],
  "Clinton Jan 27, 2000",
  "Climate 1 time from a total of 7,451 words"
);
fetchDataAndRender(
  "./text/Bush_2008.txt",
  "app6",
  ["climate", ""],
  "Bush Jan 28, 2008",
  "Climate 1 time from a total of 5,752 words"
);
fetchDataAndRender(
  "./text/Obama_2016.txt",
  "app7",
  ["climate", ""],
  "Obama Jan 12, 2016",
  "Climate 3 time from a total of 5,438 words"
);
fetchDataAndRender(
  "./text/Trump_2020.txt",
  "app8",
  ["climate", ""],
  "Trump Feb 4, 2020",
  "Climate 0 time from a total of 6,391 words"
);
