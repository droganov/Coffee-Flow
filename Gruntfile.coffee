module.exports = (grunt) ->
	grunt.initConfig
		pkg: grunt.file.readJSON "package.json"
		watch:
			options:
				atBegin: true
			coffee:
				files: "dev/coffeeflow.coffee"
				tasks: ["coffee","uglify"]
		coffee:
			compile:
				files:
					"js/coffeeflow.js" : "dev/coffeeflow.coffee"
		uglify:
			main:
				files:
					"js/coffeeflow.min.js" : "js/coffeeflow.js"
		connect:
			server:
				options:
					port: 9001
					base: "."
					# keepalive: true
		bumpup: ["package.json", "bower.json"]
		tagrelease: "package.json"


	# plugins
	# grunt.loadNpmTasks "grunt-contrib"
	grunt.loadNpmTasks "grunt-contrib-coffee"
	grunt.loadNpmTasks "grunt-contrib-uglify"
	grunt.loadNpmTasks "grunt-contrib-watch"
	grunt.loadNpmTasks "grunt-contrib-connect"
	grunt.loadNpmTasks "grunt-bumpup"
	grunt.loadNpmTasks "grunt-tagrelease"

	grunt.registerTask "default", ["connect", "watch"]
	
	grunt.registerTask "release", (type) ->
		type = "patch" if not type?
		grunt.task.run "coffee"
		grunt.task.run "uglify"
		grunt.task.run "bumpup:" + type
		grunt.task.run "tagrelease"