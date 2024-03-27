/*
 * @Author: czy0729
 * @Date: 2023-12-30 08:57:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 19:29:33
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  loading: {
    marginTop: -_.parallaxImageHeight
  },
  list: {
    paddingBottom: _.bottom + _.tabBarHeight
  },
  grid: {
    paddingLeft: _.wind - _._wind - _.device(0, 8),
    paddingRight: _.wind - _._wind,
    paddingBottom: _.bottom + _.tabBarHeight
  }
}))
