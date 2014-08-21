module.exports = (grunt) ->
	pkg = grunt.file.readJSON 'package.json'

	for taskName of pkg.devDependencies
		if taskName.substring(0,6) == 'grunt-'
			grunt.loadNpmTasks taskName
	
	grunt.initConfig
		
		typescript:
			base:
				src: ['source_typescript/main.ts']
				dest: 'source/javascripts/main.js'
				options:
					sourceMap: true
		
		middleman:
			options:
				useBundle: true
			build:
				options:
					command: 'build'

	grunt.registerTask 'default', ['typescript' ]
	grunt.registerTask 'build', ['typescript', 'middleman:build' ]
