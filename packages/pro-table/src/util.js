export function conditionSearch({ type, hideInSearch }) {
  return !type && !hideInSearch
}

export function conditionSettings({ prop, type, fixed, hideInTable }) {
  return !!prop && !type && !fixed && !hideInTable
}

export function conditionTable({ hideInTable }) {
  return !hideInTable
}
