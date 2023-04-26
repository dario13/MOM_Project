import { Meta, Story } from '@/ioc/stories/story-types'
import { WalletButton } from './wallet-button'

const meta: Meta<typeof WalletButton> = {
  title: 'Molecules/WalletButton',
  component: WalletButton,
}

type WalletButtonStory = Story<typeof WalletButton>

export const Primary: WalletButtonStory = {
  args: {},
}

export default meta
