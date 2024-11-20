/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:39:29
 */
import React from 'react'
import { Component, Header, Page } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { alert } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import ToolBar from '@tinygrail/_/tool-bar'
import { NavigationProps } from '@types'
import { useTinygrailAdvanceAuction2Page } from './hooks'
import List from './list'
import { sortDS } from './store'

/** 拍卖推荐 B */
const TinygrailAdvanceAuction2 = (props: NavigationProps) => {
  const { id, $ } = useTinygrailAdvanceAuction2Page(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-advance-auction-2'>
      <StoreContext.Provider value={id}>
        <Header
          title='拍卖推荐 B'
          hm={['tinygrail/advance-auction2', 'TinygrailAdvanceAuction2']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <IconHeader
              name='md-info-outline'
              color={_.colorTinygrailPlain}
              onPress={() => {
                t('竞拍推荐.提示', {
                  type: 2
                })

                alert(
                  '从英灵殿里面查找前 2000 条\n数量 > 80\n若当前 rank > 500 按 500 时的实际股息 / 竞拍底价 * 100 = 分数',
                  '当前计算方式'
                )
              }}
            />
          )}
        />
        <Page style={_.container.tinygrail}>
          <ToolBar
            style={_.mt._sm}
            level={$.state.level}
            levelMap={$.levelMap}
            data={sortDS}
            sort={$.state.sort}
            direction={$.state.sort ? 'down' : undefined}
            onLevelSelect={$.onLevelSelect}
            onSortPress={$.onSortPress}
          />
          <List />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailAdvanceAuction2
