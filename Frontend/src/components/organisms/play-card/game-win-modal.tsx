import { AlertDialog } from '@/components/molecules'
import { useRouter } from 'next/router'
import React from 'react'

type GameWinModalProps = {
  visible: boolean
  resetGame: () => void
  claimPrize: () => Promise<void>
}

const GameWinModal: React.FC<GameWinModalProps> = ({ visible, resetGame, claimPrize }) => {
  const router = useRouter()

  return (
    <AlertDialog
      visible={visible}
      actions={{
        main: {
          text: 'Claim Prize',
          color: 'primary',
          onPress: async () => {
            await claimPrize()
            resetGame()
            await router.push('/')
          },
        },
      }}
      title={'Victory Royale! 🎉'}
      message={`Congratulations, you've won the game! Your mastery of the cards has led you to triumph. Keep playing to hone your skills and achieve even greater victories.`}
    />
  )
}

export default GameWinModal
