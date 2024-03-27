/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 19:36:55
 */
import React, { useCallback } from 'react'
import { ListView, ListViewProps } from '@components'

import { keyExtractor } from '@utils'
import { memo } from '@utils/decorators'
import Item from '../../component/item'
import Pagination from '../../component/pagination'
import ToolBar from '../../component/tool-bar'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const List = memo(
  ({
    styles,
    list,
    page,
    data,
    numColumns,
    userPagination,
    onScroll,
    onHeaderRefresh,
    onFooterRefresh
  }) => {
    const passProps: ListViewProps = {
      contentContainerStyle: list ? styles.list : styles.grid
    }
    if (userPagination) {
      passProps.ListFooterComponent = <Pagination />
    } else {
      passProps.onHeaderRefresh = onHeaderRefresh
      passProps.onFooterRefresh = onFooterRefresh
    }

    const renderItem = useCallback(
      ({ item, index }) => <Item item={item} index={index} page={page} />,
      [page]
    )

    const { page: pageCurrent, pageTotal } = data.pagination
    return (
      <ListView
        keyExtractor={keyExtractor}
        nestedScrollEnabled
        data={data}
        numColumns={numColumns}
        keyboardDismissMode='on-drag'
        scrollEventThrottle={4}
        renderItem={renderItem}
        ListHeaderComponent={
          <ToolBar page={page} pageCurrent={pageCurrent} pageTotal={pageTotal} />
        }
        onScroll={onScroll}
        {...passProps}
      />
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default List
