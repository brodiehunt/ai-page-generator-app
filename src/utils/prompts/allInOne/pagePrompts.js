export const buildPageIntroductionPrompt = ({
  spokesData,
  hubData,
  websiteData,
}) => {
  const { hubName } = hubData;
  const { websiteName } = websiteData;
  const introPrompt = `You are a content writer for a website called ${websiteName}. Your task is to write an introduction for a hub page. This hub page is part of an SEO strategy known as the hub and spoke method, where '${hubName}' is the main topic (hub) and various related subtopics (spokes) fall under it. The key phrase for SEO is '${hubName}'. 

    Please write a concise, engaging 200-word introduction to a hub page about '${hubName}'. The introduction should cover the following points:
    - Why this main topic is important.
    - Who would benefit from exploring this hub.
    - What key subtopics (spokes) are covered on this hub page.

    The content should be structured in JSON format, with each object representing a block of content. The content tags (h1, h2, p) should be used appropriately, and the value should be the content. For example: {content: [{'h2': 'This would be an h2 tag'}, {'p': 'This would be a paragraph tag'}, {'ul': [{'li': 'This is how you would structure an unordered list'}, {'li': 'Another list item'}]}]}.

    Note: Do not include a title tag as this page already has one.`;

  return introPrompt;
};

export const buildPageFirstBodyParagraphPrompt = ({
  spokesData,
  hubData,
  websiteData,
}) => {
  const { hubName } = hubData;
  const { websiteName } = websiteData;
  const bodyParagraphPrompt = `You are a content writer for a website called ${websiteName}. Your task is to write the first body paragraph for a hub page. This hub page is part of an SEO strategy known as the hub and spoke method, where '${hubName}' is the main topic (hub) and various related subtopics (spokes) fall under it. The key phrase for SEO is '${hubName}'.

  Please write a 250-word first body paragraph that answers the question "What is ${hubName}?" and follows up with a rationale on "Why ${hubName} matters." The content should explain why the term or concept is important, its personal and/or business implications, and be tailored specifically for a general audience.

  The content should be structured in JSON format, with each object representing a block of content. The content tags (h1, h2, p) should be used appropriately, and the value should be the content. For example: {content: [{'h2': 'This would be an h2 tag'}, {'p': 'This would be a paragraph tag'}, {'ul': [{'li': 'This is how you would structure an unordered list'}, {'li': 'Another list item'}]}]}.
  `;

  return bodyParagraphPrompt;
};

export const buildPageSecondBodyParagraphPrompt = ({
  spokesData,
  hubData,
  websiteData,
}) => {
  const { hubName } = hubData;
  const { websiteName } = websiteData;
  const historySectionPrompt = `You are a content writer for a website called ${websiteName}. Your task is to write a section about the history of the topic for a hub page. This hub page is part of an SEO strategy known as the hub and spoke method, where '${hubName}' is the main topic (hub) and various related subtopics (spokes) fall under it. The key phrase for SEO is '${hubName}'.

  Please write a 250-word section that elaborates on the history of '${hubName}', detailing its background and how the concept has developed from its inception to today. Explain significant milestones and changes over time, and how these developments have shaped the current state of '${hubName}'.
  
  The content should be structured in JSON format, with each object representing a block of content. The content tags (h1, h2, p) should be used appropriately, and the value should be the content. For example: {content: [{'h2': 'This would be an h2 tag'}, {'p': 'This would be a paragraph tag'}, {'ul': [{'li': 'This is how you would structure an unordered list'}, {'li': 'Another list item'}]}]}.
  `;

  return historySectionPrompt;
};

export const buildPageConclusionPrompt = ({
  spokesData,
  hubData,
  websiteData,
}) => {
  const { hubName } = hubData;
  const { websiteName } = websiteData;
  // Build a prompt that gets ChatGPT to generate some JSON for the content of the conclusion for a blog post
  const conclusionPrompt = `You are a content writer for a website called ${websiteName}. Your task is to write the conclusion for a hub page. This hub page is part of an SEO strategy known as the hub and spoke method, where '${hubName}' is the main topic (hub) and various related subtopics (spokes) fall under it. The key phrase for SEO is '${hubName}'.

Please write a 200-word conclusion that summarizes the key points discussed in the hub page '${hubName}'. The conclusion should reinforce the importance of '${hubName}' and provide a closing statement that leaves a lasting impression on the reader. Encourage the reader to apply the insights gained from the hub page and explore related topics on the website.

The content should be structured in JSON format, with each object representing a block of content. The content tags (h1, h2, p) should be used appropriately, and the value should be the content. For example: {content: [{'h2': 'This would be an h2 tag'}, {'p': 'This would be a paragraph tag'}, {'ul': [{'li': 'This is how you would structure an unordered list'}, {'li': 'Another list item'}]}]}.

Note: Do not include a title tag as this page already has one.`;

  return conclusionPrompt;
};
