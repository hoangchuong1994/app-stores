import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";

export default async function Home() {
  return (
    <div className="bg-background font-sans">
      <main className="flex flex-col">
        <Hero />
        <CTA />
      </main>
    </div>
  );
}
