export function add(x) {
  return { label: `+${x}`, func: y => y + x }
}

export function sub(x) {
  return { label: `-${x}`, func: y => y - x }
}

export function mul(x) {
  return { label: `×${x}`, func: y => y * x }
}

export function div(x) {
  return { label: `÷${x}`, func: y => Math.round(y / x) }
}
