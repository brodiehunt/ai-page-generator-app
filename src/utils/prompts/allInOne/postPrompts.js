const formatPrompt = `
  You do not have to follow the order set out above. The main priority is to produce engaging and quality content that flows logically and is relevant. Use a conversational tone that engages the reader. Write as if you are speaking directly to the reader, using 'you' and 'we' where appropriate. You are NOT to mention terms like 'keyphrases', 'hubs' or 'spokes' directly. Eg: Do not write 'This hub is about...'. These are described to you purely for your understanding. Write with sophistication and conviction on this topic. 
  The content you generate should be structured in JSON format, with each block level html element represented as its own object where the key is the html element tag (h2, h3, h4, p, div, section etc), and its value (either a string or an ARRAY of nested objects). The value of a property CANNOT be an object alone. It must be an array of objects, even if there is only one object. Inline level text html elements like a, span, strong, b, etc can be included within a string (does not need its own object). You are never to use markdown format or any other type of format. An example of an acceptable response would be:
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
  This is an example of unacceptaple content:
  { content: [
  {'h2': { 'span': 'span elements do not get their own object'}},
  {'ul': [
    {'li': 'This is how you would structure an unordered list'}, 
    {'li': { 'p': 'Objects are NOT allowed to be properties!'}},
    {'li': [{ 'p': 'This is how it SHOULD be handled!'}]},
    {'li': [
        {'h3': 'an object must always be nested in an array. Like this.'},
        {'p': { 'span': 'NOT LIKE THIS! This isn't allowed}}
      ]
    },
  ]},
  ]}
  NOTE: You are never to use a h1 element.
  Your response should be in British English.

`;

export const buildPostAnecdotePrompt = ({
  spoke,
  otherSpokesTitleAndUrl,
  hubData,
  websiteData,
}) => {
  const {
    title: blogName,
    seoMatrix: { targetAudience, customerNeedVaraint, spokeVariant: keyPhrase },
  } = spoke;
  const { hubName, hubUrl } = hubData;
  const { websiteName, websiteUrl, websiteContext, highDaBackLinks } =
    websiteData;
  return `
    You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a blog post titled "${blogName}", which is a spoke within the model mentioned before. Its hub topic is "${hubName}". The keyphrase (keyword) for this blog is "${keyPhrase}". Some context on ${websiteName} is: "${websiteContext}".
    Your objective is to write me a small business anecdote, where a ${targetAudience} has made a mistake by not understanding / or implmeneting ${keyPhrase}, and then ${websiteName} came along and fixed it. This anecdote should relate to the title of this blog which is ${blogName}. This anecdote should be thought-provoking,inspiring, and geared towards an Australian audience. It should be structured to hold the reader's attention from beginning to end, incorporating storytelling, clear messaging, and powerful calls to action. Integrate rhetorical devices and storytelling techniques to make the blog more memorable and impactful. Use metaphors, analogies, and vivid imagery to create a strong connection with the reader.
    ${formatPrompt}
  `;
};

export const buildPostIntroPrompt = ({
  spoke,
  otherSpokesTitleAndUrl,
  hubData,
  websiteData,
}) => {
  const {
    title: blogName,
    seoMatrix: { targetAudience, customerNeedVaraint, spokeVariant: keyPhrase },
  } = spoke;
  const { hubName, hubUrl } = hubData;
  const { websiteName, websiteUrl, websiteContext, highDaBackLinks } =
    websiteData;

  const randomIndex = Math.floor(Math.random() * highDaBackLinks.length);
  const embedDaLink = highDaBackLinks.length
    ? highDaBackLinks[randomIndex]
    : "";
  const prompt = `You are a skilled content writer who specialises in writing SEO optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a blog post titled ${blogName}, which is a spoke within the model mentioned before. Its hub topic is ${hubName}. The keyphrase (keyword) for this blog is ${keyPhrase} and the keyphrase for its related spoke is ${hubName}. Some context on ${websiteName} is: "${websiteContext}".
    Youre objective is to write an engaging introduction of about 200 words for this blog post (with a h2 title - make it engagine and catchy). The introduction should:
    1. Cleary introduct the topic "${blogName}" and explain it's relevance to the readers (Avoid using generic opening statements like: 'In the fast-paced world of...').
    2. Highlight the importance of the keyphrase ${keyPhrase} in the context of the blogs main discussion.
    3. Specificy the target audience "${targetAudience}" by mentioning the industry/sector that this blog will apply to and how this topic impacts them.
    4. Provide a brief overview of the main points that will be covered in the post.
    5. Explain why this topic is crucial for the targeted audience and how it can benefit them or solve their problems.
    6. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience from the start.
    7. Encourage readers to explore related content within the hub and spoke model by referencing the hub topic "${hubName}" and linking to it (${
    websiteUrl + "/" + hubUrl
  })
  ${
    embedDaLink &&
    `8. When you mention ${websiteName}, create a link to ${embedDaLink} that opens a new tab. Only do this once. The linked text must be '${websiteName}'`
  }
  ${formatPrompt}
  `;
  return prompt;
};

export const buildPostWhatIsTermPrompt = ({
  spoke,
  otherSpokesTitleAndUrl,
  hubData,
  websiteData,
}) => {
  const {
    title: blogName,
    seoMatrix: { targetAudience, customerNeedVaraint, spokeVariant: keyPhrase },
  } = spoke;
  const { hubName, hubUrl } = hubData;
  const { websiteName, websiteUrl, websiteContext } = websiteData;
  return `
  You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a blog post titled "${blogName}", which is a spoke within the model mentioned before. Its hub topic is "${hubName}". The keyphrase (keyword) for this blog is "${keyPhrase}". Some context on ${websiteName} is: "${websiteContext}".

Your objective is to write a detailed section about "What is ${keyPhrase} and why does it matter?" from the perspective of ${websiteName}. Generate a catchy and engaging title for this section based on the keyphrase and the importance of the topic. This section should:

1. Clearly define the term "${keyPhrase}" in a way that is easily understandable for readers who might be new to the topic.
2. Explain the relevance of the term in both personal and business contexts and relating to the main discussion of this blog.
3. Discuss the implications of understanding, employing, or using the topic for the reader, highlighting both personal and business benefits.
4. Provide examples or scenarios where applicable to illustrate the importance of the term.
5. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience.
6. Keep in mind that the target audience is ${targetAudience} and the need we are addressing is ${customerNeedVaraint}
7. Keep the content within a word limit of 300 words.

${formatPrompt}
  `;
};

export const buildPostHistoryTermPrompt = ({
  spoke,
  otherSpokesTitleAndUrl,
  hubData,
  websiteData,
}) => {
  const {
    title: blogName,
    seoMatrix: { targetAudience, customerNeedVaraint, spokeVariant: keyPhrase },
  } = spoke;
  const { hubName, hubUrl } = hubData;
  const { websiteName, websiteUrl, websiteContext } = websiteData;
  return `
    You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a blog post titled "${blogName}", which is a spoke within the model mentioned before. Its hub topic is "${hubName}". The keyphrase (keyword) for this blog is "${keyPhrase}". Some context on ${websiteName} is: "${websiteContext}".

    Your objective is to write a detailed section about "The History of ${keyPhrase}" in relation to "${blogName}" from the perspective of ${websiteName}. Generate a catchy and engaging title for this section based on the keyphrase and its historical importance. This section should:

    1. Elaborate on the background of the term "${keyPhrase}" in the context of "${blogName}".
    2. Describe how the concept of "${keyPhrase}" has developed from its inception to today, particularly in relation to "${blogName}".
    3. Include key milestones and significant changes in the history of the term as it pertains to the topic of "${blogName}".
    4. Provide relevant historical context to help readers understand the evolution of the concept in relation to "${blogName}".
    5. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience.
    6. Keep the content within a word limit of 300 words.

    ${formatPrompt}
  `;
};

export const buildPostTermsToKnowPrompt = ({
  spoke,
  otherSpokesTitleAndUrl,
  hubData,
  websiteData,
}) => {
  const {
    title: blogName,
    seoMatrix: { targetAudience, customerNeedVaraint, spokeVariant: keyPhrase },
  } = spoke;
  const { hubName, hubUrl } = hubData;
  const { websiteName, websiteUrl, websiteContext } = websiteData;
  return `
    You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a blog post titled "${blogName}", which is a spoke within the model mentioned before. Its hub topic is "${hubName}". The keyphrase (keyword) for this blog is "${keyPhrase}". Some context on ${websiteName} is: "${websiteContext}".
    Your objective is to write a detailed section titled "Terms to Know" for this blog post from the perspective of ${websiteName}. Generate a catchy and engaging title for this section based on the key terms and their importance. This section should:
    
    1. List and define key terms pertinent to "${keyPhrase}", ensuring definitions are clear and easily understandable for readers new to the topic.
    2. Include terms that are likely to be mentioned elsewhere in the post to provide context and clarity for readers.
    3. Explain each term's relevance in the context of "${blogName}" and how it relates to the overall blog.
    4. Incorporate internal links to other relevant sections or articles, such as the hub topic "${hubName}" (${
    websiteUrl + "/" + hubUrl
  }). Be sparse with this linking and only include if it fits well.
    5. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience.
    6. Keep the content within a word limit of 300 words.
    ${formatPrompt}
  `;
};

export const buildPostProsConsPrompt = ({
  spoke,
  otherSpokesTitleAndUrl,
  hubData,
  websiteData,
}) => {
  const {
    title: blogName,
    seoMatrix: { targetAudience, customerNeedVaraint, spokeVariant: keyPhrase },
  } = spoke;
  const { hubName, hubUrl } = hubData;
  const { websiteName, websiteUrl, websiteContext } = websiteData;
  return `
    You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a blog post titled "${blogName}", which is a spoke within the model mentioned before. Its hub topic is "${hubName}". The keyphrase (keyword) for this blog is "${keyPhrase}". Some context on ${websiteName} is: "${websiteContext}".
    Your objective is to write a detailed section about "The Pros and Cons of ${keyPhrase}" in relation to "${blogName}" from the perspective of ${websiteName}. Generate a catchy and engaging title for this section based on the keyphrase and its significance. This section should:

    1. Outline the positive aspects (pros) of "${keyPhrase}" and its application in the context of "${blogName}".
    2. Highlight the negative aspects (cons) of "${keyPhrase}" and any challenges or drawbacks associated with it.
    3. Provide a balanced view to help readers understand both the benefits and limitations of the topic.
    4. Use examples or scenarios that the audience ${targetAudience} could relate to, to illustrate the pros and cons where applicable.
    5. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience.
    6. Keep the content within a word limit of 300 words.

    ${formatPrompt}
  `;
};

export const buildPostExamplesPrompt = ({
  spoke,
  otherSpokesTitleAndUrl,
  hubData,
  websiteData,
}) => {
  const {
    title: blogName,
    seoMatrix: { targetAudience, customerNeedVaraint, spokeVariant: keyPhrase },
  } = spoke;
  const { hubName, hubUrl } = hubData;
  const { websiteName, websiteUrl, websiteContext } = websiteData;
  return `
  
  `;
};

export const buildPostHowToPrompt = ({
  spoke,
  otherSpokesTitleAndUrl,
  hubData,
  websiteData,
}) => {
  const {
    title: blogName,
    seoMatrix: { targetAudience, customerNeedVaraint, spokeVariant: keyPhrase },
  } = spoke;
  const { hubName, hubUrl } = hubData;
  const { websiteName, websiteUrl, websiteContext } = websiteData;
  return `
    You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a blog post titled "${blogName}", which is a spoke within the model mentioned before. Its hub topic is "${hubName}". The keyphrase (keyword) for this blog is "${keyPhrase}". Some context on ${websiteName} is: "${websiteContext}".
    Your objective is to write a detailed "How to implement ${keyPhrase}" section in relation to "${blogName}" from the perspective of ${websiteName}. Generate a catchy and engaging title for this section based on the task or term and its significance. This section should:

    1. Provide a clear, concise, and accurate step-by-step process for the task or concept related to "${keyPhrase}".
    2. Ensure the steps are easy to follow and free of unnecessary "fluff" that might confuse the reader.
    3. Include a detailed example to illustrate the process, showing all the work so readers can follow along effortlessly.
    4. Use examples or scenarios to make the steps more relatable and easier to understand.
    5. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience.
    6. Remember that the target audience has to do with ${targetAudience} and the need we are addressing has to do with ${customerNeedVaraint}
    7. Keep the content within a word limit of 300 words.

    ${formatPrompt}
  `;
};

export const buildPostTipsPrompt = ({
  spoke,
  otherSpokesTitleAndUrl,
  hubData,
  websiteData,
}) => {
  const {
    title: blogName,
    seoMatrix: { targetAudience, customerNeedVaraint, spokeVariant: keyPhrase },
  } = spoke;
  const { hubName, hubUrl } = hubData;
  const { websiteName, websiteUrl, websiteContext } = websiteData;
  return `
    You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a blog post titled "${blogName}", which is a spoke within the model mentioned before. Its hub topic is "${hubName}". The keyphrase (keyword) for this blog is "${keyPhrase}". Some context on ${websiteName} is: "${websiteContext}".
    Your objective is to write a detailed section titled "Tips and Reminders for ${keyPhrase}" in relation to "${blogName}" from the perspective of ${websiteName}. Generate a catchy and engaging title for this section based on the keyphrase and its significance. This section should:

    1. Break down a few best practices on how to best approach the concept of "${keyPhrase}".
    2. Provide reminders to help readers understand and apply the concept effectively.
    3. Ensure the tips and reminders are clear, concise, and actionable.
    4. Use examples or scenarios to illustrate the tips and reminders where applicable.
    5. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience.
    6. Mention related spoke articles to provide additional insights and information (ONLY IF IT IS RELEVANT TO WHAT YOU ARE TALKING ABOUT). Do not link to the page, rather just bold the text where the link will go: ${otherSpokesTitleAndUrl
      .map((spoke) => `${spoke.spokeName} (${spoke.spokeUrl})`)
      .join(", ")}.
    7. Remember that the target audience has to do with ${targetAudience} and the need we are addressing has to do with ${customerNeedVaraint}
    8. Keep the content within a word limit of 400 words.

    ${formatPrompt}
  `;
};

export const buildPostConclPrompt = ({
  spoke,
  otherSpokesTitleAndUrl,
  hubData,
  websiteData,
}) => {
  const {
    title: blogName,
    seoMatrix: { targetAudience, customerNeedVaraint, spokeVariant: keyPhrase },
  } = spoke;
  const { hubName, hubUrl } = hubData;
  const { websiteName, websiteUrl, websiteContext, highDaBackLinks } =
    websiteData;
  const randomIndex = Math.floor(Math.random() * highDaBackLinks.length);
  const embedDaLink = highDaBackLinks.length
    ? highDaBackLinks[randomIndex]
    : "";
  return `
    You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a blog post titled "${blogName}", which is a spoke within the model mentioned before. Its hub topic is "${hubName}". The keyphrase (keyword) for this blog is "${keyPhrase}". Some context on ${websiteName} is: "${websiteContext}".
    Your objective is to write a compelling closing section for this blog post from the perspective of ${websiteName}. Generate a catchy and engaging closing paragraph (with a h2 title) based on the key points and significance of the blog post. This section should:

    1. Summarize the key takeaways from the blog post, emphasizing the importance of "${keyPhrase}" in the context of "${blogName}".
    2. Remind readers of the main points discussed and the value they provide.
    3. Encourage readers to learn more about ${hubName} by pointing them to the webpage ${
    websiteUrl + "/" + hubUrl
  }.
  4. Encourage readers to explore related content within the hub and spoke model by referencing potentially related spoke articles. Do not link to the page, rather just bold the text where the link will go: ${otherSpokesTitleAndUrl
    .map((spoke) => `${spoke.spokeName} (${spoke.spokeUrl})`)
    .join(", ")}. NOTE: ONLY IF THEY ARE RELATED!
    5. Use a tone and style that reflects the brand voice of "${websiteName}" and leaves a lasting impression on the audience.
    6. Keep the content within a word limit of 200 words.
    ${
      embedDaLink &&
      `7. When you mention ${websiteName}, create a link to ${embedDaLink} that opens a new tab. Only do this once. The linked text must be '${websiteName}'`
    }
    ${formatPrompt}
  `;
};
