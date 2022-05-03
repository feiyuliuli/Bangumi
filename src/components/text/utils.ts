/*
 * @Author: czy0729
 * @Date: 2022-05-01 12:03:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 11:20:09
 */
import { s2t } from '@utils/thirdParty/cn-char'
import { _ } from '@stores'
import { PAD } from '@constants'

export const PAD_INCREASE = PAD === 2 ? 4 : 2 // 平板设备统一放大单位

export function computedLineHeight(
  size?: number,
  lineHeight?: number,
  lineHeightIncrease?: number,
  contextLineHeightIncrease?: number
) {
  const _lineHeightIncrease =
    (lineHeightIncrease === undefined
      ? contextLineHeightIncrease
      : lineHeightIncrease) + _.device(0, PAD_INCREASE)

  if (lineHeight !== undefined || _lineHeightIncrease) {
    const _lineHeight = Math.max(lineHeight || 14, size) + _lineHeightIncrease
    return _lineHeight <= 2 + _lineHeightIncrease
      ? _lineHeight * (size + _.fontSizeAdjust)
      : (_lineHeight + _.fontSizeAdjust) * _.lineHeightRatio
  }
}

export function format(children) {
  if (typeof children === 'string') {
    return s2t(children)
  }

  if (Array.isArray(children)) {
    return children.map(item => format(item))
  }

  return children
}