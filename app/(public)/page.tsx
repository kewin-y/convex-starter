import { isAuthenticatedNextjs } from "@convex-dev/auth/nextjs/server";
import { LandingPage } from "@/features/landing/components/landing-page";

export default async function HomePage() {
  const authenticated = await isAuthenticatedNextjs();
  return <LandingPage authenticated={authenticated} />;
}
