/*
 * @Author: czy0729
 * @Date: 2024-11-19 05:34:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:38:50
 */
import { useInitStore } from '@stores'
import { runAfter } from '@utils'
import { useMount } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 豆瓣同步页面逻辑 */
export function useDoubanSyncPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useMount(() => {
    runAfter(() => {
      $.init()
    })
  })

  return context
}
