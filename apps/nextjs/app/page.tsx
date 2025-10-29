import { Button } from "@acme/ui/components/button";

export default function Home() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between px-16 py-32 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-foreground max-w-xs text-3xl leading-10 font-semibold tracking-tight">
            Welcome to your T3 Turbo monorepo
          </h1>
          <p className="text-muted-foreground max-w-md text-lg leading-8">
            This Next.js app is configured with workspace packages:
          </p>
          <ul className="text-muted-foreground flex flex-col gap-2 text-left">
            <li>✓ @acme/auth - Environment validation</li>
            <li>✓ @acme/ui - Shared UI components</li>
            <li>✓ @acme/validators - Zod validators</li>
          </ul>
          <div className="mt-4 flex gap-4">
            <Button>Get Started</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
