function getPropsSlots (slots, props, prop = 'default') {
  return props[prop] ?? slots[prop]?.()
}

export {
  getPropsSlots
}