import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        color: string
        activeColor: string
        activeColorHover: string
        bgColor: string
    }
}
