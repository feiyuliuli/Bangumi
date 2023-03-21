/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-21 18:38:57
 */
import React, { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { Heatmap, ListView } from '@components'
import { keyExtractor } from '@utils'
import { memo } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import FixedToolBar from '../fixed-tool-bar'
import Item from './item'
import { DEFAULT_PROPS } from './ds'

const List = memo(
  ({
    styles,
    forwardRef,
    subjectType,
    scrollY,
    page,
    list,
    userGridNum,
    userCollections,
    onScroll,
    onRefreshOffset,
    onFooterRefresh,
    ...other
  }) => {
    global.rerender('User.List')

    const ListHeaderComponent = useMemo(
      () => (
        <>
          <View style={styles.header} />
          <FixedToolBar page={page} onRefreshOffset={onRefreshOffset} />
        </>
      ),
      [onRefreshOffset, page, styles]
    )
    const _onScroll = useMemo(
      () =>
        Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY
                }
              }
            }
          ],
          {
            useNativeDriver: true,
            listener: onScroll
          }
        ),
      [onScroll, scrollY]
    )

    const _forwardRef = useCallback(
      (ref: { scrollToIndex: any; scrollToOffset: any }) => {
        forwardRef(ref, page)
      },
      [forwardRef, page]
    )

    const numColumns = list ? undefined : userGridNum
    const renderItem = useCallback(
      ({ item, index }) => {
        return (
          <>
            <Item item={item} page={page} numColumns={numColumns} />
            {index === 0 && <Heatmap id='我的.跳转' to='Subject' alias='条目' />}
          </>
        )
      },
      [page, numColumns]
    )

    useMount(() => {
      onRefreshOffset(page)
    })

    return (
      <ListView
        ref={_forwardRef}
        keyExtractor={keyExtractor}
        style={styles.listView}
        contentContainerStyle={list ? styles.list : styles.grid}
        data={userCollections}
        numColumns={numColumns}
        lazy={12}
        animated
        scrollEventThrottle={16}
        keyboardDismissMode='on-drag'
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        onFooterRefresh={onFooterRefresh}
        onScroll={_onScroll}
        {...other}
      />
    )
  },
  DEFAULT_PROPS
)

export default List