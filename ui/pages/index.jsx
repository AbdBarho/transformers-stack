import { useRouter } from "next/router";

export default function Main() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push("/prompts");
  }
  return null;
}
