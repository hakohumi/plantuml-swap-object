export const ObjectRelationPattern =
  /(?<left_bol>.*[\t| ]*)(?<left_object>[0-9a-zA-Z_]*)(?<left_empty>[\t| ]+)(?<left_arrow>(<\||<|o|\*)?)(?<line>(-+[a-z]*-+|\.+[a-z]*\.+|-+|\.+)+)(?<right_arrow>(\|>|>|o|\*)?)(?<right_empty>[\t| ]+)(?<right_object>[a-zA-Z][0-9a-zA-Z_]*)(?<right_eol>.*)/

// 線を見つけて分割する
// input: 'A <-- B',
// expect: {
//   left_line: 'A <',
//   line: '--',
//   right_line: ' B',

import { ObjectRelationSentence } from './ObjectRelationSentence'

// },
export function parse_line(
  str: string
): { left_other: string; line: string; right_other: string } | null {
  const reg_line_result = str.match(/-+[a-z]*-+|\.+[a-z]*\.+|-+|\.+/)

  if (reg_line_result == null) {
    return null
  }

  if (reg_line_result.length != 1) {
    return null
  }

  const split_lines = str.split(reg_line_result[0])

  return {
    left_other: split_lines[0],
    line: reg_line_result[0],
    right_other: split_lines[1],
  }
}

// 矢印と線を見つけてオブジェクトに格納し、それ以外の文字列と一緒に出力する
// input: ["A <", " B", "A ", "> B", "A*", "oB, "A B <|--]
// return: [{arrow: "<", other: "A "}, "", "", ">", "*"]
export function parse_arrow(
  str: string
): { arrow: string; other: string } | null {
  str.match(
    /(?<left_arrow>(<\||<|o|\*)?)(?<line>(-+[a-z]*-+|\.+[a-z]*\.+|-+|\.+)+)(?<right_arrow>(\|>|>|o|\*)?)/
  )

  return {
    arrow: '',
    other: '',
  }
}

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

  // TODO: 線で区切って
  const splitted_line = parse_line(str)

  if (splitted_line == null) {
    return null
  }

  // TODO: アローで区切って、
  const left_line = parse_arrow(splitted_line.left_other)
  const right_line = parse_arrow(splitted_line.right_other)

  // その両隣のスペースまで(右はコロンも含む)を取得する

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
