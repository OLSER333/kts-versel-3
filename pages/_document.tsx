import React from "react";
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { renderStatic } from "../utils";

export default class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage();
    const { css, ids } = await renderStatic(page.html);
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          <style data-emotion={`css ${ids.join(" ")}`} dangerouslySetInnerHTML={{ __html: css }} />
        </React.Fragment>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
