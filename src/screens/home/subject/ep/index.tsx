/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:24:23
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import BookEp from '../book-ep'
import Disc from '../disc'
import { Ctx } from '../types'
import Ep from './ep'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  global.rerender('Subject.Ep')

  if ($.type === '游戏') return null // 游戏没有ep
  if ($.type === '书籍') return <BookEp />
  if ($.type === '音乐') return <Disc />
  return (
    <Ep
      styles={memoStyles()}
      watchedEps={$.state.watchedEps}
      totalEps={$.subjectFormHTML.totalEps}
      onAirCustom={$.onAirCustom}
      isDoing={$.collection?.status?.type === 'do'}
      showEpInput={systemStore.setting.showEpInput}
      showCustomOnair={systemStore.setting.showCustomOnair}
      onChangeText={$.changeText}
      onSelectOnAir={$.onSelectOnAir}
      onResetOnAirUser={$.resetOnAirUser}
      doUpdateSubjectEp={$.doUpdateSubjectEp}
    />
  )
})