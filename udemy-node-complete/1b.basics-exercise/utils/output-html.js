const outputHtml = (content, title) => {

  const html = `
    <html>
    <head>
      <title>${title ?? 'Node.js demo'}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
    </head>
    <body>${content}</body>
    </html>
  `;

  return html;

  // return html
  //   .split('\n')
  //   .map(line => line.trim())
  //   .join('')
  //   .replace('/\n/g', '');
}

module.exports = outputHtml;
