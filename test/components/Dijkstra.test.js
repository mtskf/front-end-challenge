import { mount } from '@vue/test-utils'
import Dijkstra from '@/components/Dijkstra'

describe('Dijkstra', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Dijkstra)
  })

  test('output #1', () => expect(wrapper.vm.getRouteDistance('A-B-C')).toEqual(9))
  test('output #2', () => expect(wrapper.vm.getRouteDistance('A-D')).toEqual(5))
  test('output #3', () => expect(wrapper.vm.getRouteDistance('A-D-C')).toEqual(13))
  test('output #4', () => expect(wrapper.vm.getRouteDistance('A-E-B-C-D')).toEqual(22))
  test('output #5', () => expect(wrapper.vm.etRouteDistance('A-E-D')).toEqual('NO SUCH ROUTE'))
  test('output #6', () => expect(wrapper.vm.countRoutes('C', 'C', { maxStops: 3 })).toEqual(2))
  test('output #7', () => expect(wrapper.vm.countRoutes('A', 'C', { minStops: 4, maxStops: 4 })).toEqual(3))
  test('output #8', () => expect(wrapper.vm.getShortestDistance('A', 'C')).toEqual(9))
  test('output #9', () => expect(wrapper.vm.getShortestDistance('B', 'B')).toEqual(9))
  test('output #10', () => expect(wrapper.vm.countRoutes('C', 'C', { distanceLessThan: 30 })).toEqual(7))
})
