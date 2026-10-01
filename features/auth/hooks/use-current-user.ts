"use client";

import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useCurrentUser() {
  const { isAuthenticated } = useConvexAuth();
  return useQuery(api.auth.currentUser, isAuthenticated ? {} : "skip");
}
