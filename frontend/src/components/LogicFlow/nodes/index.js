import customDiamond from './customDiamond'
import customEllipse from './customEllipse'
import customPolygon from './customPolygon'
import customRectRadius from './customRectRadius'
import customRect from './customRect'
import customCircle from './customCircle'

export const registerNodes = (instance, nodeTypes) => {
  if (instance && instance.register) {
    if (!nodeTypes || !Array.isArray(nodeTypes)) {
      nodeTypes = [
        'custom-circle',
        'custom-rect-radius',
        'custom-rect',
        'custom-diamond',
        'custom-ellipse'
      ]
    }
    const patternItems = [
      {
        label: '选中',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=',
        callback: () => {
          instance.extension.selectionSelect.openSelectionSelect()
          instance.once('selection:selected', () => {
            instance.extension.selectionSelect.closeSelectionSelect()
          })
        }
      }
    ]
    nodeTypes.forEach((type) => {
      const nodeConfig = type && nodeConfigs[type]
      if (nodeConfig) {
        const { icon, label, component } = nodeConfig
        component && instance.register(component)
        patternItems.push({ type, icon, label })
      }
    })

    instance.extension.dndPanel.setPatternItems(patternItems)
  }
}

const nodeConfigs = {
  circle: {
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAadJREFUWEfFl91xgzAMgA15YoTmukvJIM11kzSb9NJBku7SS0fgKXErzvIJ+UdygJoXDjDSZ/27MZWvprJ+UwTw/Db097vprTUvAN40poe7tebinr/a1ly+P7rxWXOpAEDx7WYOqFAj+I/veD1179LaLABXjDvdbMwRBONO0TJO2YEoFSGSAE7oGU0MSrWm3e4H2LkHaVuzS/0bBeDKfz67nWTK2HcKkoKIAmz3g3UCRRNKYBJEAEB+mK0c4Z5ehzMEMMQQt+YEgNJeT50qQyQLcAjuCg6wmOk5GMYVt4IHoIG39O5zVvAAa/ieWwFjgRYpDxD7qPWvdl3MDQFArmhoFaXWZQEw99fyP0JxPTQGxgyoBoAxUM0F/wGAmUZrQZCGsXI5N/iI/7FL+jIfFKKVAcY4o26elOI13ZDqMxOAVL1ewgWpFh90vFzrfBQkV+YDANqUtINlDkxq8eJINgeC9JdJ4FFg1VBaOp7xabp4KKWEfMIFi7hU8gcQUAjv4OwAd3pgkaZp1dgVgcjGI9QSSTEKUAHg4mpHs0fTT/NfkQU0AkvX/AKH5FEwr+wR5wAAAABJRU5ErkJggg=='
  },
  'custom-circle': {
    component: customCircle,
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAadJREFUWEfFl91xgzAMgA15YoTmukvJIM11kzSb9NJBku7SS0fgKXErzvIJ+UdygJoXDjDSZ/27MZWvprJ+UwTw/Db097vprTUvAN40poe7tebinr/a1ly+P7rxWXOpAEDx7WYOqFAj+I/veD1179LaLABXjDvdbMwRBONO0TJO2YEoFSGSAE7oGU0MSrWm3e4H2LkHaVuzS/0bBeDKfz67nWTK2HcKkoKIAmz3g3UCRRNKYBJEAEB+mK0c4Z5ehzMEMMQQt+YEgNJeT50qQyQLcAjuCg6wmOk5GMYVt4IHoIG39O5zVvAAa/ieWwFjgRYpDxD7qPWvdl3MDQFArmhoFaXWZQEw99fyP0JxPTQGxgyoBoAxUM0F/wGAmUZrQZCGsXI5N/iI/7FL+jIfFKKVAcY4o26elOI13ZDqMxOAVL1ewgWpFh90vFzrfBQkV+YDANqUtINlDkxq8eJINgeC9JdJ4FFg1VBaOp7xabp4KKWEfMIFi7hU8gcQUAjv4OwAd3pgkaZp1dgVgcjGI9QSSTEKUAHg4mpHs0fTT/NfkQU0AkvX/AKH5FEwr+wR5wAAAABJRU5ErkJggg=='
  },
  'custom-diamond': {
    component: customDiamond,
    label: '',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAPtJREFUWEfNl90RwiAQhOXRFizOVtRWLM4WfHXIQCYix+4eQpKXzBj29rsfSQinjutyfd+j/PU8L3fPFTyiqEnmt6R/eCFcAIV5zsEFIQOUmSd3dyUkAKvsPe2gAZAJem7NGgXABmfXbWEggBpUXd8EUIPlzBSdCaAEqfWX1VcBWDHaxJg4PwCMCBlvn6N4XwBosWLMQqwAo8zRYC4Ao81bEGGWuQWxP8DuLUBD4p38Ume1+jh/w1GVQEN+vK34X5VAmWef476OvZVgM6cqoEKo5jE+/CRjITzmEkBrx/SaywA1iKkHE6Md+ec5RzN2Jth3CD2EjS/fruP5BxXpFA4R40eHAAAAAElFTkSuQmCC'
  },
  'custom-ellipse': {
    component: customEllipse,
    label: '',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAXdJREFUWEftlkFywjAMRaWwyhHK9C4tBynDTWhu0qEHAe7SoUfICgzftVJhbGJn0rgLsknG8VjvS7b8mQo/XDg+PQCSM/C8al9RruOR1rGyMdMe/w6b+j21tL0ACIygzGQBMp+mDyYKMF+2UNGpNYZ2CA6VVfXz/fVR2zcgT6dfQGPoxQOOgtwA+IoReDajRoKlZsAJwPRORFXRwl/nCkCrHhrYBwyAXGWjA/BS3lu71EzIvNj6FsDVcIvvUJpyg8XmawiJYwHUj9GVR0qyRom/P+sFi3oZGEvtvXWe3totTgmywFOqFygtmoXmsKl7m9KY2ZkvW4OsIwPGtc/JAWxjKw5QvAR6R+a226F7Qm/88scQKiQLlz0xWSOSWDet+C8hQi3/f1xGsRsr116FNmXAUYWvY79NqsWaISCpxibLkonpdNf2TlsyjMGWwY4566Y9ZLoli12fuWc+1VFl9X+xV6IyBAX/iPHUppYFkJuFlPkPgOIZOAPhQQjlNMyXCAAAAABJRU5ErkJggg=='
  },
  'custom-polygon': {
    component: customPolygon,
    label: '',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAPtJREFUWEfNl90RwiAQhOXRFizOVtRWLM4WfHXIQCYix+4eQpKXzBj29rsfSQinjutyfd+j/PU8L3fPFTyiqEnmt6R/eCFcAIV5zsEFIQOUmSd3dyUkAKvsPe2gAZAJem7NGgXABmfXbWEggBpUXd8EUIPlzBSdCaAEqfWX1VcBWDHaxJg4PwCMCBlvn6N4XwBosWLMQqwAo8zRYC4Ao81bEGGWuQWxP8DuLUBD4p38Ume1+jh/w1GVQEN+vK34X5VAmWef476OvZVgM6cqoEKo5jE+/CRjITzmEkBrx/SaywA1iKkHE6Md+ec5RzN2Jth3CD2EjS/fruP5BxXpFA4R40eHAAAAAElFTkSuQmCC'
  },
  'custom-rect': {
    component: customRect,
    label: '',
    icon: ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAIZJREFUSEtjZKAxYKSx+QzDyAKZhO8O//4xOFAryJ4t4mwAmQUOIqm47yBOPbUMB5nDxMTg+GQB5wEUC54t4qRKnEjFff8PdHwjyBejFmCNttEgIpiaR4NoJAYRtCTdT9DvpClAlEVIJSppRuBQzcTEcABUksKLa6qYisMQqhTP+Bw49C0AAK+Vgxmzdw8YAAAAAElFTkSuQmCC'
  },
  'custom-rect-radius': {
    component: customRectRadius,
    label: '',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAADskT9PAAAAAXNSR0IArs4c6QAAAStJREFUSEvNVt0NgjAQvsMnRtA4i8IgGicR2cTgHAbcxegIPNmar+mZUmmihoJ9gl5z993/xxQ4y12bKUWZFRehd6F7ramBjJkuSULN9Ziaf/+wfwHDjwcVzMZ4CTkUfAsA7+GA1rSGLgCazaj0gXQALLbtgYjgbXmrUnwPdkK6XwBiGhcvbFpr10EDQARJQnkoV0OFQhwVWwbAfNPWKJahwx4CDRCojfspzVm8v1XpW0EO5XWfnsW21UpRzi6amAZ93TYVmscOvwDpAOjrz9jRsKk/IwV6jOrvG3hK0d7UAIRjdYCXgtVkAGztNdO34eSDyB3FMZZQoPjqzijGI39Gx2jDvoX3P+vYXZlCSEAihNH8EhGXUX1ESFwjQsmwtXBvGdK3OF6MKrTmn6Aq1fuzWbkdAAAAAElFTkSuQmCC'
  }
}
export { customDiamond, customEllipse, customPolygon, customRectRadius }
