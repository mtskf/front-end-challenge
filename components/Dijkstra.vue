<template lang="pug">
  div
    h2 Output
    ul
      li(v-for="n in 10") Output {{ '#' + n }}: {{ outputs[n] }}
</template>

<script>
  // Node Model
  const Node = function (name) {
    this.nextNodes = {}
    this.name = name
  }
  Node.prototype = {
    addNextNodes (nextNode, distance) { this.nextNodes[nextNode] = { name: nextNode, distance } }
  }

  export default {
    name: 'Dijkstra',
    props: ['inputString'],
    data () {
      return {
        data: this.inputString.replace('Graph:', '').trim()
      }
    },
    computed: {
      nodesList () {
        return this.getNodesList(this.validateData)
      },
      outputs () {
        return {
          1: this.getRouteDistance('A-B-C'),
          2: this.getRouteDistance('A-D'),
          3: this.getRouteDistance('A-D-C'),
          4: this.getRouteDistance('A-E-B-C-D'),
          5: this.getRouteDistance('A-E-D'),
          6: this.countRoutes('C', 'C', { maxStops: 3 }),
          7: this.countRoutes('A', 'C', { minStops: 4, maxStops: 4 }),
          8: this.getShortestDistance('A', 'C'),
          9: this.getShortestDistance('B', 'B'),
          10: this.countRoutes('C', 'C', { distanceLessThan: 30 })
        }
      },
      validateData () {
        let data = this.inputString.replace('Graph:', '').trim()
        if (this.validateInputString(data)) this.data = data
        else alert('Invalid data format...')
        return this.data
      }
    },
    methods: {
      testAdd (a, b) {
        return a + b
      },
      validateInputString (inputString) {
        // check if the string consists of uppercase alphabet divided by dash
        return /^([A-Z][A-Z]\d+,\s*)*([A-Z][A-Z]\d+)$/.test(inputString)
      },
      validateRouteString (routeString) {
        // check if the string consists of uppercase alphabet divided by dash
        return /^([A-Z][-])*([A-Z])$/.test(routeString)
      },
      getNodesList (inputString) {
        let nodesList = {}
        const nodeNamesArray = [...new Set(inputString.match(/[A-Z]+/g).join('').split(''))]

        for (let nodeName of nodeNamesArray) {
          let node = new Node(nodeName)
          nodesList[nodeName] = node
        }

        const edgesArr = inputString.split(',').map(edge => edge.trim())
        for (let edge of edgesArr) {
          let from, dest, distance
          [from, dest, distance] = [...edge]
          nodesList[from].addNextNodes(dest, distance)
        }

        // return adjacencyList
        return nodesList
      },
      getEdgeDistance (from, dest) {
        // TODO: error handling
        const nextNodes = this.nodesList[from].nextNodes
        if (nextNodes && nextNodes[dest]) return nextNodes[dest].distance
        else return false
      },
      getRouteNodesArray (routeString) {
        // trim blank spaces
        routeString = routeString.trim()

        // TODO: error handling: check if the string is the right format
        if (!this.validateRouteString(routeString)) return false

        // create array of nodes
        const routeNodesArray = routeString.split('-').map(node => node.toUpperCase().trim())

        return routeNodesArray
      },
      getRouteDistance (routeString) {
        let routeNodesArray = this.getRouteNodesArray(routeString)
        let distance = 0

        // TODO: error handling
        // if (!routeNodesArray) ...

        while (routeNodesArray && routeNodesArray.length > 1) {
          const from = routeNodesArray[0]
          const dest = routeNodesArray[1]
          const edgeDistance = this.getEdgeDistance(from, dest)
          if (edgeDistance) {
            distance += edgeDistance - 0
          } else {
            distance = 'NO SUCH ROUTE'
            break
          }
          routeNodesArray = routeNodesArray.slice(1)
        }
        return distance
      },
      countRoutes (from, dest, options, stopsCount = 0, queue = '', totalDistance = 0) {
        options = {
          minStops: options.minStops || 1,
          maxStops: options.maxStops || 9999,
          distanceLessThan: options.distanceLessThan || 9999
        }
        let routeCount = 0

        stopsCount++
        queue += from

        if (options.maxStops < stopsCount) return 0

        const nextNodes = this.nodesList[from].nextNodes
        for (let nextNodeName in nextNodes) {
          let nextTotalDistance = totalDistance + nextNodes[nextNodeName].distance * 1
          if (nextTotalDistance >= options.distanceLessThan) continue
          if (options.minStops <= stopsCount && nextNodeName === dest) {
            routeCount++
            // console.log('route matched:', queue + dest, ' total distance: ', nextTotalDistance)
          }
          routeCount += this.countRoutes(nextNodeName, dest, options, stopsCount, queue, nextTotalDistance)
        }
        return routeCount
      },
      getShortestDistance (from, dest, totalDistance = 0, minDistance = 999, queue = '') {
        // if the node "from" is already in the route, finish the recursive branch
        if (queue.indexOf(from) !== -1 && from !== dest) return minDistance

        // if the total distance is longer than other route, finish the recurisve branch
        else if (minDistance < totalDistance) return minDistance

        // if the shortest route is found, finish the recursive branch
        else if (from === dest && minDistance >= totalDistance && totalDistance > 0) return totalDistance

        queue += from // add the current node to the queue

        const nextNodes = this.nodesList[from].nextNodes
        for (let nextNodeName in nextNodes) {
          let nextTotalDistance = totalDistance + nextNodes[nextNodeName].distance * 1
          minDistance = this.getShortestDistance(nextNodeName, dest, nextTotalDistance, minDistance, queue)
        }
        return minDistance
      }
    }
  }
</script>

<style scoped lang="scss">
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
