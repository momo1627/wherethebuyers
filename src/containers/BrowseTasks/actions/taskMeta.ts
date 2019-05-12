import { ITaskMeta } from '../types/stateAndProps'
export const updateMeta = (taskMeta: ITaskMeta) => {
  return {
    type: 'UPDATE',
    payload: taskMeta,
  }
}