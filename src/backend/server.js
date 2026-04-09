import { createServer } from "http";
import worker from "./api.ts"; // Your existing logic

const port = process.env.PORT || 10000;

// This simulates the Cloudflare "fetch" environment on Render
const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Create a standard Request object from the Node request
  const request = new Request(url.href, {
    method: req.method,
    headers: req.headers,
  });

  const response = await worker.fetch(request);
  const body = await response.text();

  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(body);
});

server.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
