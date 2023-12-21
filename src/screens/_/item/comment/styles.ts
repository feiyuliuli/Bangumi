/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:43:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-20 12:44:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    backgroundColor: _.colorPlain
  },
  avatar: {
    marginTop: _.md - 4,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.md - 4,
    paddingRight: _.wind,
    marginLeft: _.sm
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  stars: {
    marginVertical: _.xs
  },
  touch: {
    marginVertical: -8,
    marginRight: -2,
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  },
  favor: {
    position: 'absolute',
    zIndex: 1,
    right: -6,
    bottom: -2,
    padding: 2,
    backgroundColor: _.colorPlain,
    borderRadius: 12,
    pointerEvent: 'none'
  }
}))
