const topShadowRoot = document.getElementById('top-shadow-root')
const frameShadowRoot = document.getElementById('frame-shadow-root')
const nestedShadowRoot = document.getElementById('nested-shadow-root')
const shadowStyles = `
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
    <iframe title="shadow nested frame (x-domain)" src="https://scurker.github.io/frames-frames-frames/nested-frame.html"></iframe>
  `
  shadow.appendChild(style)
}

if (frameShadowRoot) {
  const shadow = topShadowRoot.attachShadow({ mode: 'open' })
  const style = document.createElement('style')
  style.innerText = shadowStyles
  shadow.innerHTML = `
    <h2>Frame Shadow Dom</h2>
    <button class="color-contrast">Click Me</button>
    <h3>Shadow Frame (same-domain)</h3>
    <iframe title="frame shadow nested frame (same-domain)" src="nested-frame.html"></iframe>
    <h3>Shadow Frame (x-domain)</h3>
    <iframe title="frame shadow nested frame (x-domain)" src="https://scurker.github.io/frames-frames-frames/nested-frame.html"></iframe>
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