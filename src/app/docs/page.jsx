import DocsPageHeader from "@/src/components/docs/shared/DocsPageHeader";
import DocsPagesContainer from "@/src/components/docs/shared/DocsPagesContainer";
import DocsSectionHeader from "@/src/components/docs/shared/DocsSectionHeader";
import { docsTools } from "@/src/components/shared/Tools/ToolsData";
import ToolsSection from "@/src/components/shared/Tools/ToolsSection";

export default function Docs({}) {
  return (
    <div className="flex flex-col pr-4 h-screen">
      <DocsPageHeader title="Atria Documentation" />
      <DocsPagesContainer>
        <section>
          <DocsSectionHeader title="Quick Guides" />
          <ToolsSection tools={docsTools} />
        </section>
        <section className="flex-grow"></section>
      </DocsPagesContainer>
    </div>
  );
}
