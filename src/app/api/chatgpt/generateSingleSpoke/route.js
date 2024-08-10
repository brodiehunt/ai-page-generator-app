export const maxDuration = 60;
import { NextResponse } from "next/server";
import {
  addSingleBlogItem,
  addSingleBlogItemDivi,
  initiateXmlDoc,
} from "@/src/utils/xmlBuilder/xmlBuilder";

import {
  buildIntroductionPrompt,
  buildHowToPrompt,
  buildHistoryOfTermPrompt,
  buildTermsToKnowPrompt,
  buildTipsPrompt,
  buildExamplesPrompt,
  buildProsConsPrompt,
  buildWhatIsTermPrompt,
  buildConclusionPrompt,
  buildSeoGenerationPrompt,
  buildAnecdotePrompt,
} from "@/src/utils/prompts/singleSpoke/singleSpokePrompts";
import { queryChatGptContent } from "@/src/utils/openAI/queryAPI";
import { formatGutenburg } from "@/src/utils/formatContent/formatGutenburg";
import { formatDivi } from "@/src/utils/formatContent/formatDivi";

export async function POST(request) {
  console.log("_____ ENTER SINGLE BLOG BUILD REQUEST ______");

  try {
    const data = await request.json();
    console.log(data);
    if (!data) {
      throw new Error("Error with the entered data");
    }

    const { websiteName, websiteUrl } = data;

    const { rss, channel } = initiateXmlDoc(websiteName, websiteUrl);

    const singleBlog = await buildSingleBlog({ data, channel });

    const xmlString = rss.end({ pretty: true });

    const response = NextResponse.json(
      { message: `Success Building ${data.spokeTitle}`, xmlString: xmlString },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: `Failed to build` }, { status: 400 });
  }
}

const buildSingleBlog = async ({ data, channel }) => {
  const {
    websiteName,
    websiteUrl,
    websiteContext,
    spokeTitle,
    spokeSlug,
    spokeKeyphrase,
    spokeTargetAudience,
    generateSeoMeta,
    hubName,
    hubUrl,
    highDaBackLinks,
    relatedSpokes,
    blogSections,
    blogFormat,
  } = data;

  let promptsArray;

  try {
    console.log(blogSections);
    const promptsFunctionsArray = blogSections.map((section) => {
      return mapStringToPromptFunction(section);
    });

    console.log(promptsFunctionsArray);
    promptsArray = promptsFunctionsArray.map((promptFunction) => {
      console.log(promptFunction.name);
      return promptFunction({
        websiteName,
        websiteUrl,
        websiteContext,
        spokeTitle,
        spokeSlug,
        spokeKeyphrase,
        spokeTargetAudience,
        generateSeoMeta,
        hubName,
        hubUrl,
        highDaBackLinks,
        relatedSpokes,
      });
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error building prompts");
  }

  // Generate Seo Content
  let seoContent;

  try {
    const seoPrompt = buildSeoGenerationPrompt({
      websiteName,
      websiteContext,
      spokeTitle,
      spokeSlug,
      spokeKeyphrase,
      spokeTargetAudience,
    });
    const chatGptResponse = await queryChatGptContent(seoPrompt);
    console.log("THE Seo Response", chatGptResponse);
    seoContent = chatGptResponse;
  } catch (error) {
    throw new Error("Error Building Seo Content");
  }

  let responses;
  try {
    const aiContentResponses = promptsArray.map((prompt) => {
      return queryChatGptContent(prompt);
    });

    responses = await Promise.all(aiContentResponses);
  } catch (error) {
    console.log(error);
    throw new Error("Error querying openAI API");
  }

  let contentFormatted;
  try {
    if (blogFormat === "wp block") {
      contentFormatted = formatGutenburg(responses);
    } else {
      contentFormatted = formatDivi(responses);
    }
  } catch (error) {
    throw new Error("Could not format the responses");
  }

  try {
    const dataToBuildXML = {
      blogName: spokeTitle,
      baseUrl: websiteUrl,
      slug: spokeSlug,
      excerpt: seoContent?.excerpt || "",
      websiteName: websiteName,
      content: contentFormatted,
      seoTitle: `${websiteName} | ${spokeTitle}`,
      seoDescription: seoContent?.seoDescription || "",
      seoKeyphrase: spokeKeyphrase,
    };

    if (blogFormat === "wp block") {
      addSingleBlogItem(dataToBuildXML, channel, 1);
    } else {
      addSingleBlogItemDivi(dataToBuildXML, channel, 1);
    }
  } catch (error) {
    throw new Error("Could not build XML for blog");
  }

  return "Success bro!";
};

const mapStringToPromptFunction = (blogSection) => {
  let promptFunc;
  switch (blogSection) {
    case "Introduction":
      promptFunc = buildIntroductionPrompt;
      break;
    case "What is Term section":
      promptFunc = buildWhatIsTermPrompt;
      break;
    case "How to Term Section":
      promptFunc = buildHowToPrompt;
      break;
    case "History of term section":
      promptFunc = buildHistoryOfTermPrompt;
      break;
    case "Terms to know section":
      promptFunc = buildTermsToKnowPrompt;
      break;
    case "Examples Section":
      promptFunc = buildExamplesPrompt;
      break;
    case "Pros and Cons Section":
      promptFunc = buildProsConsPrompt;
      break;
    case "Tips Section":
      promptFunc = buildTipsPrompt;
      break;
    case "Conclusion Section":
      promptFunc = buildConclusionPrompt;
      break;
    case "table of contents":
      promptFunc = null;
      break;
    case "Anecdote":
      promptFunc = buildAnecdotePrompt;
      break;
    default: {
      promptFunc = null;
    }
  }
  console.log(
    `Mapped section "${blogSection}" to function: ${
      promptFunc ? promptFunc.name : "null"
    }`
  );
  return promptFunc;
};
