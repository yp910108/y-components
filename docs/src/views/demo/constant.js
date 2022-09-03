export const SEX = {
  man: '1',
  woman: '2'
}
export const sexOptions = [
  { value: SEX.man, label: '男' },
  { value: SEX.woman, label: '女' }
]
export const sexKeyValue = {
  [SEX.man]: '男',
  [SEX.woman]: '女'
}

export const POLITICS_STATUS = {
  partyMember: '1',
  leagueMember: '2',
  masses: '3'
}
export const politicsStatusOptions = [
  { value: POLITICS_STATUS.partyMember, label: '党员' },
  { value: POLITICS_STATUS.leagueMember, label: '团员' },
  { value: POLITICS_STATUS.masses, label: '群众' }
]
export const politicsStatusKeyValue = {
  [POLITICS_STATUS.partyMember]: '党员',
  [POLITICS_STATUS.leagueMember]: '团员',
  [POLITICS_STATUS.masses]: '群众'
}

export const addressOptions = [
  {
    code: '10001',
    name: '山东省',
    children: [
      {
        code: '1000101',
        name: '济南市',
        children: [
          {
            code: '100010101',
            name: '高新区'
          },
          {
            code: '100010102',
            name: '历城区'
          }
        ]
      }
    ]
  },
  {
    code: '10002',
    name: '北京市',
    children: [
      {
        code: '1000201',
        name: '东城区'
      },
      {
        code: '1000202',
        name: '西城区'
      }
    ]
  }
]

export const deptOptions = [
  {
    code: '10001',
    name: '开发部',
    children: [
      {
        code: '1000101',
        name: '开发一部'
      },
      {
        code: '1000102',
        name: '开发二部'
      },
      {
        code: '1000103',
        name: '开发三部'
      },
      {
        code: '1000104',
        name: '开发四部'
      },
      {
        code: '1000105',
        name: '开发五部'
      }
    ]
  },
  {
    code: '10002',
    name: '人力资源部',
    children: [
      {
        code: '1000201',
        name: '人力资源部一部'
      },
      {
        code: '1000202',
        name: '人力资源部二部'
      },
      {
        code: '1000203',
        name: '人力资源部三部'
      }
    ]
  }
]
