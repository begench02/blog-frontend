import ReactDOM from 'react-dom/client'
import { App } from 'App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { darkTheme } from 'styles/theme'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: 120000 }
    }
})

const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }
    html, body {
        font-family: 'Comme', sans-serif;
        background-color: ${props => props.theme.bgColor};
        color: ${props => props.theme.color};
        padding: 0;
        margin: 0;
    }
    a {
        text-decoration: none;
    }
`

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
            <App />
            <Toaster />
        </ThemeProvider>
    </QueryClientProvider>
)
