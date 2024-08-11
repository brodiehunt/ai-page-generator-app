import DocsPageHeader from "@/src/components/docs/shared/DocsPageHeader";
import DocsPagesContainer from "@/src/components/docs/shared/DocsPagesContainer";
import DocsSectionHeader from "@/src/components/docs/shared/DocsSectionHeader";
import Link from "next/link";
import ToolsCard from "@/src/components/shared/Tools/ToolsCard";
import { nextSteps } from "@/src/components/shared/Tools/ToolsData";
export default function GettingStarted() {
  return (
    <div className="flex flex-col pr-4 h-screen">
      <DocsPageHeader title="Learn Longtail Generator" />
      <DocsPagesContainer>
        <section>
          <DocsSectionHeader title="Introduction" />
          <div className="mb-4">
            <p>You get it by now right?</p>
            <p>
              You can try it out{" "}
              <Link
                className="underline font-medium text-custom-primary"
                href="/dashboard/longtail-generator"
              >
                here
              </Link>
            </p>
          </div>
        </section>
        <section className="flex-grow mb-8">
          <DocsSectionHeader title="Other docs" />
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
