import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import CubottMark from "@/components/brand/CubottMark"

export default function NotFound() {
  return (
    <main id="main" className="pt-[calc(var(--header-h)+12px)]">
      <section className="stage">
        <Container className="flex min-h-[70vh] flex-col items-start justify-center py-16">
          <CubottMark tone="reverse" className="h-10 w-10" />
          <p className="eyebrow mt-8 text-blue-400">404</p>
          <h1 className="display-lg mt-4">This page isn&apos;t part of the system.</h1>
          <p className="mt-4 max-w-md text-lg text-white/60">The link may be old, or the page may have moved.</p>
          <div className="mt-8 flex gap-3">
            <Button href="/" variant="primary-dark" arrow>
              Back to the start
            </Button>
            <Button href="/contact" variant="ghost-dark" arrow>
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
