

export const WIZARD_CREATE = '@@wizards/WIZARD_CREATE'
export const WIZARD_UPDATE = '@@wizards/WIZARD_UPDATE'
export const WIZARD_PROGRESS = '@@wizards/WIZARD_PROGRESS'


export const createWizard = (tabs = undefined) => ({
  type: WIZARD_CREATE,
  tabs,
})


export const updateWizard = data => ({
  type: WIZARD_UPDATE,
  data,
})


export const progressWizard = () => ({
  type: WIZARD_PROGRESS,
})
