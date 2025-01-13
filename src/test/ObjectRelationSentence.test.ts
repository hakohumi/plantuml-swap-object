import * as assert from 'assert'
import {
  ObjectRelationSentence,
  parse_object_relation,
} from '../ObjectRelationSentence'

type TestPattern = {
  input_string: string
  expect: ObjectRelationSentence | null
}

suite('parse_object_relation Success Test Suite', () => {
  test('success test', () => {
    const test_success_patterns: TestPattern[] = [
      {
        input_string: 'A --> B',
        expect: {
          left_bol: '',
          left_object: 'A',
          left_empty: ' ',
          left_arrow: '',
          line: '--',
          right_arrow: '>',
          right_empty: ' ',
          right_object: 'B',
          right_eol: '',
        },
      },
      {
        input_string: 'A <|. B',
        expect: {
          left_bol: '',
          left_object: 'A',
          left_empty: ' ',
          left_arrow: '<|',
          line: '.',
          right_arrow: '',
          right_empty: ' ',
          right_object: 'B',
          right_eol: '',
        },
      },
      {
        input_string: 'A .. B',
        expect: {
          left_bol: '',
          left_object: 'A',
          left_empty: ' ',
          left_arrow: '',
          line: '..',
          right_arrow: '',
          right_empty: ' ',
          right_object: 'B',
          right_eol: '',
        },
      },
      {
        input_string: 'A o--o B',
        expect: {
          left_bol: '',
          left_object: 'A',
          left_empty: ' ',
          left_arrow: 'o',
          line: '--',
          right_arrow: 'o',
          right_empty: ' ',
          right_object: 'B',
          right_eol: '',
        },
      },
      {
        input_string: 'A ---* B',
        expect: {
          left_bol: '',
          left_object: 'A',
          left_empty: ' ',
          left_arrow: '',
          line: '---',
          right_arrow: '*',
          right_empty: ' ',
          right_object: 'B',
          right_eol: '',
        },
      },
      {
        input_string: 'A - B',
        expect: {
          left_bol: '',
          left_object: 'A',
          left_empty: ' ',
          left_arrow: '',
          line: '-',
          right_arrow: '',
          right_empty: ' ',
          right_object: 'B',
          right_eol: '',
        },
      },
    ]

    test_success_patterns.forEach(({ input_string, expect }) => {
      const actual = parse_object_relation(input_string)
      assert.deepEqual(actual, expect)
    })
  })

  test('コメント用のコロンが含まれているテストパターン', () => {
    const test_pattern_containing_a_colon_for_comments: TestPattern[] = [
      {
        input_string: 'A --> B : ABCD',
        expect: {
          left_bol: '',
          left_object: 'A',
          left_empty: ' ',
          left_arrow: '',
          line: '--',
          right_arrow: '>',
          right_empty: ' ',
          right_object: 'B',
          right_eol: ' : ABCD',
        },
      },
      {
        input_string: 'A --> B : ABCD efgh',
        expect: {
          left_bol: '',
          left_object: 'A',
          left_empty: ' ',
          left_arrow: '',
          line: '--',
          right_arrow: '>',
          right_empty: ' ',
          right_object: 'B',
          right_eol: ' : ABCD efgh',
        },
      },
    ]

    test_pattern_containing_a_colon_for_comments.forEach(
      ({ input_string, expect }) => {
        const actual = parse_object_relation(input_string)
        assert.deepEqual(actual, expect)
      }
    )
  })

  test('端からアローまでの間に空白が2つ以上存在する場合、対象のオブジェクトのみ交換する', () => {
    const test_pattern_containing_a_colon_for_comments: TestPattern[] = [
      {
        input_string: 'abcd A --> B efgh',
        expect: {
          left_bol: 'abcd ',
          left_object: 'A',
          left_empty: ' ',
          left_arrow: '',
          line: '--',
          right_arrow: '>',
          right_empty: ' ',
          right_object: 'B',
          right_eol: ' efgh',
        },
      },
      {
        input_string: 'abcd efgh A --> B ijkl mnop',
        expect: {
          left_bol: 'abcd efgh ',
          left_object: 'A',
          left_empty: ' ',
          left_arrow: '',
          line: '--',
          right_arrow: '>',
          right_empty: ' ',
          right_object: 'B',
          right_eol: ' ijkl mnop',
        },
      },
    ]

    test_pattern_containing_a_colon_for_comments.forEach(
      ({ input_string, expect }) => {
        const actual = parse_object_relation(input_string)
        assert.deepEqual(actual, expect)
      }
    )
  })
})

suite('Object Name Test Suite', () => {
  test('オブジェクト名にアンダーバーが含まれる場合', () => {
    const test_patterns: { left: string; right: string }[] = [
      { left: 'A', right: 'B' },
      { left: 'A1', right: 'B2' },
      { left: 'A_', right: 'B_' },
      { left: '_A', right: '_B' },
      { left: 'A_B', right: 'B_C' },
      { left: 'A.B', right: 'B.C' },
    ]

    test_patterns.forEach(({ left, right }) => {
      const actual = parse_object_relation(`${left} --> ${right}`)
      const expect = { ...actual, left_object: left, right_object: right }
      assert.deepEqual(actual, expect)
    })
  })
})
