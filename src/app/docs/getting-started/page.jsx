import DocsPageHeader from "@/src/components/docs/shared/DocsPageHeader";
import DocsPagesContainer from "@/src/components/docs/shared/DocsPagesContainer";
import DocsSectionHeader from "@/src/components/docs/shared/DocsSectionHeader";
import Link from "next/link";
import ToolsCard from "@/src/components/shared/Tools/ToolsCard";
import { nextSteps } from "@/src/components/shared/Tools/ToolsData";
export default function GettingStarted() {
  return (
    <div className="flex flex-col pr-4 h-screen">
      <DocsPageHeader title="Getting Started" />
      <DocsPagesContainer>
        <section>
          <DocsSectionHeader title="Introduction" />
          <div className="mb-4">
            <p>
              Welcome to Atria! This page will go through some topics that will
              help you get started using Atria. Specifically, it will cover:
            </p>
            <ol className="list-decimal pl-6">
              <li>What is Atria?</li>
              <li>What you will likely need before using Atria.</li>
              <li>What Atria can and cannot be used for</li>
              <li>Some important terminology used within the application</li>
            </ol>
          </div>

          <DocsSectionHeader title="What is Atria?" />
          <div className="mb-4">
            <p className="mb-2">
              Atria is a tool that automates the process of content writing and
              formatting for blog posts and pages. More specifically, it is a AI
              content generation and formatting tool that streamlines the
              process of creating Hub and Spoke pages for wordpress websites.
            </p>
            <p className="mb-2">
              Atria is built around the hub and spoke content marketing model,
              which is a content building strategy designed to improve seach
              engine optimization and establish authority on specific topics.
              This model relies heavily on internal linking between broader high
              volume topics (the hubs), and more specified and detailed
              subtopics (the spokes).
            </p>
            <p>
              The main goal of Atria is to build content with this strategic
              approach in mind, automating the process of content generation,
              content formatting, internal linking (between hubs and spokes),
              external linking (to high domain authority sites), and providing a
              easy way to integrate this generated content into your existing
              websites (by importing a single file).
            </p>
          </div>

          <DocsSectionHeader title="What do you need?" />
          <div className="mb-4">
            <p className="mb-2">
              To use Atria effectively from the get-go you will need to have
              already completed a few tasks:
            </p>
            <ul className="list-disc pl-6 mb-2">
              <li>Have an existing or new wordpress website setup.</li>
              <li>
                Have an excel file with your content strategy matrix formatted
                properly. You can learn more about that <strong>here.</strong>
              </li>
              <li>
                Have set up all the high D.A backlinks for the current website,
                and have those links available to you.
              </li>
            </ul>
            <p>
              If you haven't completed any of the above, I recommend doing that
              first and then coming back here to generate your blogs.
            </p>
          </div>

          <DocsSectionHeader title="What can Atria be used for?" />
          <div className="mb-4">
            <p className="mb-2">Atria can be used for the following tasks:</p>
            <ul className="mb-2 pl-6 list-disc">
              <li>
                Generating longtail blog posts ideas based on a content strategy
                matrix or custom input using the{" "}
                <Link
                  className="underline font-medium text-custom-primary"
                  href="/dashboard/longtail-generator"
                >
                  Longtail Generator
                </Link>
              </li>
              <li>
                Generating single hub pages (one at a time) using the{" "}
                <Link
                  className="underline font-medium text-custom-primary"
                  href="/dashboard/hub-generator"
                >
                  Hub Generator
                </Link>
                . A good use case for this tool might be if you have an existing
                group of blogs that you want to link together. Building a hub
                page for these blogs individually would be ideal in this
                situation.
              </li>
              <li>
                Generating single spoke pages (one at a time) using the{" "}
                <Link
                  className="underline font-medium text-custom-primary"
                  href="/dashboard/spoke-generator"
                >
                  Spoke Generator
                </Link>
                . A good use case for this tool might be if you have an existing
                hub with multiple spokes. You want to generate a new spoke that
                links to the existing hub and the other related spokes.
              </li>
              <li>
                Generating a group of hubs and spokes all at once using the{" "}
                <Link
                  className="underline font-medium text-custom-primary"
                  href="/dashboard/all-in-one-generator"
                >
                  All in One Generator
                </Link>
                . This is ideal for new websites, or implementing an entirely
                new hub and its related spokes into an existing website.
              </li>
              <li>
                Generating content formatted for wordpress websites that use
                either wordpress blocks or divi page builder.
              </li>
            </ul>
          </div>
          <DocsSectionHeader title="What can Atria NOT be used for?" />
          <div className="mb-4">
            <p className="mb-2">
              Atria currently can not be used for the following tasks:
            </p>
            <ul className="mb-2 pl-6 list-disc">
              <li>
                Building content for, or formatting content for websites that
                aren't built using wordpress.
              </li>
              <li>
                Creating customizable content layouts and content structure
                (with the exception of the 'Section Layout' feature on the
                single hub generator page and the single spoke generator page).
              </li>
            </ul>
          </div>

          <DocsSectionHeader title="Some useful Terminology" />
          <div className="mb-4">
            <p className="mb-2">
              You may have have already encounted some terminology that seems
              unfamiliar and we will unpack the terms that will help you in
              understanding how the application works, and how to fill out input
              fields.
            </p>
            <ul className="mb-2 pl-6">
              <li>
                <strong>Hub:</strong> In the context of the hub and spoke
                content model a hub refers to a central piece of content that
                covers a broad topic in depth. You can consider it to be like
                the cornerstone content for a specific domain of knowledge. In
                this application specifically, it is important to know that hubs
                are always formatted as a wordpress PAGE.
              </li>
              <li>
                <strong>Spoke:</strong> The spokes are more narrowly focused
                pieces of content that dive deeper into specific subtopics
                related to the hub. Each spoke targets long-tail keywords and
                provides detailed information on a particular aspect of the
                broader topic. In this application, spokes are always formatted
                as a wordpress POST. It is also important to know that the term
                'blog' may be used interchangably with 'spoke' throughout the
                application.
              </li>
              <li>
                <strong>URL:</strong> When you see an input field within this
                application use 'URL' in its label, it is refering to the full
                url. Eg: https://cogbranding.com.au
              </li>
              <li>
                <strong>Slug:</strong> When you see an input field within this
                application use 'slug' in its label, it is refering to the part
                of the url that identifies the current page. Generally anything
                after the last '/'. Eg: The slug for the page
                https://cogbranding.com.au/news/slugs-are-cool/ will be
                'slugs-are-cool'.
              </li>
              <li>
                <strong>SEO Matrix:</strong> This refers to the collection of
                keywords identified in the excel sheet you should have prepared.
                In general, the SEO matrix can be broken down into 5 categories
                of words or phrases:
                <ul className="pl-6 list-decimal">
                  <li>
                    <strong>Hubs:</strong>The hub page topics
                  </li>
                  <li>
                    <strong>Spoke Variants:</strong>The selection of spoke page
                    topics.{" "}
                  </li>
                  <li>
                    <strong>Customer Need variants:</strong> Words or phrases
                    that address a potential customers needs.
                  </li>
                  <li>
                    <strong>Filler words:</strong> Words or phrases that can be
                    used to join spoke variants, customer needs and the target
                    audience together to form a ledgible longtail post.
                  </li>
                  <li>
                    <strong>Target Audience:</strong> List of the potential
                    audiences we are writing the blogs/spokes for. Who are we
                    trying to get to read each blogpost?
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
        <section className="flex-grow mb-8">
          <DocsSectionHeader title="Next Steps" />
          <div className="grid grid-cols-3 gap-4">
            {nextSteps.map((tool, index) => {
              return <ToolsCard key={index} tool={tool} />;
            })}
          </div>
        </section>
      </DocsPagesContainer>
    </div>
  );
}
