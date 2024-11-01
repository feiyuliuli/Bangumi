/*
 * @Author: czy0729
 * @Date: 2022-11-27 15:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 12:05:46
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { keyExtractor, renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'

function LocalList(_props, { $ }: Ctx) {
  return (
    <ListView
      key={$.sections.length}
      keyExtractor={keyExtractor}
      style={_.mt.sm}
      sections={$.sections}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
    />
  )
}

export default obc(LocalList, COMPONENT)
