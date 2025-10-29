"use client";

import { use } from "react";
import { ProfileForm } from "@/components/forms/ProfileForm";

type Props = {
  params: Promise<{
    locale: string;
    palette?: any;
  }>;
};

export default function ProfilePage({ params }: Props) {
  const { locale } = use(params);
  console.warn("Rendering ProfilePage with locale:", locale);
  return <ProfileForm />;
}
