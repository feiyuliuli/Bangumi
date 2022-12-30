/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:29:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 06:53:04
 */
import React from 'react'
import { Header, Page } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Tabs from '@tinygrail/_/tabs-v2'
import List from './list'
import Store from './store'
import { TABS } from './ds'
import { Ctx } from './types'

class TinygrailRich extends React.Component {
  componentDidMount() {
    const { $ }: Ctx = this.context
    $.init()
  }

  render() {
    const { $, navigation }: Ctx = this.context
    const { _loaded } = $.state
    return (
      <>
        <StatusBarEvents />
        <Header
          title='番市首富'
          hm={['tinygrail/rich', 'TinygrailRich']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <IconTouchable
              style={_.mr.xs}
              name='md-insert-chart-outlined'
              color={_.colorTinygrailPlain}
              onPress={() => {
                t('番市首富.跳转', {
                  to: 'TinygrailTreeRich'
                })

                navigation.push('TinygrailTreeRich')
              }}
            />
          )}
        />
        <Page style={_.container.tinygrail} loaded={_loaded}>
          <Tabs
            routes={TABS}
            renderItem={item => (
              <List key={item.key} id={item.key} title={item.title} />
            )}
          />
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailRich))