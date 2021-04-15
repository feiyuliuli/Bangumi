/*
 * @Author: czy0729
 * @Date: 2020-07-09 10:24:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-15 17:31:36
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { refreshControlProps } from '@tinygrail/styles'

function List({ data, renderItem }) {
  if (!data) {
    return null
  }

  return (
    <ListView
      style={styles.listView}
      keyExtractor={keyExtractor}
      refreshControlProps={refreshControlProps}
      data={data}
      lazy={12}
      showMesume={false}
      footerTextType='tinygrailText'
      footerEmptyDataText='没有符合的结果'
      renderItem={renderItem}
    />
  )
}

export default ob(List)

const styles = _.create({
  listView: {
    flex: 1,
    marginTop: _.sm
  }
})
