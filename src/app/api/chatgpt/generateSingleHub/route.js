export const maxDuration = 60;
import { NextResponse } from "next/server";
import {
  addSingleBlogItem,
  addSingleBlogItemDivi,
  addSinglePageItem,
  addSinglePageItemDivi,
  initiateXmlDoc,
} from "@/src/utils/xmlBuilder/xmlBuilder";

import {
  buildIntroductionPrompt,
  buildKeyConceptsPrompt,
  buildBenefitsPrompt,
  buildBestPracticesPrompt,
  buildFutureTrendsPrompt,
  buildExamplesPrompt,
  buildConclusionPrompt,
  buildSeoGenerationPrompt,
} from "@/src/utils/prompts/singleHub/singleHubPrompts";
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

    const singleHub = await buildSingleHub({ data, channel });

    const xmlString = rss.end({ pretty: true });

    const response = NextResponse.json(
      { message: `Success Building ${data.hubName}`, xmlString: xmlString },
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

const buildSingleHub = async ({ data, channel }) => {
  const {
    websiteName,
    websiteUrl,
    websiteContext,
    generateSeoMeta,
    hubName,
    hubUrl,
    highDaBackLinks,
    relatedSpokes,
    hubSections,
    blogFormat,
  } = data;

  let promptsArray;
  console.log("High Da backlinks", highDaBackLinks);
  try {
    console.log(hubSections);
    const promptsFunctionsArray = hubSections.map((section) => {
      return mapStringToPromptFunction(section);
    });

    console.log(promptsFunctionsArray);
    promptsArray = promptsFunctionsArray.map((promptFunction) => {
      console.log(promptFunction.name);
      return promptFunction({
        websiteName,
        websiteUrl,
        websiteContext,
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
      hubName,
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
    throw new Error("Error querying openAI API");
  }
  console.log(responses);
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
      hubName,
      baseUrl: websiteUrl,
      slug: hubUrl,
      excerpt: seoContent?.excerpt || "",
      websiteName: websiteName,
      content: contentFormatted,
      seoTitle: `${websiteName} | ${hubName}`,
      seoDescription: seoContent?.seoDescription || "",
      seoKeyphrase: hubName,
    };

    if (blogFormat === "wp block") {
      addSinglePageItem(dataToBuildXML, channel, 1);
    } else {
      addSinglePageItemDivi(dataToBuildXML, channel, 1);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not build XML for Hub");
  }

  return "Success bro!";
};

const mapStringToPromptFunction = (hubSection) => {
  let promptFunc;
  switch (hubSection) {
    case "Introduction":
      promptFunc = buildIntroductionPrompt;
      break;
    case "Key concepts section":
      promptFunc = buildKeyConceptsPrompt;
      break;
    case "Benefits section":
      promptFunc = buildBenefitsPrompt;
      break;
    case "Best practices section":
      promptFunc = buildBestPracticesPrompt;
      break;
    case "Future trends section":
      promptFunc = buildFutureTrendsPrompt;
      break;
    case "Examples Section":
      promptFunc = buildExamplesPrompt;
      break;
    case "Conclusion section":
      promptFunc = buildConclusionPrompt;
      break;
    default: {
      promptFunc = null;
    }
  }
  console.log(
    `Mapped section "${hubSection}" to function: ${
      promptFunc ? promptFunc.name : "null"
    }`
  );
  return promptFunc;
};
