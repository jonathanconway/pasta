import index, { bootstrap }  from '../index'

jest.mock('../App', () => jest.fn(() => ""))
import App from '../App'

describe('index', () => {
  it('adds a container root div to the document body', () => {
    expect(document.body.children[0].id).toEqual('root')
  })

  it('renders <App />', () => {
    expect(App).toHaveBeenCalled()
  })
})