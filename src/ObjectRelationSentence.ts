export const ObjectRelationPattern =
  /(?<left_bol>[\t| ]*)(?<left_object>[a-zA-Z][0-9a-zA-Z_]*)(?<left_empty>[\t| ]+)(?<left_arrow>(<\||<|o|\*)?)(?<line>(-+[a-z]*-+|\.+[a-z]*\.+|-+|\.+)+)(?<right_arrow>(\|>|>|o|\*)?)(?<right_empty>[\t| ]+)(?<right_object>[a-zA-Z][0-9a-zA-Z_]*)(?<right_eol>.*)/

export function parse_object_relation(
  str: string
): ObjectRelationSentence | null {
  // 線部分
  // --
  // ...
  // -left-
  // ..right..

  // 先部分
  // <, >
  // <|, |>
  // o
  // *

  const get_all = str.match(ObjectRelationPattern)

  if (get_all?.groups == null) {
    return null
  }

  const result: ObjectRelationSentence = {
    left_bol: get_all.groups.left_bol,
    left_object: get_all.groups.left_object,
    left_arrow: get_all.groups.left_arrow,
    left_empty: get_all.groups.left_empty,
    line: get_all.groups.line,
    right_arrow: get_all.groups.right_arrow,
    right_empty: get_all.groups.right_empty,
    right_object: get_all.groups.right_object,
    right_eol: get_all.groups.right_eol,
  }

  return result
}

export interface ObjectRelationSentence {
  left_bol: string
  left_object: string
  left_empty: string
  // left_arrow?: "<" | "<|" | "o" | "*",
  left_arrow: string
  // TODO: 多重度
  // left_multiplicity: string;
  line: string
  // right_arrow?: ">" | "|>" | "o" | "*",
  right_arrow: string
  // TODO: 多重度
  // right_multiplicity: string;
  right_empty: string
  right_object: string
  right_eol: string
}

export function swap_object(
  object_relation_sentence: ObjectRelationSentence
): ObjectRelationSentence {
  return {
    ...object_relation_sentence,
    left_object: object_relation_sentence.right_object,
    right_object: object_relation_sentence.left_object,
  }
}

export function ObjectRelationSentence_to_string(
  _this: ObjectRelationSentence
): string {
  return `${_this.left_bol}${_this.left_object}${_this.left_empty}${_this.left_arrow}${_this.line}${_this.right_arrow}${_this.right_empty}${_this.right_object}${_this.right_eol}`
}
