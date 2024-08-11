import DocsPageHeader from "@/src/components/docs/shared/DocsPageHeader";
import DocsPagesContainer from "@/src/components/docs/shared/DocsPagesContainer";
import DocsSectionHeader from "@/src/components/docs/shared/DocsSectionHeader";
import Link from "next/link";
import ToolsCard from "@/src/components/shared/Tools/ToolsCard";
import { nextSteps } from "@/src/components/shared/Tools/ToolsData";
export default function GettingStarted() {
  return (
    <div className="flex flex-col pr-4 h-screen">
      <DocsPageHeader title="Learn All In One Generator" />
      <DocsPagesContainer>
        <section>
          <DocsSectionHeader title="Introduction" />
          <div className="mb-4">
            <p>
              Welcome to the all in one generator docs. This page will cover:
            </p>
            <ol className="list-decimal pl-6">
              <li>What is the all in one generator?</li>
              <li>What you will likely need before using it</li>
              <li>The input fields, what they mean and how they are used.</li>
              <li>How to implement your new pages into your site.</li>
            </ol>
          </div>
          <DocsSectionHeader title="What is the all in one generator" />
          <div className="mb-4">
            <p className="mb-2">
              The all in one generator is a tool for building multiple hubs and
              spokes at the same time.
            </p>
            <p className="mb-2">
              Using this tool you are able to generate multiple hub pages and
              all of their related spokes at the same time. All of the generated
              content will be able to be downloaded in a single xml file.
            </p>
          </div>
          <DocsSectionHeader title="What do you need?" />
          <div className="mb-4">
            <p className="mb-2">
              To use the all in one generator effectively you will need:
            </p>
            <ul className="list-disc pl-6 mb-2">
              <li>An SEO Matrix (xlsx) file.</li>
              <li>
                A list of high D.A backlinks for the website you are importing
                into.
              </li>
              <li>
                To know whether or not the website you are importing into uses
                divi builder.
              </li>
            </ul>
            <p>
              If you haven not completed any of the above, I recommend gathering
              that information first.
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
                src="/docs/allInOneGenerator/allInOneWebsiteInfo.webp"
                alt="Website info screenshot"
                className="max-w-[800px]"
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
                  <strong>Blog Base Url:</strong> The base url for the blog/post
                  section in your website. Eg: https://cogbranding.com.au/news
                </li>
                <li>
                  <strong>Blogs Per Hub:</strong> The amount of spokes/blogs you
                  want generated per hub. Maximum is 10.
                </li>
                <li>
                  <strong>Company Context:</strong> This input field is very
                  important. It is included in each prompt made to open AI for
                  every section of content generated. As such, it is important
                  to keep this section succinct whilst also covering as much
                  useful information about the company as possible. This section
                  should include things like: What is the company about? What
                  services do they provide? Who are there customers? What are
                  their values? etc. You could also include things like their
                  vibe and location to aid in generating content that is
                  significantly more appropriate and targeted. It is important
                  to remember that this input is included for EVERY PROMPT. This
                  means that writing &apos;Give me a 200 word introduction&apos;
                  will result in a 200 word introduction for each individual
                  section.
                </li>
                <li>
                  <strong>Backlink URL</strong> The full url of the high D.A
                  backlink
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="mb-2 font-medium text-xl text-custom-primary">
                Step 2: Matrix Input
              </h4>

              <p className="mb-2">
                This section is for your SEO Matrix. You can either upload a
                xlsx file that meets the required format, or you can manually
                enter the values as a comma seperated list in the provided input
                fields.
              </p>
              <img
                src="/docs/allInOneGenerator/MatrixInput.webp"
                alt="Website info screenshot"
                className="max-w-[800px]"
              />
              <p className="mb-2">
                Once you have filled out this section, you can click
                &quot;Create Longtails&quot;. The Longtails will be populated in
                the &quot;Generated hubs and spokes&quot; section below the
                button.
              </p>
            </div>
            <div className="mb-4">
              <h4 className="mb-2 font-medium text-xl text-custom-primary">
                Step 3: Refining Generated Hubs and Spokes
              </h4>

              <p className="mb-2">
                This section is for you to preview the hubs and spokes data
                generated based on your input and SEO Matrix. You can inspect,
                modify, regenerate and delete hubs and spokes here.
              </p>
              <img
                src="/docs/allInOneGenerator/HubsNSpokes.webp"
                alt="Website info screenshot"
                className="max-w-[800px]"
              />
              <p className="mb-2">
                You can delete and hub and all of its spokes by clicking the
                trash icon in the hub row.
              </p>
              <p className="mb-2">
                You can delete and single spoke by clicking the trash icon in
                the spoke row row.
              </p>
              <p className="mb-2">
                You can inspect and edit all the generated data for a hub or
                spoke by clicking its title. It will open a modal like so:
              </p>
              <img
                src="/docs/allInOneGenerator/spokeModal.webp"
                alt="Website info screenshot"
                className="max-w-[800px] mb-4"
              />
              <p className="mb-2">
                You can regenerate spokes that you don&apos;t like by selecting
                the checkbox next to its title and clicking the button
                &apos;Regenerate selected spokes spokes&apos;
              </p>
              <img
                src="/docs/allInOneGenerator/RegenerateSpokes.png"
                alt="Website info screenshot"
                className="max-w-[800px] mb-4"
              />
            </div>
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
                href="/dashboard/all-in-one-generator"
              >
                The All In One Generator Tool.
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
