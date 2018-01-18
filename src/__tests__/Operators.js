import { add, sub } from '../Operators'

describe('Operators', () => {
  test('Add', () => {
    const add3 = add(3)

    expect(add3.label).toBe('+3')
    expect(typeof add3.func).toBe('function')
    expect(add3.func(4)).toBe(7)
  })

  test('Sub', () => {
    const sub6 = sub(6)

    expect(sub6.label).toBe('-6')
    expect(typeof sub6.func).toBe('function')
    expect(sub6.func(10)).toBe(4)
  })
})
