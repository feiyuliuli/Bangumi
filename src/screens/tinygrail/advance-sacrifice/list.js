/*
 * @Author: czy0729
 * @Date: 2020-01-25 20:20:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:08:48
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'
import ItemAdvance from '../_/item-advance'

function List(props, { $ }) {
  const { _loaded } = $.advanceSacrificeList
  if (!_loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const event = {
    id: '献祭推荐.跳转',
    data: {
      userId: $.myUserId
    }
  }
  const renderItem = ({ item, index }) => (
    <ItemAdvance index={index} event={event} {...item} />
  )

  return (
    <ListView
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={$.advanceSacrificeList}
      scrollToTop
      renderItem={renderItem}
      onHeaderRefresh={$.fetchAdvanceSacrificeList}
    />
  )
}

export default obc(List, {
  title: '全部'
})
