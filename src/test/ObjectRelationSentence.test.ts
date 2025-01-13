import * as assert from 'assert'
import {
  ObjectRelationSentence,
  parse_object_relation,
} from '../ObjectRelationSentence'

type TestPattern = {
  input_string: string
  expect: ObjectRelationSentence | null
}

suite('parse_object_relation Test Suite', () => {
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
    ]

    test_pattern_containing_a_colon_for_comments.forEach(
      ({ input_string, expect }) => {
        const actual = parse_object_relation(input_string)
        assert.deepEqual(actual, expect)
      }
    )
  })
})
