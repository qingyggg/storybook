package router

func RegRoutes(routes []func()) {
	i := 0
	for i < len(routes) {
		routes[i]()
		i++
	}
}
