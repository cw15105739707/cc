/**
 * 本地存储表单
 *
 * @export
 * @param {*} name
 * @param {*} formData
 */
export function save(name, formData) {
  localStorage.setItem(name, JSON.stringify(formData))
}

export function get(name) {
  return localStorage.getItem(name)
}

export function remove(name) {
  localStorage.removeItem(name)
}
