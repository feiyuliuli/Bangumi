/*
 * @Author: czy0729
 * @Date: 2019-09-20 22:05:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 12:09:50
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Flex, Input, Slider as SliderComp, Text } from '@components'
import { _, useStore } from '@stores'
import { debounce, formatNumber } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Slider() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { loading, amount } = $.state
  const { balance } = $.assets
  return (
    <View style={styles.container}>
      <Flex>
        <Flex.Item>
          <View style={styles.inputWrap}>
            <Input
              style={styles.input}
              keyboardType='numeric'
              value={String(amount)}
              onChangeText={$.changeAmount}
            />
          </View>
        </Flex.Item>
        <View style={[styles.btnSubmit, _.ml.md]}>
          <Button
            style={styles.btnRoot}
            type='bid'
            radius={false}
            loading={loading}
            onPress={$.doSubmit}
          >
            确定
          </Button>
        </View>
      </Flex>
      <Flex style={styles.slider}>
        <View style={_.container.block}>
          <SliderComp
            value={amount}
            min={5000}
            max={balance < 5000 ? 5000 : Number(balance)}
            step={1000}
            minimumTrackTintColor={_.colorBid}
            maximumTrackTintColor={_.colorTinygrailBorder}
            onChange={debounce(value => $.changeAmount(value < 5000 ? 5000 : value))}
          />
        </View>
      </Flex>
      <Flex>
        <Flex.Item>
          <Text type='tinygrailText' size={12}>
            余额 {formatNumber(5000, 0)}
          </Text>
        </Flex.Item>
        <Text type='tinygrailText' size={12}>
          {formatNumber(balance < 5000 ? 5000 : balance, 0, $.short)}
        </Text>
      </Flex>
    </View>
  )
}

export default ob(Slider, COMPONENT)
