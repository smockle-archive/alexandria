export default function(request, response) {
  // prettier-ignore
  response.send(
  `<html>
      <body>
          <ul>
              <li>
                  <a href="/pocket/authorizing">Get Pocket Token</a>
              </li>
              <li>
                  <a href="/instapaper/authorizing">Get Instapaper Token</a>
              </li>
          </ul>
      </body>
  </html>`
      );
}
