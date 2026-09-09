"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // TODO: Forward to an error-monitoring service.
    console.error(error);
  }, [error]);

  return (
    <section className="theme-dark bg-ink text-fg">
      <Container className="flex min-h-[70svh] flex-col justify-center pt-28 pb-16">
        <p className="eyebrow text-fg-muted">Something went wrong</p>
        <h1 className="text-h1 mt-4 max-w-2xl text-white">We hit an unexpected fault.</h1>
        <p className="text-lead mt-4 max-w-xl text-fg-muted">
          The page could not be rendered. You can retry, or head back to the homepage.
        </p>
        {error.digest && <p className="mt-3 font-mono text-xs text-fg-soft">Reference: {error.digest}</p>}
        <div className="mt-8 flex flex-col gap-3 xs:flex-row">
          <Button onClick={() => retry()} variant="lime" size="lg">
            Try again
          </Button>
          <Button href="/" variant="outline" size="lg">
            Back to home
          </Button>
        </div>
      </Container>
    </section>
  );
}
