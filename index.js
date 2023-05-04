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
  const sameDomainElement = document.getElementById('top-frame-async-same-domain')
  const xDomainElement = document.getElementById('top-frame-async-cross-domain')
  if (sameDomainElement) {
    setTimeout(() => {
      const asyncFrame = document.createElement('iframe')
      asyncFrame.setAttribute('src', 'async-frame.html')
      asyncFrame.setAttribute('title', 'async same domain frame')
      sameDomainElement.appendChild(asyncFrame)
    }, 3000)
  }
  if (xDomainElement) {
    setTimeout(() => {
      const asyncFrame = document.createElement('iframe')
      asyncFrame.setAttribute('src', 'https://scurker.github.io:443/frames-frames-frames/async-frame.html')
      asyncFrame.setAttribute('title', 'async x-domain frame')
      xDomainElement.appendChild(asyncFrame)
    }, 3000)
  }
}

document.body.addEventListener('click', e => {
  const hideNode = id => {
    const target = document.getElementById(id)
    target.style.display = e.target.checked ? 'none' : ''
    // Hack to hide node from tools checking for isConnected
    Object.defineProperty(target, 'isConnected', {
      value: !!e.target.checked,
      configurable: true
    })
  }
  switch (e.target.getAttribute('id')) {
    case 'hide-same-domain-frame':
      hideNode('top-frame-same-domain')
    break
    case 'hide-cross-domain-frame':
      hideNode('top-frame-cross-domain')
    break
    case 'hide-async-same-domain-frame':
      hideNode('top-frame-async-same-domain')
    break
    case 'hide-async-cross-domain-frame':
      hideNode('top-frame-async-cross-domain')
    break
    case 'hide-shadow-root':
      hideNode('top-shadow-root')
    break
  }
})
