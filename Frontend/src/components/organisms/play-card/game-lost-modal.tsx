import { AlertDialog } from '@/components/molecules'
import { useRouter } from 'next/router'
import React from 'react'

type GameLostModalProps = {
  visible: boolean
  resetGame: () => void
}

const GameLostModal: React.FC<GameLostModalProps> = ({ visible, resetGame }) => {
  const router = useRouter()

  return (
    <AlertDialog
      visible={visible}
      actions={{
        main: {
          text: 'Ok',
          color: 'primary',
          onPress: async () => {
            resetGame()
            await router.push('/')
          },
        },
      }}
      title={'Game Over 🙁 Better Luck Next Time'}
      message={`Oh no! You've been defeated in this round. Keep practicing your intuition and card sense, and you'll be guessing the right cards in no time. Don't let this setback discourage you; every game is a new opportunity to win. Keep playing and have fun!`}
    />
  )
}

export default GameLostModal
