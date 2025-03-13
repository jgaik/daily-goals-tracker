import type { Metadata } from "next";
import { LayoutPage } from "@/components";
import "@yamori-design/styles/dist/global.css";

export const metadata: Metadata = {
  description: "Page for displaying my daily goals tracker",
  title: "Daily goals tracker",
  authors: {
    name: "Jakub Gaik",
  },
};

export default LayoutPage;
