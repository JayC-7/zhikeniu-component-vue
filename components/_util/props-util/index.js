function getPropsSlots (slots, props, prop = 'default') {
  return props[prop] || slots[prop]
}

function getListeners (context) {
  return (context.$vnode ? context.$vnode.componentOptions.listeners : context.$listeners) || {}
}

export {
  getPropsSlots,
  getListeners
}