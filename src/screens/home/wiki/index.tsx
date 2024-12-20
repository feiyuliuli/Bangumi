/*
 * @Author: czy0729
 * @Date: 2021-07-12 09:55:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:41:36
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useSubjectWikiPage } from './hooks'

/** 修订历史 */
const SubjectWiki = (props: NavigationProps) => {
  const { id, $, navigation } = useSubjectWikiPage(props)

  return useObserver(() => (
    <Component id='screen-subject-wiki'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page>
          <List $={$} navigation={navigation} />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default SubjectWiki
