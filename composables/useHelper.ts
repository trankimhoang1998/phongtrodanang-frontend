import moment from 'moment'
import { FormatDateEnum } from '@/constants/common'

export const useHelper = () => {
  const formatDate = (
    date: string | Date | null,
    format: string | null = null
  ): string => {
    if (!date) return ''
    if (!format) return moment(date).format(FormatDateEnum.FORMAT_NORMAL)
    return moment(date).format(format)
  }

  return {
    formatDate,
  }
}
