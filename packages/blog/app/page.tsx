import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/posts/list/1");
}
