/*
 * @Author: czy0729
 * @Date: 2022-06-05 15:46:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:26:36
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function More() {
  const { $ } = useStore<Ctx>()
  const { fixed, list, collected } = $.state
  return (
    <ToolBar.Popover
      data={[
        `选项 · ${fixed ? '锁定上方' : '浮动'}`,
        `布局 · ${list ? '列表' : '网格'}`,
        `收藏 · ${collected ? '显示' : '隐藏'}`
      ]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={16}
      type='desc'
      transparent
      onSelect={title => {
        if (title.includes('选项')) return $.onToggleFixed()
        if (title.includes('布局')) return $.onToggleList()
        if (title.includes('收藏')) return $.onToggleCollected()
      }}
    />
  )
}

export default ob(More)
