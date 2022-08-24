/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-24 15:53:14
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, RenderHtml } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { memo } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { Avatar, Name } from '../../base'
import UserLabel from './user-label'
import FloorText from './floor-text'
import IconExtra from './icon-extra'
import ItemSub from './sub'
import { DEFAULT_PROPS, IMAGES_MAX_WIDTH, EXPAND_NUMS } from './ds'

const AVATAR_SIZE = 36

const Item = memo(
  ({
    navigation,
    styles,
    contentStyle,
    authorId,
    avatar,
    erase,
    floor,
    id,
    isAuthor,
    isExpand,
    isFriend,
    isJump,
    isNew,
    matchLink,
    msg,
    postId,
    readedTime,
    replySub,
    showFixedTextare,
    sub,
    time,
    translate,
    url,
    userId,
    userName,
    userSign,
    event,
    onToggleExpand
  }) => {
    global.rerender('Topic.Item.Main')

    // 遗留问题, 给宣传语增加一点高度
    const _msg = msg.replace(
      '<span style="font-size:10px; line-height:10px;">[来自Bangumi for',
      '<span style="font-size:10px; line-height:20px;">[来自Bangumi for'
    )
    return (
      <Flex
        style={[_.container.item, isNew && styles.itemNew, isJump && styles.itemJump]}
        align='start'
      >
        <Avatar
          style={styles.image}
          navigation={navigation}
          userId={userId}
          name={userName}
          size={AVATAR_SIZE}
          src={avatar}
          event={event}
        />
        <Flex.Item style={[styles.content, contentStyle]}>
          <Flex align='start'>
            <Flex.Item>
              <Name
                userId={userId}
                size={userName.length > 10 ? 12 : 14}
                lineHeight={14}
                bold
                right={
                  <UserLabel
                    isAuthor={isAuthor}
                    isFriend={isFriend}
                    userSign={userSign}
                  />
                }
              >
                {HTMLDecode(userName)}
              </Name>
            </Flex.Item>
            <IconExtra
              id={id}
              msg={msg}
              replySub={replySub}
              erase={erase}
              userId={userId}
              userName={userName}
              showFixedTextare={showFixedTextare}
            />
          </Flex>
          <FloorText time={time} floor={floor} />
          <RenderHtml
            style={_.mt.sm}
            baseFontStyle={_.baseFontStyle.md}
            imagesMaxWidth={IMAGES_MAX_WIDTH}
            html={_msg}
            matchLink={matchLink}
            onLinkPress={href => appNavigate(href, navigation, {}, event)}
            onImageFallback={() => open(`${url}#post_${id}`)}
          />
          {!!translate && (
            <Text style={styles.translate} size={11}>
              {translate}
            </Text>
          )}
          <View style={styles.sub}>
            <Flex wrap='wrap'>
              {sub
                .filter((item, index) => (isExpand ? true : index < EXPAND_NUMS))
                .map(item => (
                  <ItemSub
                    key={item.id}
                    id={item.id}
                    message={item.message}
                    userId={item.userId}
                    userName={item.userName}
                    avatar={item.avatar}
                    floor={item.floor}
                    erase={item.erase}
                    replySub={item.replySub}
                    time={item.time}
                    postId={postId}
                    authorId={authorId}
                    uid={userId}
                    url={url}
                    readedTime={readedTime}
                    matchLink={matchLink}
                    showFixedTextare={showFixedTextare}
                    event={event}
                  />
                ))}
            </Flex>
            {sub.length > EXPAND_NUMS && (
              <Touchable onPress={() => onToggleExpand(id)}>
                <Text
                  style={styles.expand}
                  type={isExpand ? 'sub' : 'main'}
                  size={12}
                  align='center'
                  bold
                >
                  {isExpand ? '收起楼层' : `展开 ${sub.length - EXPAND_NUMS} 条回复`}
                </Text>
              </Touchable>
            )}
          </View>
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS,
  ({ sub, ...other }) => ({
    sub: (sub as any[]).length,
    ...other
  })
)

export default Item
