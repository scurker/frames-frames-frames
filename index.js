const topShadowRoot = document.getElementById('top-shadow-root')
const frameShadowRoot = document.getElementById('frame-shadow-root')
const nestedShadowRoot = document.getElementById('nested-shadow-root')
const shadowStyles = `
  :host {
    background-color: #394;
    padding: 1em;
  }

  .color-contrast {
    background-color: #f00;
    border: 1px solid #a00;
    color: pink;
    padding: .5em 1em;
    border-radius: 4px;
  }
`

if (topShadowRoot) {
  const shadow = topShadowRoot.attachShadow({ mode: 'open' })
  const style = document.createElement('style')
  style.innerText = shadowStyles
  shadow.innerHTML = `
    <h2>Shadow Dom</h2>
    <button class="color-contrast">Click Me</button>
    <h3>Shadow Frame (same-domain)</h3>
    <iframe title="shadow nested frame (same-domain)" src="nested-frame.html"></iframe>
    <h3>Shadow Frame (x-domain)</h3>
    <iframe title="shadow nested frame (x-domain)" src="https://scurker.github.io:443/frames-frames-frames/nested-frame.html"></iframe>
  `
  shadow.appendChild(style)
}

if (frameShadowRoot) {
  const shadow = frameShadowRoot.attachShadow({ mode: 'open' })
  const style = document.createElement('style')
  style.innerText = shadowStyles
  shadow.innerHTML = `
    <h2>Frame Shadow Dom</h2>
    <button class="color-contrast">Click Me</button>
    <h3>Shadow Frame (same-domain)</h3>
    <iframe title="frame shadow nested frame (same-domain)" src="nested-frame.html"></iframe>
    <h3>Shadow Frame (x-domain)</h3>
    <iframe title="frame shadow nested frame (x-domain)" src="https://scurker.github.io:443/frames-frames-frames/nested-frame.html"></iframe>
  `
  shadow.appendChild(style)
}

if (nestedShadowRoot) {
  const shadow = nestedShadowRoot.attachShadow({ mode: 'open' })
  const style = document.createElement('style')
  style.innerText = shadowStyles
  shadow.innerHTML = `
    <h2>Nested Shadow Dom</h2>
    <button class="color-contrast">Click Me</button>
  `
  shadow.appendChild(style)
}

if (window.top === window) {
  const element = document.getElementById('top-frame-async')
  if (element) {
    setTimeout(() => {
      const asyncFrame = document.createElement('iframe')
      asyncFrame.setAttribute('src', 'https://scurker.github.io:443/frames-frames-frames/async-frame.html')
      asyncFrame.setAttribute('title', 'async x-domain frame')
      element.appendChild(asyncFrame)
    }, 3000)
  }
}

document.body.addEventListener('click', e => {
  switch (e.target.getAttribute('id')) {
    case 'hide-same-domain-frame':
      document.getElementById('top-frame-same-domain').style.display = e.target.checked ? 'none' : ''
    break
    case 'hide-cross-domain-frame':
      document.getElementById('top-frame-cross-domain').style.display = e.target.checked ? 'none' : ''
    break
    case 'hide-async-cross-domain-frame':
      document.getElementById('top-frame-async').style.display = e.target.checked ? 'none' : ''
    break
    case 'hide-shadow-root':
      document.getElementById('top-shadow-root').style.display = e.target.checked ? 'none' : ''
    break
  }
})