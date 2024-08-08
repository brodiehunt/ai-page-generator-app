const formatAndTonePrompt = `
  You do not have to follow the order set out above. The main priority is to produce engaging and quality content that flows logically and is relevant. Use a conversational tone that engages the reader. Write as if you are speaking directly to the reader, using 'you' and 'we' where appropriate. You are NOT to mention terms like 'keyphrases', 'hubs' or 'spokes' directly. Eg: Do not write 'This hub is about...'. These are described to you purely for your understanding. Write with sophistication and conviction on this topic.
  The content you generate should be structured in JSON format, with each block level html element represented as its own object where the key is the html element tag (h2, h3, h4, p, div, section etc), and its value (either a string or an array of nested objects). Inline level text html elements like a, span, strong, b, etc can be included within a string (does not need its own object). You are never to use markdown format or any other type of format. An example of an acceptable response would be:
  { content: [
  {'h2': 'This would be a h2'},
  {'p': 'This would be a <a href="/parahgraph">paragraph</a>'},
  {'p': 'This would be a <strong>STRONG</strong> inclusion'},
  {'ul': [
    {'li': 'This is how you would structure an unordered list'}, 
    {'li': 'Another list with <b>bold</b> text element'},
    {'li': [
        {'h3': 'nested content works like this'},
        {'p': 'Nested paragraph'}
      ]
    },
  ]},
  ]}
  NOTE: You are never to use a h1 element.
  Your response should be in British English.
`;

export const buildSeoGenerationPrompt = ({
  websiteName,
  websiteContext,
  hubName,
}) => {
  return `
    Your job is to generate the seo Description and excerpt for a wordpress page for the company ${websiteName}. Some context about the company is: ${websiteContext}. 
    The Title and topic of the page is '${hubName}'.
    Your response should be a JSON object in the format like this:
    { content: {
        seoDescription: 'A post description with a maximum of 150 characters and a mininimum of 120 characters. It should contain the words ${hubName}',
        excerpt: 'A short introduction to the blog post, maximum 50 words.'
      }
    }
  `;
};

export const buildIntroductionPrompt = ({
  websiteName,
  websiteUrl,
  websiteContext,
  generateSeoMeta,
  hubName,
  hubUrl,
  highDaBackLinks,
  relatedSpokes,
}) => {
  const randomIndex = Math.floor(Math.random() * highDaBackLinks.length);
  const embedDaLink = highDaBackLinks.length
    ? highDaBackLinks[randomIndex]
    : "";

  const prompt = `You are a skilled content writer who specialises in writing SEO optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing content for a page titled ${hubName}, which is a hub within the model mentioned before. Some context on ${websiteName} is: "${websiteContext}".
    Youre objective is to write an engaging introduction of about 200 words for this hub page. The introduction should:
    1. Cleary introduct the topic "${hubName}" and explain it's relevance to the readers.
    2. Highlight the importance of the keyphrase ${hubName} in the context of the blogs main discussion.
    4. Provide a brief overview of the main points that will be covered in the post.
    5. Explain why this topic is crucial for the targeted audience and how it can benefit them or solve their problems.
    6. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience from the start.
    ${
      embedDaLink &&
      `7. When you mention ${websiteName}, create a link to ${embedDaLink} that opens a new tab. Only do this once. The linked text must be '${websiteName}'`
    }
    ${formatAndTonePrompt}
  `;
  return prompt;
};

export const buildKeyConceptsPrompt = ({
  websiteName,
  websiteUrl,
  websiteContext,
  generateSeoMeta,
  hubName,
  hubUrl,
  highDaBackLinks,
  relatedSpokes,
}) => {
  const spokesToInclude = relatedSpokes.slice(0, 2);
  const spokesPrompt = !spokesToInclude.length
    ? ""
    : `You need to write the content for this section so that you can integrate nested h3 topics for the following spoke pages, if a url is provided, link to the page, if not bold the text where the hyperlink would otherwise go: ${spokesToInclude
        .map((spoke, index) => {
          return `You need to create a h3 for the spoke page: ${
            spoke.spokeTitle
          }. This spokes keyphrase is ${spoke.spokeKeyPhrase}. ${
            spoke.spokeIsLive
              ? `Include a link to the spoke ${spoke.spokeUrl}.`
              : ""
          }`;
        })
        .join(", ")}`;
  return `
You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a hub page titled "${hubName}". The hub page URL is "${hubUrl}". Some context on ${websiteName} is: "${websiteContext}".

Your objective is to write a detailed section about the "Key Concepts of ${hubName}" from the perspective of ${websiteName}. Generate a catchy and engaging title for this section based on the hub name and its significance. This section should:

1. Outline and explain the key concepts related to "${hubName}".
2. Ensure the explanations are clear, concise, and easily understandable for readers who might be new to the topic.
3. Highlight the importance and relevance of each key concept in the context of "${hubName}".
4. Provide examples or scenarios where applicable to illustrate each concept.
5. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience.
6. Keep the content within a word limit of 600 words.
7. Add a personal touch by starting this section with a brief anecdote or observation that relates to the topic and connects with the reader.
${spokesPrompt}
${formatAndTonePrompt}
`;
};

export const buildBenefitsPrompt = ({
  websiteName,
  websiteUrl,
  websiteContext,
  generateSeoMeta,
  hubName,
  hubUrl,
  highDaBackLinks,
  relatedSpokes,
}) => {
  const spokesToInclude = relatedSpokes.slice(2, 4);
  const spokesPrompt = !spokesToInclude.length
    ? ""
    : `You need to write the content for this section so that you can integrate nested h3 topics for the following spoke pages, if a url is provided, link to the page, if not bold the text where the hyperlink would otherwise go: ${spokesToInclude
        .map((spoke, index) => {
          return `You need to create a h3 for the spoke page: ${
            spoke.spokeTitle
          }. This spokes keyphrase is ${spoke.spokeKeyPhrase}. ${
            spoke.spokeIsLive
              ? `Include a link to the spoke ${spoke.spokeUrl}.`
              : ""
          }`;
        })
        .join(", ")}`;
  return `You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a hub page titled "${hubName}". The hub page URL is "${hubUrl}". Some context on ${websiteName} is: "${websiteContext}".

Your objective is to write a detailed section about the "Benefits of ${hubName}" from the perspective of ${websiteName}. Generate a catchy and engaging title for this section based on the hub name and its significance. This section should:

1. Highlight and explain the benefits of understanding and applying the concepts of "${hubName}".
2. Ensure the explanations are clear, concise, and easily understandable for readers.
3. Discuss both personal and business benefits, providing a comprehensive view of the advantages.
4. Provide examples or scenarios where applicable to illustrate the benefits.
5. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience.
6. Keep the content within a word limit of 600 words.
${spokesPrompt}
${formatAndTonePrompt}
`;
};

export const buildBestPracticesPrompt = ({
  websiteName,
  websiteUrl,
  websiteContext,
  generateSeoMeta,
  hubName,
  hubUrl,
  highDaBackLinks,
  relatedSpokes,
}) => {
  const spokesToInclude = relatedSpokes.slice(2, 4);
  const spokesPrompt = !spokesToInclude.length
    ? ""
    : `You need to write the content for this section so that you can integrate nested h3 topics for the following spoke pages, if a url is provided, link to the page, if not bold the text where the hyperlink would otherwise go: ${spokesToInclude
        .map((spoke, index) => {
          return `You need to create a h3 for the spoke page: ${
            spoke.spokeTitle
          }. This spokes keyphrase is ${spoke.spokeKeyPhrase}. ${
            spoke.spokeIsLive
              ? `Include a link to the spoke ${spoke.spokeUrl}.`
              : ""
          }`;
        })
        .join(", ")}`;

  return `You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a hub page titled "${hubName}". The hub page URL is "${hubUrl}". Some context on ${websiteName} is: "${websiteContext}".

Your objective is to write a detailed section about the "Best Practices of ${hubName}" from the perspective of ${websiteName}. Generate a catchy and engaging title for this section based on the hub name and its significance. This section should:

1. Outline and explain the best practices for understanding and applying the concepts of "${hubName}".
2. Ensure the explanations are clear, concise, and easily understandable for readers.
3. Highlight the importance and relevance of each best practice in the context of "${hubName}".
4. Provide examples or scenarios where applicable to illustrate each best practice.
5. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience.
6. Keep the content within a word limit of 600 words.
7. Add a personal touch by starting this section with a brief anecdote or observation that relates to the topic and connects with the reader.
${spokesPrompt}
${formatAndTonePrompt}`;
};

export const buildFutureTrendsPrompt = ({
  websiteName,
  websiteUrl,
  websiteContext,
  generateSeoMeta,
  hubName,
  hubUrl,
  highDaBackLinks,
  relatedSpokes,
}) => {
  return `You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a hub page titled "${hubName}". The hub page URL is "${hubUrl}". Some context on ${websiteName} is: "${websiteContext}".

Your objective is to write a detailed section about the "Future Trends of ${hubName}" from the perspective of ${websiteName}. Generate a catchy and engaging title for this section based on the hub name and its significance. This section should:

1. Outline and explain the future trends related to "${hubName}".
2. Ensure the explanations are clear, concise, and easily understandable for readers.
3. Highlight the potential impact and importance of these future trends in the context of "${hubName}".
4. Provide examples or scenarios where applicable to illustrate the future trends.
5. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience.
6. Keep the content within a word limit of 600 words.


${formatAndTonePrompt}`;
};

export const buildExamplesPrompt = ({
  websiteName,
  websiteUrl,
  websiteContext,
  generateSeoMeta,
  hubName,
  hubUrl,
  highDaBackLinks,
  relatedSpokes,
}) => {
  return `You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a hub page titled "${hubName}". The hub page URL is "${hubUrl}". Some context on ${websiteName} is: "${websiteContext}".

Your objective is to write a detailed section about the "Examples of ${hubName}" from the perspective of ${websiteName}. Generate a catchy and engaging title for this section based on the hub name and its significance. This section should:

1. Provide detailed examples of "${hubName}" in action.
2. Ensure the examples are clear, concise, and easily understandable for readers.
3. Highlight the importance and relevance of each example in the context of "${hubName}".
4. Use scenarios, case studies, or real-world applications to illustrate each example.
5. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience.
6. Keep the content within a word limit of 400 words.
7. Add a personal touch by starting this section with a brief anecdote or observation that relates to the topic and connects with the reader.

${formatAndTonePrompt}
`;
};

export const buildConclusionPrompt = ({
  websiteName,
  websiteUrl,
  websiteContext,
  generateSeoMeta,
  hubName,
  hubUrl,
  highDaBackLinks,
  relatedSpokes,
}) => {
  const randomIndex = Math.floor(Math.random() * highDaBackLinks.length);
  const embedDaLink = highDaBackLinks.length
    ? highDaBackLinks[randomIndex]
    : "";
  return `You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a hub page titled "${hubName}". The hub page URL is "${hubUrl}". Some context on ${websiteName} is: "${websiteContext}".

Your objective is to write a compelling conclusion for this hub page from the perspective of ${websiteName}. Generate a catchy and engaging closing paragraph based on the key points and significance of the hub page. This section should:

1. Summarize the key takeaways from the hub page, emphasizing the importance of "${hubName}".
2. Remind readers of the main points discussed and the value they provide.
3. Encourage readers to explore related spokes and other content available on the ${websiteName} website.
4. Provide a call to action, inviting readers to take the next step (e.g., contact, subscribe, read more).
5. Use a tone and style that reflects the brand voice of "${websiteName}" and leaves a lasting impression on the audience.
6. Keep the content within a word limit of 200 words.

${
  embedDaLink &&
  `7. When you mention ${websiteName}, create a link to ${embedDaLink} that opens a new tab. Only do this once. The linked text must be '${websiteName}'`
}
The content you generate should be structured in JSON format, with each object representing a block of HTML content. The content tags (h2, h3, p, a, b, strong, etc.) should be used appropriately. An example would be:
{ content: [
{'h2': 'A Catchy Title for the Conclusion Section'},
{'p': 'This would be a paragraph summarizing the key takeaways.'},
{'p': 'This would be another paragraph encouraging readers to explore related content.'},
{'p': 'This would be a call to action inviting readers to take the next step.'},
]}
Your response should be in British English.`;
};
