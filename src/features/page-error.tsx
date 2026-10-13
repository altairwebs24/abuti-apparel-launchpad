import { useEffect } from 'react';
import { useRouter, type ErrorComponentProps } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { reportLovableError } from '@/lib/lovable-error-reporting';

export function PageError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: 'abuti_page_error' });
  }, [error]);

  return (
    <section className="section min-h-[65vh] flex flex-col items-center justify-center text-center">
      <h1 className="page-title">BACK IN A MOMENT.</h1>
      <p className="mb-6 text-muted-foreground">This page could not load. Please try again.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={async () => {
          // A failed module import is cached by the browser. A full navigation
          // restores the current app version rather than retrying that import.
          if (error instanceof Error && /dynamically imported module|module script|loading chunk/i.test(error.message)) {
            window.location.reload();
            return;
          }
          await router.invalidate();
          reset();
        }}>Try again</Button>
        <Button asChild variant="outline"><a href="/">Go home</a></Button>
      </div>
    </section>
  );
}