import { WelcomeEmail, WelcomeProps } from './templates/welcome'


export async function wrapperWelcomeEmail(props: WelcomeProps): Promise<string> {
    return await WelcomeEmail(props)
}