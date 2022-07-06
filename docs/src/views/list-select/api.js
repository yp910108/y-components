import { SEX } from './constant'

export function fetchList({ name, sex, idCard, startBirthDate, endBirthDate, pageNo, pageSize }) {
  return new Promise((resolve) => {
    let list = []
    for (let i = 0; i < 100; i++) {
      list.push({
        id: i,
        name: `张三${i + 1}`,
        sex: i % 2 === 0 ? SEX.man : SEX.woman,
        phone: '13812345678',
        idCard: '370181200022222222',
        birthDate: `${1991 + i * 2}-10-01`
      })
    }
    if (name) {
      list = list.filter((item) => item.name.includes(name))
    }
    if (sex) {
      list = list.filter((item) => item.sex === sex)
    }
    if (idCard) {
      list = list.filter((item) => item.idCard.includes(idCard))
    }
    if (startBirthDate && endBirthDate) {
      list = list.filter(
        (item) =>
          new Date(item.birthDate).getTime() >= new Date(startBirthDate).getTime() && // eslint-disable-line
          new Date(item.birthDate).getTime() <= new Date(endBirthDate).getTime()
      )
    }
    let result = list
    if (pageNo) {
      result = list.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    }
    setTimeout(() => {
      resolve({ total: list.length, list: result })
    }, 1000)
  })
}
