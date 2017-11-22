// @ts-check
import { port } from "../util";
import { defaultOptions } from "./util";
import post from "../../lib/post";

export default function(request, response) {
  const postData = JSON.stringify({
    consumer_key: process.env.POCKET_CONSUMER_KEY,
    // prettier-ignore
    redirect_uri: `http://localhost:${port}/pocket/authorized`
  });
  const options = Object.assign({}, defaultOptions, {
    path: "/v3/oauth/request"
  });
  post(options, postData)
    .then(data => data.code)
    .then(requestToken => {
      // prettier-ignore
      response.send(
  `<html>
      <body>
          <a href="https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=http%3A%2F%2Flocalhost%3A${port}%2Fpocket%2Fauthorized%3FrequestToken%3D${requestToken}">
              Authorize with Pocket
          </a>
      </body>
  </html>`
      );
    })
    .catch(error =>
      response.send(`Failed to get request token: ${error.message}`)
    );
}
