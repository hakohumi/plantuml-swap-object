import * as assert from 'assert'
import {
  ObjectRelationSentence,
  parse_object_relation,
} from '../ObjectRelationSentence'

type TestPattern = {
  actual: string
  expect: ObjectRelationSentence | null
}

const test_swap_object_patterns: TestPattern[] = [
  {
    actual: 'A --> B',
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
    actual: 'A <|. B',
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
    actual: 'A .. B',
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
    actual: 'A o--o B',
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
    actual: 'A ---* B',
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
]

function test_swap_object_success(
  input_string: string,
  expect: ObjectRelationSentence | null
) {
  const actual = parse_object_relation(input_string)

  assert.deepEqual(actual, expect)
}

suite('Swap Object Test Suite', () => {
  test('success test', () => {
    test_swap_object_patterns.forEach(({ actual, expect }) => {
      test_swap_object_success(actual, expect)
    })
  })
})
