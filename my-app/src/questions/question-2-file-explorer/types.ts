export interface ExplorerNode {
  id: string | number;
  name: string;
  isFolder: boolean;
  items: ExplorerNode[];
}
