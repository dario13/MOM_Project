import { Difficulty } from '@/store/game/game.types'
import * as yup from 'yup'

export const schema = yup
  .object()
  .shape({
    difficulty: yup
      .mixed<Difficulty>()
      .oneOf(
        Object.values(Difficulty).filter((value) => typeof value === 'number') as Difficulty[],
      ),
  })
  .required()
