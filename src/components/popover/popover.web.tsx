/*
 * @Author: czy0729
 * @Date: 2023-05-26 08:53:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-26 11:04:03
 */
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import Dropdown from 'rc-dropdown'
import { Menu } from '@components'
import 'rc-dropdown/assets/index.css'

function Popover({ children, ...other }) {
  const { style, overlay } = other
  const data = other?.data || overlay?.props?.data
  const title = other?.title || overlay?.props?.title || ''
  const onSelect = other?.onSelect || overlay?.props?.onSelect

  const [visible, setVisible] = useState(false)
  const onVisibleChange = useCallback(value => {
    setVisible(value)
  }, [])
  const overlayElement = useMemo(() => {
    return (
      <Menu
        title={title ? [title] : undefined}
        data={data}
        onSelect={title => {
          if (typeof onSelect === 'function') {
            setTimeout(() => onSelect(title), 0)
          }
          setVisible(false)
        }}
      />
    )
  }, [data, title, onSelect])

  return (
    <Dropdown
      visible={visible}
      trigger={['click']}
      overlay={overlayElement}
      onVisibleChange={onVisibleChange}
    >
      <View style={style}>{children}</View>
    </Dropdown>
  )
}

export default Popover
