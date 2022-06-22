/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:22:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 12:25:25
 */
import { EventType, Navigation, SubjectId } from '@types'

export type Props = {
  navigation?: Navigation
  id?: SubjectId
  name?: string
  nameCn?: string
  tip?: string
  rank?: string | number
  score?: string | number
  tags?: string
  comments?: string
  time?: string
  collection?: string
  userCollection?: string
  cover?: string
  type?: string
  modify?: string
  showLabel?: boolean
  hideScore?: boolean
  isDo?: boolean
  isOnHold?: boolean
  isDropped?: boolean
  isCollect?: boolean
  isCatalog?: boolean
  isEditable?: boolean
  event?: EventType
  onEdit?: (modify?: string) => any
}