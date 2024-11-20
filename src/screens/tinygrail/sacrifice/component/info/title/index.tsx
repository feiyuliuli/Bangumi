/*
 * @Author: czy0729
 * @Date: 2024-03-07 05:43:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:15:26
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import Bonus from '@screens/tinygrail/_/bonus'
import Level from '@screens/tinygrail/_/level'
import Rank from '@tinygrail/_/rank'
import { Ctx } from '../../../types'

function Title() {
  const { $, navigation } = useStore<Ctx>()
  const size = 13
  return (
    <Flex style={$.state.showCover && _.mt.md} justify='center'>
      <Touchable
        onPress={() => {
          t('资产重组.跳转', {
            to: 'Mono',
            from: '顶部',
            monoId: $.id
          })

          navigation.push('Mono', {
            monoId: `character/${$.id}`,
            _name: $.name
          })
        }}
      >
        <Flex justify='center'>
          <Rank value={$.rank} />
          <Text
            style={_.mh.xs}
            type='tinygrailPlain'
            size={size}
            lineHeight={1}
            align='center'
            bold
          >
            #{$.id} - {$.name}
          </Text>
          <Bonus value={$.bonus} lineHeight={size} />
          <Level value={$.level} lineHeight={size} />
          <Iconfont name='md-navigate-next' color={_.colorTinygrailText} />
        </Flex>
      </Touchable>
    </Flex>
  )
}

export default ob(Title)
