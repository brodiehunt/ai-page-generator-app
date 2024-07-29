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
  const { websiteName, websiteUrl, websiteContext } = websiteData;
  const prompt = `You are a skilled content writer who specialises in writing SEO optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a blog post titled ${blogName}, which is a spoke within the model mentioned before. Its hub topic is ${hubName}. The keyphrase (keyword) for this blog is ${keyPhrase} and the keyphrase for its related spoke is ${hubName}. Some context on ${websiteName} is: "${websiteContext}".
    Youre objective is to write an engaging introduction of about 200 words for this blog post. The introduction should:
    1. Cleary introduct the topic "${blogName}" and explain it's relevance to the readers.
    2. Highlight the importance of the keyphrase ${keyPhrase} in the context of the blogs main discussion.
    3. Specificy the target audience "${targetAudience}" by mentioning the industry/sector that this blog will apply to and how this topic impacts them.
    4. Provide a brief overview of the main points that will be covered in the post.
    5. Explain why this topic is crucial for the targeted audience and how it can benefit them or solve their problems.
    6. Use a tone and style that reflects the brand voice of "${websiteName}" and engages the audience from the start.
    7. Encourage readers to explore related content within the hub and spoke model by referencing the hub topic "${hubName}" and linking to it (${
    websiteUrl + "/" + hubUrl
  })
      NOTE: This section does not require a title.
      The content you generate should be structured in JSON format, with each object representing a block of html content. The content tags (h2, h3, p, a, b, strong etc) should be used appropriately, and the value should be the content. An example would be:
    { content: [
    {'h2': 'This would be a h2'},
    {'p': 'This would be a paragraph'},
    {'p': 'This would be a <strong>STRONG</strong> inclusion'},
    {'ul': [{'li': 'This is how you would structure an unordered list'}, {'li': 'Another list item'}]},
    ]}
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

The content you generate should be structured in JSON format, with each object representing a block of HTML content. The content tags (h2, h3, p, a, b, strong, etc.) should be used appropriately. An example would be:
{ content: [
{'h2': 'A Catchy Title for "What is ${keyPhrase} and why does it matter?"'},
{'p': 'This would be a paragraph explaining the term.'},
{'p': 'This would be another paragraph discussing its importance.'},
{'ul': [{'li': 'This is how you would structure an unordered list'}, {'li': 'Another list item'}]},
]}
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

    The content you generate should be structured in JSON format, with each object representing a block of HTML content. The content tags (h2, h3, p, a, b, strong, etc.) should be used appropriately. An example would be:
    { content: [
    {'h2': 'A Catchy Title for "The History of ${keyPhrase}" in Relation to "${blogName}"'},
    {'p': 'This would be a paragraph elaborating on the background.'},
    {'p': 'This would be another paragraph discussing the development over time.'},
    {'ul': [{'li': 'This is how you would structure an unordered list'}, {'li': 'Another list item'}]},
    ]}
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
    The content you generate should be structured in JSON format, with each object representing a block of HTML content. The content tags (h2, h3, p, a, b, strong, etc.) should be used appropriately. An example would be:
    { content: [
    {'h2': 'A Catchy Title for "Terms to Know"'},
    {'p': 'This would be a paragraph introducing the section.'},
    {'ul': [{'li': 'Term 1: Definition and relevance.'}, {'li': 'Term 2: Definition and relevance.'}, {'li': 'Term 3: Definition and relevance.'}]},
    ]}
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

    The content you generate should be structured in JSON format, with each object representing a block of HTML content. The content tags (h2, h3, p, a, b, strong, etc.) should be used appropriately. An example would be:
    { content: [
    {'h2': 'A Catchy Title for "The Pros and Cons of ${keyPhrase}"'},
    {'p': 'This would be a paragraph introducing the section.'},
    {'ul': [{'li': 'Pro 1: Explanation and relevance.'}, {'li': 'Pro 2: Explanation and relevance.'}]},
    {'ul': [{'li': 'Con 1: Explanation and relevance.'}, {'li': 'Con 2: Explanation and relevance.'}]},
    ]}
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

    The content you generate should be structured in JSON format, with each object representing a block of HTML content. The content tags (h2, h3, p, a, b, strong, etc.) should be used appropriately. An example would be:
    { content: [
    {'h2': 'A Catchy Title for "How to ${keyPhrase}"'},
    {'p': 'This would be a paragraph introducing the section.'},
    {'ol': [
        {'li': 'Step 1: Explanation of the first step.'},
        {'li': 'Step 2: Explanation of the second step.'},
        {'li': 'Step 3: Explanation of the third step.'},
    ]},
    {'p': 'This would be a paragraph providing an example to illustrate the process.'},
    ]}
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
    6. Mention related spoke articles to provide additional insights and information (ONLY IF IT IS RELEVANT TO WHAT YOU ARE TALKING ABOUT): ${otherSpokesTitleAndUrl
      .map((spoke) => `${spoke.spokeName} (${spoke.spokeUrl})`)
      .join(", ")}.
    7. Remember that the target audience has to do with ${targetAudience} and the need we are addressing has to do with ${customerNeedVaraint}
    8. Keep the content within a word limit of 400 words.

    The content you generate should be structured in JSON format, with each object representing a block of HTML content. The content tags (h2, h3, p, a, b, strong, etc.) should be used appropriately. An example would be:
    { content: [
    {'h2': 'A Catchy Title for "Tips and Reminders for ${keyPhrase}"'},
    {'p': 'This would be a paragraph introducing the section.'},
    {'ul': [
        {'li': 'Tip 1: Explanation of the first tip.'},
        {'li': 'Tip 2: Explanation of the second tip.'},
        {'li': 'Tip 3: Explanation of the third tip.'},
    ]},
    {'p': 'This would be a paragraph providing an example or reminder to illustrate the tips.'},
    ]}
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
  const { websiteName, websiteUrl, websiteContext } = websiteData;
  return `
    You are a skilled content writer who specializes in writing SEO-optimized content for the company ${websiteName}. ${websiteName} is using a hub and spoke SEO content model on their website to generate organic traffic. You are writing a blog post titled "${blogName}", which is a spoke within the model mentioned before. Its hub topic is "${hubName}". The keyphrase (keyword) for this blog is "${keyPhrase}". Some context on ${websiteName} is: "${websiteContext}".
    Your objective is to write a compelling closing section for this blog post from the perspective of ${websiteName}. Generate a catchy and engaging closing paragraph based on the key points and significance of the blog post. This section should:

    1. Summarize the key takeaways from the blog post, emphasizing the importance of "${keyPhrase}" in the context of "${blogName}".
    2. Remind readers of the main points discussed and the value they provide.
    3. Encourage readers to learn more about ${hubName} by pointing them to the webpage ${
    websiteUrl + "/" + hubUrl
  }.
  4. Encourage readers to explore related content within the hub and spoke model by referencing potentially related spoke articles: ${otherSpokesTitleAndUrl
    .map((spoke) => `${spoke.spokeName} (${spoke.spokeUrl})`)
    .join(", ")}. NOTE: ONLY IF THEY ARE RELATED!
    5. Use a tone and style that reflects the brand voice of "${websiteName}" and leaves a lasting impression on the audience.
    6. Keep the content within a word limit of 200 words.

    The content you generate should be structured in JSON format, with each object representing a block of HTML content. The content tags (h2, h3, p, a, b, strong, etc.) should be used appropriately. An example would be:
    { content: [
    {'h2': 'A Catchy Title for the Closing Section'},
    {'p': 'This would be a paragraph summarizing the key takeaways.'},
    {'p': 'This would be another paragraph encouraging readers to explore other resources.'},
    ]}
  `;
};
