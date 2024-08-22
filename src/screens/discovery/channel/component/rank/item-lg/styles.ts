/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:33:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-20 17:34:18
 */
import { _ } from '@stores'
import { COVER_HEIGHT, COVER_WIDTH } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  item: {
    width: '100%',
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    marginBottom: 4
  },
  content: {
    height: COVER_HEIGHT - 2 * _.xs,
    marginTop: _.xs
  },
  music: {
    height: COVER_WIDTH - 2 * _.xs
  },
  name: {
    paddingRight: _.sm
  },
  rec: {
    top: 0,
    right: 0
  },
  recText: {
    fontSize: 56,
    opacity: 0.5
  },
  rec1: {
    color: _.colorMain
  },
  rec2: {
    color: _.colorWarning
  },
  rec3: {
    color: _.colorYellow
  }
}))