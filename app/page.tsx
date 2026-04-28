import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className={`${dmSans.className} text-6xl font-bold tracking-tight text-purple-500`}>Harvey Specter</h1>
      <p className="mt-4 text-xl text-zinc-400">Coming soon.</p>
    </div>
  );
}
