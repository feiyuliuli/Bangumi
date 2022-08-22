/*
 * @Author: czy0729
 * @Date: 2022-08-13 05:35:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-15 13:46:32
 */
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { StoreConstructor } from '@types'
import subjectStore from '../subject'
import { getTimestamp } from '@utils'

const state = {
  tapXY: {
    x: 0,
    y: 0
  },

  popableSubject: {
    subjectId: 0,
    visible: false,
    portalKey: 0,
    x: 0,
    y: 0
  }
}

class UIStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  @computed get tapXY() {
    return this.state.tapXY
  }

  @computed get popableSubject() {
    return this.state.popableSubject
  }

  showPopableSubject = ({ subjectId }) => {
    const { _loaded } = subjectStore.subject(subjectId)
    if (!_loaded) subjectStore.fetchSubject(subjectId)

    if (this.popableSubject.visible) {
      this.closePopableSubject()

      if (subjectId !== this.popableSubject.subjectId) {
        setTimeout(() => {
          this.setState({
            popableSubject: {
              subjectId,
              visible: true,
              x: this.tapXY.x,
              y: this.tapXY.y
            }
          })
        }, 240)
      }
      return
    }

    setTimeout(() => {
      this.setState({
        popableSubject: {
          subjectId,
          visible: true,
          x: this.tapXY.x,
          y: this.tapXY.y
        }
      })
    }, 80)
  }

  closePopableSubject = () => {
    if (!this.state.popableSubject.visible) return

    this.setState({
      popableSubject: {
        visible: false
      }
    })

    setTimeout(() => {
      this.setState({
        popableSubject: {
          subjectId: 0
        }
      })
    }, 160)
  }

  updatePopableSubjectPortalKey = () => {
    this.setState({
      popableSubject: {
        portalKey: getTimestamp() || this.popableSubject.portalKey
      }
    })
  }

  setXY = (x = 0, y = 0) => {
    this.setState({
      tapXY: {
        x,
        y
      }
    })
  }
}

export default new UIStore()