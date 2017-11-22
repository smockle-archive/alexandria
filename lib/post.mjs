// @ts-check
import https from "https";

export default function(originalOptions, postData) {
  const options = Object.assign({}, originalOptions, {
    method: "POST",
    headers: Object.assign({}, originalOptions.headers, {
      "Content-Length": postData.length
    })
  });
  return new Promise((resolve, reject) => {
    var request = https.request(options, response => {
      response.on("data", data => {
        try {
          // @ts-ignore
          resolve(JSON.parse(data));
        } catch (_) {
          reject(new Error(`Received a malformed token: ${data}`));
        }
      });
    });
    request.on("error", error => {
      reject(error);
    });
    request.write(postData);
    request.end();
  });
}
