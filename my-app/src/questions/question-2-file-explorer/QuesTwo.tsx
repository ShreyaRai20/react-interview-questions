import { useState } from "react";
import explorer from "./data/folderData.ts";
import Folder from "./Folder";
import useTraverseTree from "./hooks/useTraverseTree";
import {type  ExplorerNode } from "./types";

function QuesTwo() {
  const [explorerData, setExplorerData] = useState<ExplorerNode>(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = ({
    folderId,
    item,
    isFolder,
  }: {
    folderId: string | number;
    item: string;
    isFolder: boolean;
  }) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <div className="w-full bg-gray-50 p-4">
      <h1 className="text-3xl text-center underline text-red-900">
        Q2. File explorer UI
      </h1>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />
      </div>
    </div>
  );
}

export default QuesTwo;
