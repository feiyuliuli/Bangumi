/*
 * @Author: czy0729
 * @Date: 2022-05-02 12:19:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-05 03:19:39
 */
import { Expand, Fn, Navigation, ReactNode, TextStyle } from '@types'
import { Props as PopoverProps } from './popover/types'
import { Props as PlaceholderProps } from './placeholder/types'

export type Props = {
  /** 模式 */
  mode?: 'float' | 'transition'

  /** 是否锁定, 模式不为空时有效 */
  fixed?: boolean

  /** onScroll 垂直y坐标, 模式不为空时有效 */
  // y?: number

  /** 标题 */
  title?: string

  /** [WEB] 若有此值, 页面标题以此优先 */
  domTitle?: string

  /** 统计参数: [url地址, 对应页面key] */
  hm?: [string] | [string, string]

  /** 统计别名 */
  alias?: string

  /** 左侧 element */
  headerLeft?: ReactNode

  /**
   * 右侧 element
   * https://reactnavigation.org/docs/5.x/stack-navigator#headerright
   */
  headerRight?: () => ReactNode

  /** 模式为 'transition' 时有效, 代替 title 显示 */
  headerTitle?: ReactNode

  /** 标题对齐 */
  headerTitleAlign?: 'center' | 'left'

  /** 标题样式 */
  headerTitleStyle?: TextStyle

  /** 是否变动状态栏主题 */
  statusBarEvents?: boolean

  /** @deprecated 预设的状态栏主题 */
  statusBarEventsType?: 'Subject' | 'Topic' | 'Tinygrail'

  /** 覆写后退点击回调 */
  onBackPress?: Fn
}

export interface IHeader {
  (props: Props): JSX.Element
  Popover?: (props: PopoverProps) => JSX.Element
  Placeholder?: (props: PlaceholderProps) => JSX.Element
}

export type UpdateHeaderProps = Expand<
  {
    navigation: Navigation
  } & Pick<
    Props,
    | 'title'
    | 'headerTitleAlign'
    | 'headerTitleStyle'
    | 'headerRight'
    | 'mode'
    | 'fixed'
    | 'statusBarEventsType'
  > & {
      headerLeft?: any
      onBackPress?: Fn
    }
>
