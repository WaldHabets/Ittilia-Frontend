interface SubLineage {
  name: string;
  description: string;
}

interface Lineage {
  name: string;
  description: string;
  author: string;
  lineages: SubLineage[];
}

export { Lineage, SubLineage }
