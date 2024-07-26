/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:21:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 21:23:48
 */
import React from 'react'
import { Flex, Loading } from '@components'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore, otaStore } from '@stores'
import { obc } from '@utils/decorators'
import { IMG_DEFAULT, IMG_HEIGHT_LG } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

function ItemGrid({ pickIndex, index, num }, { navigation }: Ctx) {
  const subjectId = otaStore.gameSubjectId(pickIndex)
  const { id, t: title, c: image, sc: score, r: rank, en: time } = otaStore.game(subjectId)
  if (!id) {
    const gridStyles = _.grid(num)
    return (
      <Flex
        style={{
          width: gridStyles.width,
          height: IMG_HEIGHT_LG,
          marginBottom: gridStyles.marginLeft + _.xs,
          marginLeft: gridStyles.marginLeft
        }}
        justify='center'
      >
        <Loading.Raw />
      </Flex>
    )
  }

  const styles = memoStyles()
  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      navigation={navigation}
      num={num}
      id={id}
      cover={image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT}
      name={title}
      score={score}
      rank={rank}
      airtime={time}
      collection={collectionStore.collect(id)}
      event={EVENT}
    />
  )
}

export default obc(ItemGrid, COMPONENT)
