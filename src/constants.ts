export interface SeparatorItem {
  id: string;
  label: string;
  value: string;
  displaySymbol: string;
}

export const SEPARATOR_LIST: SeparatorItem[] = [
  { id: "comma", label: "Comma (,)", value: ",", displaySymbol: "," },
  { id: "comma_space", label: "Comma + Space (, )", value: ", ", displaySymbol: ", " },
  { id: "line_break", label: "Line Break (\\n)", value: "\n", displaySymbol: "↵" },
  { id: "semicolon", label: "Semicolon (;)", value: ";", displaySymbol: ";" },
  { id: "semicolon_space", label: "Semicolon + Space (; )", value: "; ", displaySymbol: "; " },
  { id: "space", label: "Space ( )", value: " ", displaySymbol: "␣" },
  { id: "tab", label: "Tab (\\t)", value: "\t", displaySymbol: "⇥" },
  { id: "pipe", label: "Pipe (|)", value: "|", displaySymbol: "|" },
  { id: "pipe_space", label: "Pipe + Space ( | )", value: " | ", displaySymbol: " | " },
  { id: "colon", label: "Colon (:)", value: ":", displaySymbol: ":" },
  { id: "colon_space", label: "Colon + Space (: )", value: ": ", displaySymbol: ": " },
  { id: "hyphen", label: "Hyphen (-)", value: "-", displaySymbol: "-" },
  { id: "hyphen_space", label: "Hyphen + Space ( - )", value: " - ", displaySymbol: " - " },
  { id: "slash", label: "Slash (/)", value: "/", displaySymbol: "/" },
  { id: "backslash", label: "Backslash (\\)", value: "\\", displaySymbol: "\\" },
  { id: "ampersand", label: "Ampersand (&)", value: "&", displaySymbol: "&" },
  { id: "hash", label: "Hash (#)", value: "#", displaySymbol: "#" },
  { id: "asterisk", label: "Asterisk (*)", value: "*", displaySymbol: "*" },
  { id: "tilde", label: "Tilde (~)", value: "~", displaySymbol: "~" },
  { id: "underscore", label: "Underscore (_)", value: "_", displaySymbol: "_" },
];

export const getSeparatorById = (id: string): SeparatorItem => {
  return SEPARATOR_LIST.find((s) => s.id === id) || SEPARATOR_LIST[0];
};

export const getSeparatorByValue = (val: string): SeparatorItem => {
  return SEPARATOR_LIST.find((s) => s.value === val) || SEPARATOR_LIST[0];
};
