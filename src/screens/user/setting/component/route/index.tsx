/*
 * @Author: czy0729
 * @Date: 2022-01-22 11:55:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 03:29:44
 */
import React from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { STORYBOOK } from '@constants'
import { getShows } from '../../utils'
import HomeRenderTabs from './home-render-tabs'
import InitialPage from './initial-page'
import { COMPONENT, TEXTS } from './ds'

function Route({ filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (STORYBOOK || !shows) return null

    return (
      <>
        <ItemSetting hd='底栏' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='底栏' onClose={setFalse}>
          {shows.blocks && <HomeRenderTabs filter={filter} />}
          {shows.initialPage && <InitialPage filter={filter} />}
        </ActionSheet>
      </>
    )
  })
}

export default Route
