import type { ReactNode } from "react";
import { Container } from "@mui/material";

export default function HeroComponent({ children }: { children: ReactNode }) {
  return <Container maxWidth="lg">{children}</Container>;
}
