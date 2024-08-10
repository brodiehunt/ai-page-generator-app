export const maxDuration = 60;
import { NextResponse } from "next/server";
import { queryChatGptContent } from "@/src/utils/openAI/queryAPI";
import {
  initiateXmlDoc,
  addSingleBlogItem,
  addSinglePageItem,
  addSingleBlogItemDivi,
  addSinglePageItemDivi,
} from "@/src/utils/xmlBuilder/xmlBuilder";

import {
  buildIntroductionPrompt,
  buildKeyConceptsPrompt,
  buildBenefitsPrompt,
  buildBestPracticesPrompt,
  buildFutureTrendsPrompt,
  buildExamplesPrompt,
  buildConclusionPrompt,
} from "@/src/utils/prompts/allInOne/pagePrompts";

import {
  buildPostIntroPrompt,
  buildPostWhatIsTermPrompt,
  buildPostHistoryTermPrompt,
  buildPostTermsToKnowPrompt,
  buildPostProsConsPrompt,
  buildPostHowToPrompt,
  buildPostTipsPrompt,
  buildPostConclPrompt,
  buildPostAnecdotePrompt,
} from "@/src/utils/prompts/allInOne/postPrompts";

import { formatGutenburg } from "@/src/utils/formatContent/formatGutenburg";
import { formatDivi } from "@/src/utils/formatContent/formatDivi";

export async function POST(request) {
  console.log("_____ENTER POST REQUEST_____");
  try {
    const { postsData, websiteData } = await request.json();

    if (!postsData || !websiteData) {
      throw new Error("The right data has not been provided");
    }

    const { rss, channel } = initiateXmlDoc(
      websiteData.websiteName,
      websiteData.websiteUrl
    );

    const createBlogPromises = [];
    let postCount = 1;
    postsData.forEach((hub) => {
      const { hub: hubName, hubUrl, seoMeta } = hub;
      const hubData = { hubName, hubUrl, seoMeta };
      createBlogPromises.push(
        buildSinglePage({
          hub,
          websiteData,
          channel,
          index: postCount,
        })
      );
      postCount++;
      hub.spokes?.forEach((spoke) => {
        const otherSpokes = hub.spokes.filter((otherSpoke) => {
          if (otherSpoke.id !== spoke.id) {
            return otherSpoke;
          }
        });
        createBlogPromises.push(
          buildSingleBlogPost({
            hubData,
            spoke,
            otherSpokes,
            websiteData,
            channel,
            index: postCount,
          })
        );
        postCount++;
      });
    });

    const responses = await Promise.allSettled(createBlogPromises);
    console.log(responses);
    const xmlString = rss.end({ pretty: true });

    const response = NextResponse.json(
      { responses, xmlString: xmlString },
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": 'attachment; filename="wordpress-post.json"',
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Fuck me" });
  }
}

// BUILD A SING PAGE AND ADD TO XML
const buildSinglePage = async ({ hub, websiteData, channel, index }) => {
  console.log("_______ENTER BUILD PAGE_______");
  let introPrompt;
  let keyConceptsPrompt;
  let benefitsPrompt;
  let bestPracticePrompt;
  let futureTrendsPrompt;
  let examplesPrompt;
  let conclusionPrompt;

  const {
    hub: hubName,
    hubUrl,
    spokes,
    seoMeta: { theExcerpt, seoDescription, seoTitle, seoKeyphrase },
  } = hub;
  const { websiteUrl, websiteName } = websiteData;
  const spokesData = spokes.map((spoke) => {
    return {
      title: spoke.title,
      focusKeyPhrase: spoke.focusKeyPhrase,
      slug: spoke.slug,
    };
  });
  const hubData = { hubName, hubUrl, seoMeta: hub.seoMeta };
  try {
    introPrompt = buildIntroductionPrompt({
      spokesData,
      hubData,
      websiteData,
    });
    keyConceptsPrompt = buildKeyConceptsPrompt({
      spokesData,
      hubData,
      websiteData,
    });
    benefitsPrompt = buildBenefitsPrompt({
      spokesData,
      hubData,
      websiteData,
    });
    bestPracticePrompt = buildBestPracticesPrompt({
      spokesData,
      hubData,
      websiteData,
    });
    futureTrendsPrompt = buildFutureTrendsPrompt({
      spokesData,
      hubData,
      websiteData,
    });
    examplesPrompt = buildExamplesPrompt({
      spokesData,
      hubData,
      websiteData,
    });
    conclusionPrompt = buildConclusionPrompt({
      spokesData,
      hubData,
      websiteData,
    });
  } catch (error) {
    console.error("Build page prompt error", error);
    throw { message: "Error constructing prompts.", title: hubName };
  }

  // Attempt to query open ai and fetch data (returned as json);
  let responses;
  try {
    const contentRequests = [
      queryChatGptContent(introPrompt),
      queryChatGptContent(keyConceptsPrompt),
      queryChatGptContent(benefitsPrompt),
      queryChatGptContent(bestPracticePrompt),
      queryChatGptContent(futureTrendsPrompt),
      queryChatGptContent(examplesPrompt),
      queryChatGptContent(conclusionPrompt),
    ];

    responses = await Promise.all(contentRequests);
  } catch (error) {
    console.log("Fetch page content error", error);
    throw {
      message: "Error fetching some of the content from chatgpt",
      title: hubName,
    };
  }

  // Attempt to format the returned data.
  // Attempt to format the returned data.
  let contentFormatted;
  try {
    if (websiteData.formatType === "wp block") {
      contentFormatted = formatGutenburg(responses);
    } else {
      contentFormatted = formatDivi(responses);
    }
  } catch (error) {
    console.log("format page content error", error);
    throw { message: "Could not format the content", title: hubName };
  }

  // Attempt to add a single item to the feed.
  try {
    const dataToBuildXML = {
      hubName,
      baseUrl: websiteUrl,
      slug: hubUrl,
      excerpt: theExcerpt,
      websiteName,
      content: contentFormatted,
      seoTitle,
      seoDescription,
      seoKeyphrase,
    };
    if (websiteData.formatType === "wp block") {
      addSinglePageItem(dataToBuildXML, channel, index);
    } else {
      addSinglePageItemDivi(dataToBuildXML, channel, index);
    }
  } catch (error) {
    console.log("Build xml page item error", error);
    throw { message: "Error adding the xml item", title: hubName };
  }

  return { title: hubName };
};

// BUILD A SINGLE BLOG POST AND ADD ITEM TO XML
const buildSingleBlogPost = async ({
  hubData,
  spoke,
  otherSpokes,
  websiteData,
  channel,
  index,
}) => {
  console.log("_______ENTER BUILD BLOG_______");

  // Attempt to build the prompts;
  let anecdotePrompt;
  let introPrompt;
  let whatIsTermPrompt;
  let historyOfTermPrompt;
  let termsToKnowPrompt;
  let prosConsPrompt;
  let howToPrompt;
  let tipsPrompt;
  let conclusionPrompt;

  const otherSpokesTitleAndUrl = otherSpokes.map((otherSpoke) => {
    return {
      spokeName: otherSpoke.title,
      spokeUrl: `${websiteData.blogBaseUrl + "/" + otherSpoke.slug}`,
    };
  });
  try {
    anecdotePrompt = buildPostAnecdotePrompt({
      spoke,
      hubData,
      websiteData,
    });
    introPrompt = buildPostIntroPrompt({ spoke, hubData, websiteData });
    whatIsTermPrompt = buildPostWhatIsTermPrompt({
      spoke,
      otherSpokesTitleAndUrl,
      hubData,
      websiteData,
    });
    historyOfTermPrompt = buildPostHistoryTermPrompt({
      spoke,
      otherSpokesTitleAndUrl,
      hubData,
      websiteData,
    });
    termsToKnowPrompt = buildPostTermsToKnowPrompt({
      spoke,
      otherSpokesTitleAndUrl,
      hubData,
      websiteData,
    });
    prosConsPrompt = buildPostProsConsPrompt({
      spoke,
      otherSpokesTitleAndUrl,
      hubData,
      websiteData,
    });
    howToPrompt = buildPostHowToPrompt({
      spoke,
      otherSpokesTitleAndUrl,
      hubData,
      websiteData,
    });
    tipsPrompt = buildPostTipsPrompt({
      spoke,
      otherSpokesTitleAndUrl,
      hubData,
      websiteData,
    });
    conclusionPrompt = buildPostConclPrompt({
      spoke,
      otherSpokesTitleAndUrl,
      hubData,
      websiteData,
    });
  } catch (error) {
    console.log("Prompt build error", error);
    throw { message: "Error constructing prompts.", title: spoke.title };
  }

  // Attempt to query open ai and fetch data (returned as json);
  let responses;
  try {
    const contentRequests = [
      queryChatGptContent(anecdotePrompt),
      queryChatGptContent(introPrompt),
      queryChatGptContent(whatIsTermPrompt),
      queryChatGptContent(historyOfTermPrompt),
      queryChatGptContent(termsToKnowPrompt),
      queryChatGptContent(prosConsPrompt),
      queryChatGptContent(howToPrompt),
      queryChatGptContent(tipsPrompt),
      queryChatGptContent(conclusionPrompt),
    ];

    responses = await Promise.all(contentRequests);
  } catch (error) {
    console.log("Query chpt error");
    throw {
      message: "Error fetching some of the content from chatgpt",
      title: spoke.title,
    };
  }

  // Attempt to format the returned data.
  let contentFormatted;
  try {
    if (websiteData.formatType === "wp block") {
      contentFormatted = formatGutenburg(responses);
    } else {
      contentFormatted = formatDivi(responses);
    }
  } catch (error) {
    console.log("Format responses error", error);
    throw {
      message: "Could not format the content",
      title: spoke.title,
    };
  }

  // Attempt to add a single item to the feed.
  try {
    const dataToBuildXML = {
      blogName: spoke.title,
      baseUrl: websiteData.websiteUrl,
      slug: spoke.slug,
      excerpt: spoke.seoMeta.theExcerpt,
      websiteName: websiteData.websiteName,
      content: contentFormatted,
      seoTitle: spoke.seoMeta.seoTitle,
      seoDescription: spoke.seoMeta.seoDescription,
      seoKeyphrase: spoke.seoMeta.seoKeyphrase,
    };
    if (websiteData.formatType === "wp block") {
      addSingleBlogItem(dataToBuildXML, channel, index);
    } else {
      addSingleBlogItemDivi(dataToBuildXML, channel, index);
    }
  } catch (error) {
    console.log("Build xml blog item error", error);
    throw {
      message: "Error adding the xml item",
      title: spoke.title,
    };
  }

  return { title: spoke.title };
};
