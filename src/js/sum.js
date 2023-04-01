export default function sum () {
  return [...arguments].reduce((pre, cur) => {
    return pre + cur
  }, 0)
}