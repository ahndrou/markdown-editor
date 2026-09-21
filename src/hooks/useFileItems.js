import { retrieveFromLocalStorage } from "@/utils/localStorageUtils";

import { useEffect, useState } from "react";

function retrieveFileMetaData() {
  let markdown = retrieveFromLocalStorage("markdownDb");
  return markdown.map((file) => {
    return { name: file.name, createdAt: file.createdAt };
  });
}

export default function useFileItems() {
  const metaData = retrieveFileMetaData();

  const [fileMetaData, setFileMetaData] = useState(metaData);

  useEffect(() => {
    addEventListener("storageUpdated", () => {
      setFileMetaData(retrieveFileMetaData);
    });
  }, []);

  return [fileMetaData, setFileMetaData];
}
