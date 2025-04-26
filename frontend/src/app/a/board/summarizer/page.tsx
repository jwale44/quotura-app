import { BoardHeader } from "@/components/board-header"
import { DefaultWidth } from "@/components/default-width"
import { PageLayout } from "@/components/layout/page-layout"
import { SummarizerBoard } from "@/app/a/board/summarizer/(components)"

export default function SummarizerPage() {
  return (
    <div>
      <section className="mb-10">
        <BoardHeader title="Summarizer" />
        <PageLayout>
          <DefaultWidth className="px-10">
            <div className="w-full pt-6">
              <SummarizerBoard />
            </div>
          </DefaultWidth>
        </PageLayout>
      </section>
    </div>
  )
}
