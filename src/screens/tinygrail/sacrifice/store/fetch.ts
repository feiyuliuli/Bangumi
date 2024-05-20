/*
 * @Author: czy0729
 * @Date: 2024-05-19 08:23:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 20:14:51
 */
import { tinygrailStore } from '@stores'
import { getTimestamp, toFixed } from '@utils'
import { xhrCustom } from '@utils/fetch'
import { API_TINYGRAIL_STAR } from '@constants'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 预测股息 */
  fetchTest = () => {
    if (!this.state.mounted) return

    if (this.test._loaded && getTimestamp() - Number(this.test._loaded) < 60 * 60 * 24 * 7) {
      return true
    }

    // console.info('0 股息预测')
    return tinygrailStore.fetchTest()
  }

  /** 角色小圣杯信息 */
  fetchCharacters = () => {
    if (!this.state.mounted) return

    // console.info('1 角色小圣杯信息')
    return tinygrailStore.fetchCharacters([this.monoId])
  }

  /** 角色发行价 */
  fetchIssuePrice = () => {
    if (!this.state.mounted) return

    // console.info('2 角色发行价')
    return tinygrailStore.fetchIssuePrice(this.monoId)
  }

  /** 本角色我的交易信息 */
  fetchUserLogs = () => {
    if (!this.state.mounted) return

    // console.info('3 本角色我的交易信息')
    return tinygrailStore.fetchUserLogs(this.monoId)
  }

  /** 本角色我的圣殿 */
  fetchMyTemple = async () => {
    if (!this.state.mounted) return

    // console.info('4 本角色我的圣殿')
    return tinygrailStore.fetchMyTemple(this.monoId)
  }

  /** 所有人固定资产 (可以得到自己的可用资产) */
  fetchCharaTemple = () => {
    if (!this.state.mounted) return

    // console.info('5 所有人固定资产')
    return tinygrailStore.fetchCharaTemple(this.monoId)
  }

  /** 自己的资产 */
  fetchAssets = () => {
    if (!this.state.mounted) return

    // console.info('6 自己的资产')
    return tinygrailStore.fetchAssets()
  }

  /** 本次拍卖信息 */
  fetchValhallChara = async () => {
    if (!this.state.mounted) return

    // console.info('7 本次拍卖信息')
    try {
      const { price } = await tinygrailStore.fetchValhallChara(this.monoId)
      if (price) {
        this.setState({
          auctionPrice: toFixed(price + 0.01, 2)
        })
      }
    } catch (error) {}

    return true
  }

  /** 当前拍卖状态 */
  fetchAuctionStatus = () => {
    if (!this.state.mounted) return

    // console.info('8 当前拍卖状态')
    return tinygrailStore.fetchAuctionStatus(this.monoId)
  }

  /** 上周拍卖信息 */
  fetchAuctionList = () => {
    if (!this.state.mounted) return

    // console.info('9 上周拍卖信息')
    return tinygrailStore.fetchAuctionList(this.monoId)
  }

  /** 董事会 */
  fetchUsers = () => {
    if (!this.state.mounted) return

    // console.info('10 董事会')
    return tinygrailStore.fetchUsers(this.monoId)
  }

  /** 角色奖池 */
  fetchCharaPool = () => {
    if (!this.state.mounted) return

    // console.info('11 角色奖池')
    return tinygrailStore.fetchCharaPool(this.monoId)
  }

  /** 通天塔 */
  fetchStarForcesRankValues = async () => {
    if (!this.state.mounted) return

    const { _loaded } = this.state.rankStarForces
    if (_loaded && Number(this.state._loaded) - _loaded <= 600) return

    // console.info('12 通天塔')
    const rankStarForces = {
      _loaded: getTimestamp()
    }

    try {
      for (let i = 1; i <= 5; i += 1) {
        const { _response } = await xhrCustom({
          url: API_TINYGRAIL_STAR(i * 100, 1)
        })
        const { Value } = JSON.parse(_response)
        rankStarForces[i * 100] = Value[0].StarForces
      }

      for (let i = 1; i <= 4; i += 1) {
        const { _response } = await xhrCustom({
          url: API_TINYGRAIL_STAR(i * 20, 1)
        })
        const { Value } = JSON.parse(_response)
        rankStarForces[i * 20] = Value[0].StarForces
      }
    } catch (error) {}

    this.setState({
      rankStarForces
    })
    this.save()
  }

  /** 更新我的资产 */
  updateMyCharaAssets = () => {
    if (!this.state.mounted) return

    // console.info('13 更新我的资产')
    const { amount = 0, sacrifices = 0 } = this.userLogs
    return tinygrailStore.updateMyCharaAssets(this.monoId, amount, sacrifices)
  }
}
