export const formatDivi = (contentArray) => {
  function wrapInDiviBlocks(contentArray) {
    return contentArray
      .map((block) => {
        return Object.entries(block)
          .map(([key, value]) => {
            switch (key) {
              case "h1":
                if (Array.isArray(value)) {
                  return `
                    <h1>${wrapInDiviBlocks(value)}</h1>
                   `;
                }
                return `
                    <h1>${value}</h1>
                   `;
              case "h2":
                if (Array.isArray(value)) {
                  return `
                    <h2>${wrapInDiviBlocks(value)}</h2>
                    `;
                }
                return `
                <h2>${value}</h2>
                `;
              case "h3":
                if (Array.isArray(value)) {
                  return `
                    <h3>${wrapInDiviBlocks(value)}</h3>
                    `;
                }
                return `
                <h3>${value}</h3>
                `;
              case "h4":
                if (Array.isArray(value)) {
                  return `
                    <h4>${wrapInDiviBlocks(value)}</h4>
                    `;
                }
                return `
                <h4>${value}</h4>
                `;
              case "h5":
                if (Array.isArray(value)) {
                  return `
                    <h5>${wrapInDiviBlocks(value)}</h5>
                    `;
                }
                return `
                <h5>${value}</h5>
                `;
              case "h6":
                if (Array.isArray(value)) {
                  return `
                    <h6>${wrapInDiviBlocks(value)}</h6>
                    `;
                }
                return `
                <h6>${value}</h6>
                `;
              case "p":
                if (Array.isArray(value)) {
                  return `
                    <p>${wrapInDiviBlocks(value)}</p>
                    `;
                }
                return `
                <p>${value}</p>
                `;
              case "ul":
                if (Array.isArray(value)) {
                  return `
                    <ul>${wrapInDiviBlocks(value)}</ul>
                    `;
                }
                break;
              case "ol":
                if (Array.isArray(value)) {
                  return `
                    <ol>${wrapInDiviBlocks(value)}</ol>
                    `;
                }
              case "li":
                console.log("Li value", value);
                if (Array.isArray(value)) {
                  return `
                    <li>${wrapInDiviBlocks(value)}</li>`;
                }
                return `<li>${value}</li>`;
              case "blockquote":
                return `
                <blockquote>${value}</blockquote>
                `;
              case "a":
                if (typeof value === "object" && value.href && value.text) {
                  return `
                    <p><a href="${value.href}">${value.text}</a></p>
                    `;
                }
                break;
              case "div":
                return `
                <div>${wrapInDiviBlocks(value)}</div>
                `;
              case "section":
                return `
                <section>${wrapInDiviBlocks(value)}</section>
                `;
              case "article":
                return `
                <article>${wrapInDiviBlocks(value)}</article>
                `;
              default:
                if (Array.isArray(value)) {
                  return wrapInDiviBlocks(value);
                }
                return "";
            }
          })
          .join("\n");
      })
      .join("\n");
  }

  return contentArray
    .map(
      (section) => `
      [et_pb_section fb_built="1" theme_builder_area="post_content" _builder_version="4.27.0" _module_preset="default"]
      [et_pb_row _builder_version="4.27.0" _module_preset="default" theme_builder_area="post_content"]
      [et_pb_column _builder_version="4.27.0" _module_preset="default" type="4_4" theme_builder_area="post_content"]
      [et_pb_text _builder_version="4.27.0" _module_preset="default" theme_builder_area="post_content"]
      ${wrapInDiviBlocks(section)}
      [/et_pb_text]
      [/et_pb_column]
      [/et_pb_row]
      [/et_pb_section]
    `
    )
    .join("\n");
};
