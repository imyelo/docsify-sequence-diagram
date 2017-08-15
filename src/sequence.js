import Diagram from 'js-sequence-diagrams'

var LANG = 'sequence-diagram'

export function render (selector) {
  var dom = window.Docsify.dom

  if (!dom) {
    return
  }

  (dom.findAll(selector) || []).forEach(function (element) {
    var parent = element.parentNode
    var rendered = dom.create('p')
    var diagram = Diagram.parse(element.innerText)
    if (parent) {
      rendered.dataset.lang = LANG
      parent.replaceChild(rendered, element)
      diagram.drawSVG(rendered, {
        theme: 'simple',
      })
      var img = dom.create('img')
      img.src = 'data:image/svg+xml;charset-utf-8,' + encodeURIComponent(rendered.innerHTML)
      rendered.replaceChild(img, rendered.lastChild)
    }
  })
}

export function install (hook) {
  hook.doneEach(function () {
    return render('pre[data-lang="' + LANG + '"]')
  })
}
