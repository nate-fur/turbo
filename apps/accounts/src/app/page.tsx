import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect to the default locale (English)
  // In a production app, you might want to detect the user's preferred language
  // and redirect accordingly, but for now we'll use English as default
  redirect("/en");
}
