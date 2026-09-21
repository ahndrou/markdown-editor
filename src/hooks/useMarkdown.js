import { retrieveFromLocalStorage } from "@/utils/localStorageUtils";
import defaultMarkdown from "../data.json";
import { useState } from "react";

export default function useMarkdown(index) {
  let markdown = retrieveFromLocalStorage("markdownDb");

  if (!markdown) {
    markdown = defaultMarkdown;
    index = 0;
  }

  return useState(markdown[index]);
}
