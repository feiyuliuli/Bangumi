/*
 * @Author: czy0729
 * @Date: 2024-01-03 20:09:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 11:41:25
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Loading, RenderHtml, Text } from '@components'
import { IconTouchable, Likes } from '@_'
import { _, uiStore } from '@stores'
import { isChineseParagraph, removeHTMLTag, removeURLs } from '@utils'
import { memo } from '@utils/decorators'
import { fixedTranslateResult } from '@screens/home/subject/component/utils'
import { getTopicMainFloorRawText } from '../../utils'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const Content = memo(
  ({
    topicId,
    title,
    html,
    isEp,
    id,
    formhash,
    likeType,
    translateResult,
    doTranslate,
    onLinkPress
  }) => {
    const isGroup = topicId.includes('group/')
    return (
      <View style={styles.html}>
        {isGroup && !html && (
          <Flex style={styles.loading} justify='center'>
            <Loading />
          </Flex>
        )}
        {translateResult.length ? (
          <View>
            {fixedTranslateResult(translateResult, getTopicMainFloorRawText(title, html)).map(
              (item, index) => (
                <View key={index}>
                  <Text style={_.mt.md} size={13} lineHeight={14} type='sub'>
                    {item.src.trim()}
                  </Text>
                  <Text style={_.mt.xs} size={15} lineHeight={17}>
                    {item.dst.trim()}
                  </Text>
                </View>
              )
            )}
          </View>
        ) : (
          !!html && (
            <>
              {isEp && !isChineseParagraph(removeURLs(removeHTMLTag(html))) && (
                <View style={styles.iconTranslate}>
                  <IconTouchable name='md-g-translate' size={18} onPress={doTranslate} />
                  <Heatmap id='帖子.翻译内容' />
                </View>
              )}
              <View style={_.mt.md}>
                <RenderHtml html={html} matchLink onLinkPress={onLinkPress} />
                <Heatmap bottom={133} id='帖子.跳转' to='Blog' alias='日志' transparent />
                <Heatmap bottom={100} id='帖子.跳转' to='CatalogDetail' alias='目录' transparent />
                <Heatmap bottom={67} id='帖子.跳转' to='Topic' alias='帖子' transparent />
                <Heatmap bottom={34} id='帖子.跳转' to='Mono' alias='人物' transparent />
                <Heatmap id='帖子.跳转' to='WebBrowser' alias='浏览器' transparent />
              </View>
            </>
          )
        )}
        <Likes
          show
          topicId={topicId}
          id={id}
          formhash={formhash}
          likeType={likeType}
          onLongPress={uiStore.showLikesUsers}
        />
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Content
