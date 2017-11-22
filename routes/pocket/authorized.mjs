// @ts-check
import { defaultOptions } from "./util";
import post from "../../lib/post";

export default function(request, response) {
  const postData = JSON.stringify({
    consumer_key: process.env.POCKET_CONSUMER_KEY,
    code: request.query.requestToken
  });
  const options = Object.assign({}, defaultOptions, {
    path: "/v3/oauth/authorize"
  });
  post(options, postData)
    .then(data => data.access_token)
    .then(accessToken => {
      // prettier-ignore
      response.send(
  `<html>
      <body>
          accessToken = ${accessToken}
      </body>
  </html>`
      )
    })
    .catch(error =>
      response.send(`Failed to get request token: ${error.message}`)
    );
}
