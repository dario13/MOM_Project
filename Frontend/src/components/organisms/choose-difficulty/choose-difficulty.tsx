import React, { useEffect } from 'react'
import { Button, Card, FlexBox, Text } from '@/components/atoms'
import { RadioButton } from '@/components/molecules'
import { useGame } from '@/hooks/use-game'
import { useMedia } from '@/hooks/use-media'
import { useWalletBalance } from '@/hooks/use-wallet-balance'
import { yupResolver } from '@hookform/resolvers/yup'
import { Rule, Difficulty } from '@/store/game/game.types'
import { Controller, useForm } from 'react-hook-form'
import { schema } from './choose-difficulty.schema'
import { useRouter } from 'next/router'
import { useOperationInProgress } from '@/hooks/use-operation-in-progress'

interface FormValues {
  difficulty: Difficulty
}

const ChooseDifficultyComponent: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })
  const { isTabletOrMobile, isMobile } = useMedia()
  const { rules, startGame, isGameStarted } = useGame()
  const { momBalance } = useWalletBalance()
  const router = useRouter()
  const { operationInProgress } = useOperationInProgress()

  const selectedOption = watch('difficulty')

  useEffect(() => {
    if (isGameStarted) {
      router.push('/play/game')
    }
  }, [isGameStarted, router])

  const onSubmit = async (form: FormValues) => {
    await startGame(form.difficulty)
  }

  const hasEnoughBalance = (balanceRequired: number) => {
    if (balanceRequired > Number(momBalance)) return false
    return true
  }

  const renderOption = (rule: Rule) => {
    return (
      <FlexBox>
        <FlexBox paddingBottom="0.5rem">
          <Text align={'center'} bold>
            {Difficulty[rule.difficulty]}
          </Text>
        </FlexBox>
        <FlexBox>
          <Text align="center">{`Prize: ${rule.tokensPrize} MOM`}</Text>
          <Text align="center">{`Cards to win: ${rule.cardsToWin}`}</Text>
          <Text align="center">{`Tokens to play: ${rule.tokensToPlay} MOM`}</Text>
        </FlexBox>
      </FlexBox>
    )
  }

  const options = rules.map((rule) => {
    return {
      value: rule.difficulty,
      name: Difficulty[rule.difficulty],
      tokensToPlay: rule.tokensToPlay,
      children: renderOption(rule),
    }
  })

  return (
    <FlexBox maxWidth={isTabletOrMobile ? '80vw' : '60vw'}>
      <Card color="base200">
        <FlexBox padding="1.5rem" gap="1.5rem">
          <FlexBox>
            <Text size="xl" bold align="center" text="Choose a difficulty" />
          </FlexBox>
          <FlexBox flexDirection={isMobile ? 'column' : 'row'} gap="1.5rem">
            {options.map((option, index) => (
              <Controller
                key={index}
                control={control}
                name="difficulty"
                render={({ field: { onChange, value } }) => (
                  <FlexBox width={isMobile ? '100%' : '16vw'}>
                    <RadioButton
                      value={option.value.toString()}
                      onChange={(value) => onChange(Number(value))}
                      checked={value === option.value}
                      disabled={!hasEnoughBalance(option.tokensToPlay)}
                    >
                      {option.children}
                    </RadioButton>
                  </FlexBox>
                )}
              />
            ))}
          </FlexBox>
          <FlexBox alignItems="center">
            <Button
              text="Start Game!"
              loading={operationInProgress}
              onClick={handleSubmit(onSubmit)}
              disabled={!!(selectedOption === undefined || operationInProgress)}
            />
          </FlexBox>
        </FlexBox>
      </Card>
    </FlexBox>
  )
}

ChooseDifficultyComponent.displayName = 'ChooseDifficulty'

export const ChooseDifficulty = React.memo(ChooseDifficultyComponent)
