/* Grunt Load Tasks */
'use strict';
module.exports = function(grunt) {
  grunt.loadTasks('grunt');
  grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'uglify', 'imagemin', 'modernizr', 'browserSync', 'watch']);
};
