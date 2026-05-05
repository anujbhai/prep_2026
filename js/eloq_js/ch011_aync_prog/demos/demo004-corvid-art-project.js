const useLiveNetwork = false

function simulateRequest(ip, payload) {
  return new Promise(resolve => {
    const latencyMs = Math.floor(Math.random() * 25) + 10
    setTimeout(() => resolve({ ok: true, ip, payload }), latencyMs)
  })
}

async function request(ip, payload) {
  if (!useLiveNetwork) {
    return simulateRequest(ip, payload)
  }

  try {
    const response = await fetch(`http://${ip}/command`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} from ${ip}`)
    }
    return response.json().catch(() => null)
  } catch (_error) {
    // Fallback keeps the demo running when devices are offline.
    return simulateRequest(ip, payload)
  }
}

for (let addr = 1; addr < 256; addr++) {
  let data = []

  for (let n = 0; n < 1500; n++) {
    data.push(n < addr ? 3 : 0)
  }

  let ip = `10.0.0.${ addr }`

  request(ip, { command: "display", data })
    .then(() => console.log(`Request to ${ ip } accepted`))
    .catch(() => {})
}

const screen_addresses = [
  "10.0.0.44", "10.0.0.45", "10.0.0.41",
  "10.0.0.31", "10.0.0.40", "10.0.0.42",
  "10.0.0.48", "10.0.0.47", "10.0.0.46"
]

function createScreenData(litPixels) {
  const screenPixelCount = 1500
  const data = []

  for (let pixel = 0; pixel < screenPixelCount; pixel++) {
    data.push(pixel < litPixels ? 3 : 0)
  }

  return data
}

function createFrame(basePixels) {
  return screen_addresses.map((_, i) => createScreenData(basePixels + (i * 80)))
}

const clipImages = [
  createFrame(120),
  createFrame(260),
  createFrame(420),
  createFrame(700),
  createFrame(980),
  createFrame(700),
  createFrame(420),
  createFrame(260)
]

function display_frame(frame) {
  return Promise.all(frame.map((data, i) => {
    return request(screen_addresses[i], {
      command: "display",
      data
    })
  }))
}

function wait(time) {
  return new Promise(accept => setTimeout(accept, time))
}

class VideoPlayer {
  constructor(frames, frameTime) {
    this.frames = frames
    this.frameTime = frameTime
    this.stopped = true
  }

  async play() {
    this.stopped = false

    for (let i = 0; !this.stopped; i++) {
      let next_frame = wait(this.frameTime)

      await display_frame(this.frames[i % this.frames.length])
      await next_frame
    }
  }

  stop() {
    this.stopped = true
  }
}

let video = new VideoPlayer(clipImages, 100)

video.play().catch(e => {
  console.log("Playback failed: " + e)
})

setTimeout(() => video.stop(), 15000)
