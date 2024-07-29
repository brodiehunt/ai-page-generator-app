export const formatDivi = (contentArray) => {
  function processBlock(block) {
    return Object.entries(block)
      .map(([key, value]) => {
        switch (key) {
          case "h1":
            return `<h1>${value}</h1>`;
          case "h2":
            return `<h2>${value}</h2>`;
          case "h3":
            return `<h3>${value}</h3>`;
          case "h4":
            return `<h4>${value}</h4>`;
          case "p":
            return `<p>${value}</p>`;
          case "ul":
            const listItems = value
              .map((item) => `${processBlock(item)}`)
              .join("\n");
            return `<ul>${listItems}</ul>`;
          case "ol":
            const orderedListItems = value
              .map((item) => `${processBlock(item)}`)
              .join("\n");
            return `<ol>${orderedListItems}</ol>`;
          case "li":
            return Array.isArray(value)
              ? `<li>${value
                  .map((subItem) => processBlock(subItem))
                  .join("")}</li>`
              : `<li>${value}</li>`;
          case "blockquote":
            return `<blockquote>${value}</blockquote>`;
          case "a":
            return `<a href="${value.href}">${value.text}</a>`;
          default:
            if (Array.isArray(value)) {
              return value.map((subItem) => processBlock(subItem)).join("\n");
            }
            return value;
        }
      })
      .join("\n");
  }

  return contentArray
    .map((subArray) => {
      const sectionContent = subArray
        .map((block) => processBlock(block))
        .join("\n");

      return `
        [et_pb_section fb_built="1" theme_builder_area="post_content" _builder_version="4.27.0" _module_preset="default"]
        [et_pb_row _builder_version="4.27.0" _module_preset="default" theme_builder_area="post_content"]
        [et_pb_column _builder_version="4.27.0" _module_preset="default" type="4_4" theme_builder_area="post_content"]
        [et_pb_text _builder_version="4.27.0" _module_preset="default" theme_builder_area="post_content"]
        ${sectionContent}
        [/et_pb_text]
        [/et_pb_column]
        [/et_pb_row]
        [/et_pb_section]
      `;
    })
    .join("\n");
};
