interface IndexEntry {
  name: string;
  href: string;
}

interface IndexEntryGroup {
  title: string;
  entries: IndexEntry[];
}

export default interface WikiIndex {
  title: string;
  groups: IndexEntryGroup[];
}
