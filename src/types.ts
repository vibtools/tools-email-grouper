export interface Group {
  id: string;
  emails: string[];
  separatorId: string;
  separator: string;
}

export interface SeparatorOption {
  id: string;
  label: string;
  value: string;
  displaySymbol: string;
}
