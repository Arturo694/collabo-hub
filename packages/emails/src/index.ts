import { WelcomeEmail, WelcomeProps } from './templates/welcome.js'


export async function wrapperWelcomeEmail(props: WelcomeProps): Promise<string> {
    return await WelcomeEmail(props)
}