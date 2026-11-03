// CodeAlong runtime probe: reports errors in your app to your CodeAlong workspace.
// You don't need to edit this file.
//
// Each error goes to the Vite dev server, which prints it in the terminal for CodeAlong to read
// (the ca-errors plugin in vite.config.js). Works in the preview and when it's popped out.

// sends one error to the Vite dev server over its hot-reload connection.
// import.meta.hot only exists while running under pnpm dev, so ?. skips it otherwise
function sendError(raw) {
  import.meta.hot?.send('ca:error', raw)
}

// errors thrown while the app runs, e.g. TypeError, ReferenceError
window.addEventListener('error', (event) => {
  sendError({
    name: event.error?.name,
    // event.message on its own starts with "Uncaught ", the error object's message doesn't
    message: event.error?.message ?? event.message,
    filename: event.filename,
    lineno: event.lineno,
  })
})

// promises nobody caught, e.g. a failed await axios.get(...)
window.addEventListener('unhandledrejection', (event) => {
  const err = event.reason
  // the browser doesn't say where a promise failed, so filename and lineno stay null
  sendError({ name: err?.name, message: err?.message ?? String(err), filename: null, lineno: null })
})
