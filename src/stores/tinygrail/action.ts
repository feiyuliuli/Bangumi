/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:40:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 14:07:21
 */
import { toJS } from 'mobx'
import { getTimestamp, info } from '@utils'
import {
  API_TINYGRAIL_ASK,
  API_TINYGRAIL_AUCTION,
  API_TINYGRAIL_AUCTION_CANCEL,
  API_TINYGRAIL_BID,
  API_TINYGRAIL_BONUS,
  API_TINYGRAIL_BONUS_DAILY,
  API_TINYGRAIL_BONUS_HOLIDAY,
  API_TINYGRAIL_CANCEL_ASK,
  API_TINYGRAIL_CANCEL_BID,
  API_TINYGRAIL_CHARA_STAR,
  API_TINYGRAIL_DAILY_COUNT,
  API_TINYGRAIL_INIT,
  API_TINYGRAIL_JOIN,
  API_TINYGRAIL_LINK,
  API_TINYGRAIL_MAGIC,
  API_TINYGRAIL_SACRIFICE,
  API_TINYGRAIL_SCRATCH,
  API_TINYGRAIL_SCRATCH2,
  API_TINYGRAIL_SEARCH,
  SDK
} from '@constants'
import { TinygrailMagic } from '@constants/api/types'
import { Id, MonoId } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  updateCookie = cookie => {
    this.setState({
      cookie
    })
    this.save('cookie')
  }

  updateWebViewShow = show => {
    if (SDK >= 36) {
      this.setState({
        _webview: true
      })
      return
    }

    this.setState({
      _webview: show
    })
  }

  /** 更新献祭少于500未成塔的数据 */
  updateMyTemples = (id, sacrifices = 0) => {
    if (!this.hash || sacrifices > 500) {
      return
    }

    const key = 'temple'
    const temple = toJS(this[key]())
    const index = temple.list.findIndex(item => item.id == id)
    if (index === -1) {
      return
    }

    // 少于0删除项
    if (sacrifices === 0) {
      const { name } = temple.list[index]
      info(`${name} 已耗尽`)

      temple.list.splice(index, 1)
    } else {
      temple.list[index].sacrifices = sacrifices
    }

    temple._loaded = getTimestamp()
    this.setState({
      [key]: {
        [this.hash]: temple
      }
    })
    this.save(key)
  }

  /** 更新我的持仓角色 */
  updateMyCharaAssets = (id: string, state: number, sacrifices: number) => {
    // 只有这里能检测到未献祭满 500 角色的圣殿资产变化, 需要联动圣殿资产里面的对应项
    this.updateMyTemples(id, sacrifices)

    const key = 'myCharaAssets'
    const { chara = {} } = this[key] as any
    const { list = [] } = chara
    const index = list.findIndex((item: { monoId: number }) => item.monoId === parseInt(id))
    if (index !== -1) {
      const newList = toJS(list)

      // 没有活股需要删除项
      if (state <= 0) {
        newList.splice(index, 1)
      } else {
        newList[index].state = state
        newList[index].sacrifices = sacrifices
      }

      this.setState({
        [key]: {
          ...this[key],
          chara: {
            ...this[key].chara,
            list: newList
          }
        }
      })
      this.save(key)
      return true
    }

    return false
  }

  /** 批量根据角色 id 更新我的持仓角色 */
  batchUpdateMyCharaAssetsByIds = async ids => {
    for (const id of ids) {
      const { amount, sacrifices } = (await this.fetchUserLogs(id)) as any
      this.updateMyCharaAssets(id, amount, sacrifices)
    }
  }

  /** 批量根据角色 id 更新我的圣殿资产 */
  batchUpdateTemplesByIds = async ids => {
    if (!this.hash) return

    const key = 'temple'
    const temple = toJS(this[key]())
    let flag

    for (const id of ids) {
      const { list } = await this.fetchCharaTemple(id)
      const find = list.find(item => item.name == this.hash)
      if (find?.id) {
        const index = temple.list.findIndex(item => item.id == find.id)
        if (index !== -1) {
          flag = true

          // 若 sacrifices 为 0 需要删除项
          // @notice 其实这里不可能找到 sacrifices 为 0 的圣殿, 只能通过 updateMyCharaAssets 信息找到
          if (find.sacrifices === 0) {
            const { name } = temple.list[index]
            info(`${name} 已耗尽`)

            temple.list.splice(index, 1)
          } else {
            temple.list[index].assets = find.assets
            temple.list[index].sacrifices = find.sacrifices
          }
        }
      }
    }

    if (flag) {
      this.setState({
        [key]: {
          [this.hash]: temple
        }
      })
      this.save(key)
    }
  }

  /** 切换是否显示角色股价预览 */
  toggleStockPreview = () => {
    const { _stockPreview } = this.state
    this.setState({
      _stockPreview: !_stockPreview
    })
  }

  /** 切换收藏 */
  toggleCollect = (monoId: MonoId) => {
    const { collected } = this.state

    const _collected = {
      ...collected
    }

    if (_collected[monoId]) {
      _collected[monoId] = 0
    } else {
      _collected[monoId] = getTimestamp()
    }
    this.setState({
      collected: _collected
    })

    this.save('collected')
  }

  // -------------------- action --------------------
  /** 买入 */
  doBid = async ({ monoId, price, amount, isIce }) => {
    const result = await this.fetch(API_TINYGRAIL_BID(monoId, price, amount, isIce), true)
    if (result.data.State === 0) {
      return true
    }
    return false
  }

  /** 卖出 */
  doAsk = async ({ monoId, price, amount, isIce }): Promise<any> => {
    const result = await this.fetch(API_TINYGRAIL_ASK(monoId, price, amount, isIce), true)
    if (result.data.State === 0) return true
    return false
  }

  /** 取消买入 */
  doCancelBid = async ({ id }) => {
    const result = await this.fetch(API_TINYGRAIL_CANCEL_BID(id), true)
    if (result.data.State === 0) {
      return true
    }
    return false
  }

  /** 取消卖出 */
  doCancelAsk = async ({ id }) => {
    const result = await this.fetch(API_TINYGRAIL_CANCEL_ASK(id), true)
    if (result.data.State === 0) {
      return true
    }
    return false
  }

  /** 参与 ICO */
  doJoin = async ({ id, amount }) => {
    const result = await this.fetch(API_TINYGRAIL_JOIN(id, amount), true)
    if (result.data.State === 0) {
      return true
    }
    return false
  }

  /** 资产重组 */
  doSacrifice = async ({ monoId, amount, isSale }) => {
    const { data } = await this.fetch(API_TINYGRAIL_SACRIFICE(monoId, amount, isSale), true)
    return data
  }

  /** 拍卖 */
  doAuction = async ({ monoId, price, amount }) => {
    const { data } = await this.fetch(API_TINYGRAIL_AUCTION(monoId, price, amount), true)
    return data
  }

  /** 取消拍卖 */
  doAuctionCancel = async ({ id }) => {
    const { data } = await this.fetch(API_TINYGRAIL_AUCTION_CANCEL(id), true)
    return data
  }

  /** 刮刮乐 */
  doLottery = async (isBonus2 = false) => {
    const { data } = await this.fetch(
      isBonus2 ? API_TINYGRAIL_SCRATCH2() : API_TINYGRAIL_SCRATCH(),
      true
    )
    return data
  }

  /** 检测今天刮刮乐刮了多少次 */
  doCheckDaily = async () => {
    const { data } = await this.fetch(API_TINYGRAIL_DAILY_COUNT())
    return data
  }

  /** 每周分红 */
  doBonus = async () => {
    const { data } = await this.fetch(API_TINYGRAIL_BONUS(), true)
    return data
  }

  /** 每日签到 */
  doBonusDaily = async () => {
    const { data } = await this.fetch(API_TINYGRAIL_BONUS_DAILY(), true)
    return data
  }

  /** 节日福利 */
  doBonusHoliday = async () => {
    const { data } = await this.fetch(API_TINYGRAIL_BONUS_HOLIDAY(), true)
    return data
  }

  /** 新年快乐 */
  doSend = async (count = 10000) => {
    const { data } = await this.fetch(
      `https://tinygrail.com/api/event/send/sukaretto/${count}`,
      true
    )
    return data
  }

  /** 使用道具 */
  doMagic = async ({
    monoId,
    type,
    toMonoId,
    amount,
    isTemple
  }: {
    monoId?: MonoId
    type?: TinygrailMagic
    toMonoId?: Id
    amount?: number
    isTemple?: boolean
  }) => {
    const { data } = await this.fetch(
      API_TINYGRAIL_MAGIC(monoId, type, toMonoId, amount, isTemple),
      true
    )
    return data
  }

  /** 查询 */
  doSearch = ({ keyword }) => this.fetch(API_TINYGRAIL_SEARCH(keyword), true)

  /** Link */
  doLink = async ({ monoId, toMonoId }) => {
    const { data } = await this.fetch(API_TINYGRAIL_LINK(monoId, toMonoId), true)
    return data
  }

  /** 启动 ICO */
  doICO = async ({ monoId }) => {
    const { data } = await this.fetch(API_TINYGRAIL_INIT(monoId), true)
    return data
  }

  /** 灌注星之力 */
  doStarForces = async ({ monoId, amount }) => {
    const { data } = await this.fetch(API_TINYGRAIL_CHARA_STAR(monoId, amount), true)
    return data
  }
}
