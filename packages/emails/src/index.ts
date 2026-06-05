import { WelcomeEmail, WelcomeProps } from './templates/welcome.js'
import { NewConnectionEmail } from './templates/newconnection.js'


export async function wrapperWelcomeEmail(props: WelcomeProps): Promise<string> {
    return await WelcomeEmail(props)
}

export async function wrapperNewConnectionEmail(): Promise<string> {
    return await NewConnectionEmail()
}