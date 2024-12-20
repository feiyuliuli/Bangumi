/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:19:15
 */
import React from 'react'
import { Flex, Header as HeaderComp, Heatmap } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER } from '@constants'
import Filter from '../component/filter'
import { Ctx } from '../types'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      title={$.params?.name || '用户评分'}
      headerTitleAlign='left'
      headerTitleStyle={styles.title}
      alias='用户评分'
      hm={[$.url, 'Rating']}
      headerRight={() => (
        <Flex>
          <Filter $={$} />
          <HeaderComp.Popover
            data={DATA}
            onSelect={key => {
              if (key === TEXT_MENU_BROWSER) {
                open($.url)

                t('用户评分.右上角菜单', {
                  key
                })
              }
            }}
          >
            <Heatmap id='用户评分.右上角菜单' />
          </HeaderComp.Popover>
        </Flex>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
