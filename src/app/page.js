import { auth } from "@/auth";
import CogBars from "../components/shared/CogBars";
import Link from "next/link";
export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <CogBars customHeight="h-12" customBarWidth="w-3" />
      <h1 className="font-bold text-6xl my-8">Welcome to Atria</h1>
      <Link
        className="mb-10 group py-2 px-4 rounded transition-all duration-200 text-custom-light bg-custom-primary hover:bg-custom-primary/80"
        href="/auth/login"
      >
        Log In
      </Link>
    </main>
  );
}
