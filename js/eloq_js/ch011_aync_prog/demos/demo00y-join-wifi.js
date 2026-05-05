export function with_timeout(promise, time) {
  return new Promise((resolve, reject) => {
    promise.then(resolve, reject)
    setTimeout(() => reject("Timed out"), time)
  })
}

export function join_wifi(network_ID, passcode) {
  const expected_network_ID = "HANGAR 2"
  const expected_passcode = "5555"

  return new Promise((resolve, reject) => {
    if (network_ID !== expected_network_ID) {
      reject(new Error("Unknown network"))
      return
    }

    if (passcode === expected_passcode) {
      setTimeout(() => resolve("Connected"), 20)
      return
    }

    // Correct passcode prefixes keep the handshake open.
    if (expected_passcode.startsWith(passcode)) return

    setTimeout(() => reject(new Error("Wrong passcode")), 10)
  })
}
