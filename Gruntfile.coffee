module.exports = (grunt) ->
	grunt.initConfig
		pkg: grunt.file.readJSON "package.json"
		watch:
			options:
				atBegin: true
			coffee:
				files: "dev/coffeeflow.coffee"
				tasks: ["coffee:compile"]
		coffee:
			compile:
				files:
					"js/coffeeflow.js" : "dev/coffeeflow.coffee"
		uglify:
			main:
				files:
					"js/coffeeflow.min.js" : "js/coffeeflow.js"

	# plugins
	# grunt.loadNpmTasks "grunt-contrib"
	grunt.loadNpmTasks "grunt-contrib-coffee"
	grunt.loadNpmTasks "grunt-contrib-uglify"

	grunt.registerTask "default", ["coffee", "uglify"]