import Button from './default'
import Link from './link'
import Back from './back'
import Group from './group'
import Confirm from './confirm'
import ButtonProps from './buttonTypes'

const AlvButton = Button

AlvButton.AlvLinkButton = Link
AlvButton.AlvBackButton = Back
AlvButton.AlvGroupButton = Group
AlvButton.AlvConfirmButton = Confirm

export type { ButtonProps }
export default AlvButton as typeof AlvButton