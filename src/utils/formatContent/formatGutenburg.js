// LOOPS THROUGH EACH SECTION AND FORMATS FOR GUTENBURG. THEN JOINS IT TOGETHER
export const formatGutenburg = (responses) => {
  return responses.map((section) => wrapInGutenbergBlocks(section)).join("\n");
};

// TAKES A SINGLE CONTENT SECTION AND PUTS IN THE CORRECT FORMAT FOR GUTENBURG
function wrapInGutenbergBlocks(contentArray) {
  return contentArray
    .map((block) => {
      return Object.entries(block)
        .map(([key, value]) => {
          switch (key) {
            case "h1":
              if (Array.isArray(value)) {
                return `
                  <!-- wp:heading {"level":1} -->
                  <h1>${wrapInGutenbergBlocks(value)}</h1>
                  <!-- /wp:heading -->`;
              }
              return `
                  <!-- wp:heading {"level":1} -->
                  <h1>${value}</h1>
                  <!-- /wp:heading -->`;
            case "h2":
              if (Array.isArray(value)) {
                return `
                  <!-- wp:heading {"level":2} -->
                  <h2>${wrapInGutenbergBlocks(value)}</h2>
                  <!-- /wp:heading -->`;
              }
              return `
              <!-- wp:heading {"level":2} -->
              <h2>${value}</h2>
              <!-- /wp:heading -->`;
            case "h3":
              if (Array.isArray(value)) {
                return `
                  <!-- wp:heading {"level":3} -->
                  <h3>${wrapInGutenbergBlocks(value)}</h3>
                  <!-- /wp:heading -->`;
              }
              return `
              <!-- wp:heading {"level":3} -->
              <h3>${value}</h3>
              <!-- /wp:heading -->`;
            case "h4":
              if (Array.isArray(value)) {
                return `
                  <!-- wp:heading {"level":4} -->
                  <h4>${wrapInGutenbergBlocks(value)}</h4>
                  <!-- /wp:heading -->`;
              }
              return `
              <!-- wp:heading {"level":4} -->
              <h4>${value}</h4>
              <!-- /wp:heading -->`;
            case "p":
              if (Array.isArray(value)) {
                return `
                  <!-- wp:paragraph -->
                  <p>${wrapInGutenbergBlocks(value)}</p>
                  <!-- /wp:paragraph -->`;
              }
              return `
              <!-- wp:paragraph -->
              <p>${value}</p>
              <!-- /wp:paragraph -->`;
            case "ul":
              if (Array.isArray(value)) {
                return `
                  <!-- wp:list -->
                  <ul>${wrapInGutenbergBlocks(value)}</ul>
                  <!-- /wp:list -->`;
              }
              break;
            case "ol":
              if (Array.isArray(value)) {
                return `
                  <!-- wp:list -->
                  <ol>${wrapInGutenbergBlocks(value)}</ol>
                  <!-- /wp:list -->`;
              }

            case "li":
              console.log("li value", value);
              if (Array.isArray(value)) {
                return `
                  <!-- wp:list-item -->
                  <li>${wrapInGutenbergBlocks(value)}</li>
                  <!-- /wp:list-item -->
                  `;
              }
              return `<li>${value}</li>`;
            case "blockquote":
              return `
              <!-- wp:quote -->
              <blockquote>${value}</blockquote>
              <!-- /wp:quote -->`;
            case "a":
              console.log("anchor tag", value);
              if (typeof value === "object" && value.href && value.text) {
                return `
                  <!-- wp:paragraph -->
                  <p><a href="${value.href}">${value.text}</a></p>
                  <!-- /wp:paragraph -->`;
              }
              break;
            case "div":
              return `
              <!-- wp:group -->
              <div>${wrapInGutenbergBlocks(value)}</div>
              <!-- /wp:group -->`;
            case "section":
              return `
              <!-- wp:group -->
              <section>${wrapInGutenbergBlocks(value)}</section>
              <!-- /wp:group -->`;
            case "article":
              return `
              <!-- wp:group -->
              <article>${wrapInGutenbergBlocks(value)}</article>
              <!-- /wp:group -->`;
            default:
              if (Array.isArray(value)) {
                return wrapInGutenbergBlocks(value);
              }
              return "";
          }
        })
        .join("\n");
    })
    .join("\n");
}
