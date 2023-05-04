import { ExchangeMode } from './exchange-card.props'
import diamond from '../../../../public/images/favicon/android-chrome-192x192.png'
import handReceiving from '../../../../public/images/hand-icon.png'

const buyTitle = 'Buy MOM'
const buyDescription = 'You need MOM token to start playing'

const sellTitle = 'Dont you want to play now?'
const sellDescription = 'No problem, just sell your MOM token and get back your USDT'

const exchangeModeContent = (exchangeMode: ExchangeMode) => {
  return exchangeMode === 'buy'
    ? { title: buyTitle, description: buyDescription, image: diamond }
    : { title: sellTitle, description: sellDescription, image: handReceiving }
}

export default exchangeModeContent
