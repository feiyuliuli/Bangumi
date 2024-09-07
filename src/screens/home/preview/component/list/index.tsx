/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-07 01:49:48
 */
import React from 'react'
import { View } from 'react-native'
import { Image, ScrollView, Text, Touchable } from '@components'
import { _ } from '@stores'
import { showImageViewer } from '@utils'
import { obc } from '@utils/decorators'
import { WEB } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List(_props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { epsThumbs = [], epsThumbsHeader = {} } = $.state

  let images: string[] = $.data.length ? $.data : epsThumbs
  let headers: {
    Referer?: string
  } = $.headers?.Referer ? $.headers : epsThumbsHeader

  const passProps: any = {}
  if (headers?.Referer && headers.Referer.includes('douban')) {
    if ($.data.length && $.data[0].includes('douban')) images = [...$.data]
    epsThumbs.forEach(item => {
      if (!images.includes(item)) images.push(item)
    })

    passProps.autoSize = styles.item.width
    passProps.fallback = true
  } else {
    passProps.width = styles.item.width
    passProps.height = styles.item.width * 0.56
    passProps.fallback = true
  }

  return (
    <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
      {images.map((item, index) => (
        <View key={item} style={styles.item}>
          <Touchable
            withoutFeedback
            onPress={() => {
              showImageViewer(
                images.map(item => ({
                  url: item.split('@')[0],
                  headers
                })),
                index
              )
            }}
          >
            <Image {...passProps} src={item} headers={headers} errorToHide />
          </Touchable>
        </View>
      ))}
      {!!(WEB && $.subjectId) && (
        <Touchable
          style={_.mt.lg}
          onPress={() => {
            navigation.push('Subject', {
              subjectId: $.subjectId
            })
          }}
        >
          <Text align='center' underline>
            返回条目
          </Text>
        </Touchable>
      )}
    </ScrollView>
  )
}

export default obc(List, COMPONENT)
