import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext
  } from 'next/document'
  import { ServerStyleSheet } from 'styled-components'
  
  export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
      const sheet = new ServerStyleSheet()
      const originalRenderPage = ctx.renderPage
  
      try {
        ctx.renderPage = () =>
          originalRenderPage({
            enhanceApp: (App) => (props) =>
              sheet.collectStyles(<App {...props} />)
          })
  
        const initialProps = await Document.getInitialProps(ctx)
        return {
          ...initialProps,
          styles: (
            <>
              {initialProps.styles}
              {sheet.getStyleElement()}
            </>
          )
        }
      } finally {
        sheet.seal()
      }
    }
  
    render() {
      return (
        <Html>
          <Head>
            <title>Shopping Cart | Ts and NextJS</title>
            <link type="image/png" sizes="16x16" rel="icon" href="img/shopping-cart-16.png"/>
            <link type="image/png" sizes="32x32" rel="icon" href="img/shopping-cart-32.png"/>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }