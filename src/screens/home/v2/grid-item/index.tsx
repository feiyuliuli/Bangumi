/*
 * @Author: czy0729
 * @Date: 2019-10-20 17:49:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-19 11:29:38
 */
import React from 'react'
import { View } from 'react-native'
import Progress from '@ant-design/react-native/lib/progress'
import { Cover } from '@_'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SETTING_HOME_GRID_COVER_LAYOUT } from '@constants'
import { SettingHomeGridCoverLayoutCn } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'
import { Props } from './types'

function GridItem({ subject = {}, subjectId = 0, epStatus }: Props, { $ }: Ctx) {
  global.rerender('Home.GridItem')

  const styles = memoStyles()
  const { homeGridCoverLayout } = systemStore.setting
  const homeGridCoverLayoutCn =
    MODEL_SETTING_HOME_GRID_COVER_LAYOUT.getLabel<SettingHomeGridCoverLayoutCn>(
      homeGridCoverLayout
    )

  const { grid } = $.state
  const { subject_id: current } = grid || {}
  const isActive = current === subjectId

  const total = $.epsCount(subjectId)
  const percent = Math.min(
    (Math.floor(epStatus || 0) / Math.floor(total || 12)) * 100,
    100
  )
  return (
    <View style={styles.item}>
      <View style={isActive && styles.active}>
        <Cover
          size={styles.item.width}
          height={styles.item.width * (homeGridCoverLayoutCn === '长方形' ? 1.4 : 1)}
          src={subject?.images?.medium || ''}
          shadow
          radius
          delay={false}
          onPress={() => {
            $.selectGirdSubject(subjectId, {
              subject_id: subjectId,
              subject,
              ep_status: epStatus
            })
          }}
        />
      </View>
      <Progress
        style={styles.progress}
        barStyle={styles.bar}
        percent={percent ? Math.max(percent, 8) : 0}
        unfilled
      />
    </View>
  )
}

export default obc(GridItem)
