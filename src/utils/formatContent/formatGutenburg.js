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
              return `
              <!-- wp:heading {"level":1} -->
              <h1>${value}</h1>
              <!-- /wp:heading -->`;
            case "h2":
              return `
              <!-- wp:heading {"level":2} -->
              <h2>${value}</h2>
              <!-- /wp:heading -->`;
            case "h3":
              return `
              <!-- wp:heading {"level":3} -->
              <h3>${value}</h3>
              <!-- /wp:heading -->`;
            case "h4":
              return `
              <!-- wp:heading {"level":4} -->
              <h4>${value}</h4>
              <!-- /wp:heading -->`;
            case "p":
              return `
              <!-- wp:paragraph -->
              <p>${value}</p>
              <!-- /wp:paragraph -->`;
            case "ul":
              const listItems = value
                .map((item) => {
                  return wrapInGutenbergBlocks([item]);
                })
                .join("\n");
              return `<!-- wp:list -->
                      <ul>
                      ${listItems}
                      </ul>
                      <!-- /wp:list -->`;
            case "ol":
              const orderedListItems = value
                .map((item) => {
                  if (typeof item === "object") {
                    return wrapInGutenbergBlocks([item]);
                  }
                  return `<li>${item}</li>`;
                })
                .join("\n");
              return `<!-- wp:list {"ordered":true} -->
                      <ol>
                      ${orderedListItems}
                      </ol>
                      <!-- /wp:list -->`;
            case "li":
              if (typeof value === "object") {
                return `<li>${wrapInGutenbergBlocks(value)}</li>`;
              }
              return `<li>${value}</li>`;
            case "blockquote":
              return `
              <!-- wp:quote -->
              <blockquote>${value}</blockquote>
              <!-- /wp:quote -->`;
            case "a":
              return `
              <!-- wp:paragraph -->
              <p><a href="${value.href}">${value.text}</a></p>
              <!-- /wp:paragraph -->`;
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
// function wrapInGutenbergBlocks(contentArray) {
//   return contentArray
//     .map((block) => {
//       if (block.h2) {
//         return `
//         <!-- wp:heading {"level":2} -->
//         <h2>${block.h2}</h2>
//         <!-- /wp:heading -->`;
//       } else if (block.p) {
//         return `
//         <!-- wp:paragraph -->
//         <p>${block.p}</p>
//         <!-- /wp:paragraph -->`;
//       } else if (block.h1) {
//         return `
//         <!-- wp:heading {"level":1} -->
//         <h1>${block.h1}</h1>
//         <!-- /wp:heading -->`;
//       } else if (block.h3) {
//         return `
//         <!-- wp:heading {"level":3} -->
//         <h3>${block.h3}</h3>
//         <!-- /wp:heading -->`;
//       } else if (block.h4) {
//         return `
//         <!-- wp:heading {"level":4} -->
//         <h1>${block.h4}</h1>
//         <!-- /wp:heading -->`;
//       } else if (block.ul) {
//         const listItems = block.ul
//           .map((item) => `<li>${item.li}</li>`)
//           .join("\n");
//         return `<!-- wp:list -->
//                 <ul>
//                 ${listItems}
//                 </ul>
//                 <!-- /wp:list -->`;
//       }
//     })
//     .join("\n");
// }
