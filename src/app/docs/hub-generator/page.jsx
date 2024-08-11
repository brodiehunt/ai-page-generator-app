import DocsPageHeader from "@/src/components/docs/shared/DocsPageHeader";
import DocsPagesContainer from "@/src/components/docs/shared/DocsPagesContainer";
import DocsSectionHeader from "@/src/components/docs/shared/DocsSectionHeader";
import Link from "next/link";
import ToolsCard from "@/src/components/shared/Tools/ToolsCard";
import { nextSteps } from "@/src/components/shared/Tools/ToolsData";
export default function LearnHubGenerator() {
  return (
    <div className="flex flex-col pr-4 h-screen">
      <DocsPageHeader title="Learn Hub Generator" />
      <DocsPagesContainer>
        <section>
          <DocsSectionHeader title="Introduction" />
          <div className="mb-4">
            <p>Welcome to the hub generator docs. This page will cover:</p>
            <ol className="list-decimal pl-6">
              <li>What is hub generator?</li>
              <li>What you will likely need before using the hub generator</li>
              <li>
                The input fields, what they mean and how they are implemented
                into the hub.
              </li>
              <li>How to implement your new hub into your site.</li>
            </ol>
          </div>

          <DocsSectionHeader title="What is the hub generator" />
          <div className="mb-4">
            <p className="mb-2">
              The hub generator is a tool for building single hub pages for your
              website.
            </p>
            <p className="mb-2">
              There are a few advantages of using a the single hub generator
              over the all in one generator. They include:
            </p>
            <ul className="list-disc pl-6 mb-2">
              <li>
                The ability to have inter-page linking straight away during the
                formating step. This is not possible with all in one generator
                because the assumption is none of the spokes will be live
                (published) straight away.
              </li>
              <li>
                The ability to control the order and the sections that the hub
                is composed of using the &apos;Hub Section Layout&apos; section.
              </li>
            </ul>
          </div>

          <DocsSectionHeader title="What do you need?" />
          <div className="mb-4">
            <p className="mb-2">
              To use the hub generator effectively you will need:
            </p>
            <ul className="list-disc pl-6 mb-2">
              <li>The title and url of the hub this spoke will belong to</li>
              <li>
                A couple of high D.A backlinks for the website you are importing
                this hub into
              </li>
              <li>
                The title, full url and seo keyphrase of the spokes that already
                exist on the website that you want this page to be the hub for,
                if you want this blog to link to them.
              </li>
              <li>
                To know whether or not the website you are importing into uses
                divi builder.
              </li>
            </ul>
            <p>
              If you haven&apos;t completed any of the above, I recommend
              gathering that information first.
            </p>
          </div>

          <DocsSectionHeader title="Filling out the required data" />
          <div className="mb-4">
            <p className="mb-2">
              This sections provides some context around the input data that you
              are required to fill in, what some of the fields mean and how they
              are implemented in the logic of the application
            </p>
            <div className="mb-4">
              <h4 className="mb-2 font-medium text-xl text-custom-primary">
                Step 1: Website Information
              </h4>
              <img
                src="/docs/spokeGenerator/WebsiteInfo.webp"
                alt="Website info screenshot"
                className="max-h-[200px]"
              />
              <p className="mb-2">
                This section exists so you can provide context about the company
                and the website your are importing the content into. There are
                three fields:
              </p>
              <ul className="mb-2 pl-6 list-decimal">
                <li>
                  <strong>Website Name:</strong> This is the name of the
                  company. Eg COG Branding
                </li>
                <li>
                  <strong>Website Url:</strong> This is the base url of the
                  website. Eg: https://cogbranding.com.au
                </li>
                <li>
                  <strong>Website Context:</strong> This input field is very
                  important. It is included in each prompt made to open AI for
                  every section of content generated. As such, it is important
                  to keep this section succinct whilst also covering as much
                  useful information about the company as possible. This section
                  should include things like: What is the company about? What
                  services do they provide? Who are there customers? What are
                  there values? etc. You could also include things like their
                  vibe and location to aid in generating content that is
                  significantly more appropriate and targeted. It is important
                  to remember that this input is included for EVERY PROMPT. This
                  means that writing &apos;Give me a 200 word introduction&apos;
                  will result in a 200 word introduction for each individual
                  section.
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="mb-2 font-medium text-xl text-custom-primary">
              Step 2: Hub Info
            </h4>
            <img
              src="/docs/hubGenerator/hubInfoHub.webp"
              alt="Website info screenshot"
              className="max-h-[200px]"
            />
            <p className="mb-2">
              This section exists so you can provide context about the Hub that
              you are about to generate. This data is used to provide the AI
              model with context of what the hub topic is about.
            </p>
            <ul className="mb-2 pl-6 list-decimal">
              <li>
                <strong>Hub Title:</strong> The title of the hub page you are
                generating. Eg Small Business
              </li>
              <li>
                <strong>Hub Slug:</strong> The slug of the hub page you are
                generating. Eg: small-business
              </li>
              <li>
                <strong>Generate SEO Meta:</strong> A checkbox that when
                checked, will automatically generate your yoast SEO meta data.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="mb-2 font-medium text-xl text-custom-primary">
              Step 3: Backlinks and Integrated Links
            </h4>
            <img
              src="/docs/spokeGenerator/backlinks.webp"
              alt="Website info screenshot"
              className="max-h-[300px]"
            />
            <p className="mb-2">
              This section exists so you can provide context about the spokes
              that will belong to this hub. This data is used to provide the AI
              model with context of what this hubs related spokes may be about,
              so it can shape some content to be relevant to these spokes and
              then link them. For each hub page, there will be one high D.A
              backlink included in the introduction section, and another
              including in the conclusion section.
            </p>
            <ul className="mb-2 pl-6 list-decimal">
              <li>
                <strong>Backlink URL</strong> The full url of the high D.A
                backlink
              </li>
              <li>
                <strong>Related Spoke Title:</strong> The title of the related
                spoke
              </li>
              <li>
                <strong>Related Spoke URL:</strong> The full url of the related
                spoke
              </li>
              <li>
                <strong>Related Spoke keyphrase:</strong> The SEO keyphrase of
                the related spoke.
              </li>
              <li>
                <strong>Is Spoke Live:</strong> This value is used to determine
                whether or not the builder should link to the related spoke, or
                to just include content where the spoke can potentially be
                linked. If checked, the link to the related spoke will be
                preformatted and included in the content by default. If not, the
                content will be generated so that it makes sense to eventually
                incorporate a link once the related spoke is published.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="mb-2 font-medium text-xl text-custom-primary">
              Step 4: Hub Section Layout
            </h4>
            <img
              src="/docs/spokeGenerator/blogSectionLayout.webp"
              alt="Website info screenshot"
              className="max-h-[300px]"
            />
            <p className="mb-2">
              This feature works almost like a page builder. Clicking the green
              bubbles will include that section in the blog you are about to
              create. When a section is &apos;added&apos;, it will appear as a
              tab (like in the image shown above). The order in which these tabs
              are selected or render on the screen is IMPORTANT. You can change
              the order by dragging and dropping the tabs to the position you
              want it placed.
            </p>
          </div>
          <div className="mb-4">
            <h4 className="mb-2 font-medium text-xl text-custom-primary">
              Step 6: Import Format
            </h4>

            <p className="mb-2">
              Select divi builder for divi websites. WP blocks for everything
              else.
            </p>
          </div>

          <DocsSectionHeader title="I've downloaded the file, what now?" />
          <div className="mb-4">
            <p className="mb-2">
              Time to import the file you just downloaded into your CMS! Steps
              to do this are as follows:
            </p>
            <ul className="mb-2 list-decimal pl-6">
              <li>
                Login in to the admin area of the website this blog is for
              </li>
              <li>
                In the sideBar navigation hover over &apos;Tools&apos; and click
                &apos;import&apos;
              </li>
              <li>
                Once you are on the import page, look for the
                &apos;Wordpress&apos; option. You may need to install the
                importer... If so, do that.{" "}
              </li>
              <li>Next click &apos;Run Importer&apos;</li>
              <li>
                Click &apos;Choose File&apos; and upload the file you just
                downloaded.
              </li>
              <li>Click &apos;Upload File and Import&apos;</li>
              <li>Choose a user to assign the posts too. </li>
              <li>Do NOT download and import file attachments</li>
              <li>Click &apos;Submit&apos;</li>
            </ul>
            <p className="mb-2">
              Congrats! You should have a new post in the &apos;Posts&apos; tab
              in your wordpress admin.
            </p>
          </div>

          <DocsSectionHeader title="Time to try it out" />
          <div className="mb-4">
            <p>
              Have a go yourself. Vist{" "}
              <Link
                className="font-medium underline text-custom-primary"
                href="/dashboard/spoke-generator"
              >
                The Spoke Generator Tool.
              </Link>
            </p>
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
