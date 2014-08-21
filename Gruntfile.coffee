module.exports = (grunt) ->
	pkg = grunt.file.readJSON 'package.json'

	for taskName of pkg.devDependencies
		if taskName.substring(0,6) == 'grunt-'
			grunt.loadNpmTasks taskName
	
	grunt.initConfig
		
		external_daemon:
			mid_serve:
				cmd: 'bundle'
				args: [ 'exec', 'middleman', 'server' ]
				options:
					verbose: true
		
		watch:
			typescript:
				files: ['source_typescript/*.ts']
				tasks: ['typescript']

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

	grunt.registerTask 'default', [ 'typescript', 'watch' ]
	grunt.registerTask 'serve', [ 'typescript', 'external_daemon:mid_serve', 'watch' ]
	grunt.registerTask 'build', ['typescript', 'middleman:build' ]
