/*
 * @Description:
 * @Author: Ray
 * @Date: 2021-06-07 17:52:46
 * @LastEditTime: 2021-06-08 16:20:02
 * @LastEditors: Ray
 */
module.exports = function (grunt) {
  // 　* nested：嵌套缩进的css代码，它是默认值。
  // 　* expanded：没有缩进的、扩展的css代码。
  // 　* compact：简洁格式的css代码。
  // 　* compressed：压缩后的css代码。
  var sassStyle = 'expanded'
  //项目配置
  grunt.initConfig({
    //读取配置项
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      // cleanoutput: {
      //   files: [
      //     {
      //       src: ['css/scss.css', 'css/concat.sass', 'css/scss.css.map'],
      //     },
      //   ],
      // },
      src: ['css/scss.css', 'css/concat.sass', 'css/scss.css.map'],
    },
    //任务
    //js语法检查
    jshint: {
      options: {
        jshintrc: '.jshintrc', //指定配置文件
      },
      build: ['gruntfile.js', 'js/*.js'], //指定检查的文件
    },
    //合并js,css
    concat: {
      options: {
        /****concat****/
        separator: '\n\n/****concat****/\n\n', //合并后文件之间的连接符 ;
      },
      dist: {
        files: {
          'dist/js/concat.js': ['js/*.js'],
          'dist/css/concat.css': ['css/*.css'],
        },
      },
      sass: {
        files: {
          'css/concat.sass': ['css/*.sass'],
        },
      },
    },
    //编译sass
    sass: {
      //target
      options: {
        //target options
        style: sassStyle,
      },
      dist: {
        files: {
          'css/scss.css': 'css/concat.sass', //'目标文件':'源文件'
        },
      },
    },
    //css编码
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
      },
      build: {
        files: {
          'dist/css/index.min.css': ['dist/css/concat.css'],
        },
      },
    },
    //压缩js
    uglify: {
      options: {
        //命令行注释
        //pkg package
        banner:
          '/*' +
          '\n name: <%=pkg.name%>' +
          '\n author:<%=pkg.author%>' +
          '\n version: <%=pkg.version%>' +
          '\n description: <%=pkg.description%>' +
          '\n Date: <%=grunt.template.today("yyyy-mm-dd")%>' +
          '\n*/',
      },
      build: {
        files: {
          'dist/js/index.min.js': ['dist/js/concat.js'],
        },
      },
    },
    watch: {
      scripts: {
        files: ['js/*.js', 'css/*.css', 'css/*.sass'], //监视的文件
        tasks: [
          'clean',
          'jshint',
          'concatSass',
          'sass',
          'concat',
          'uglify',
          'cssmin',
        ], //文件变化就执行的任务
        options: { spawn: false }, //增量更新---全量更新
      },
    },
  })
  //加载插件
  grunt.loadNpmTasks('grunt-contrib-clean')
  //js语法检查
  grunt.loadNpmTasks('grunt-contrib-jshint')
  //sass编译
  grunt.loadNpmTasks('grunt-contrib-sass')
  //合并
  grunt.loadNpmTasks('grunt-contrib-concat')
  //压缩
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  //监听变化
  grunt.loadNpmTasks('grunt-contrib-watch')
  //开发配置,自动化压缩，grunt
  //默认执行任务
  grunt.registerTask('concatSass', ['concat:sass'])
  grunt.registerTask('default', [
    'clean',
    'jshint',
    'concatSass',
    'sass',
    'concat',
    'uglify',
    'cssmin',
    'watch',
  ])
  //上线配置,自动化压缩拆分 grunt / grunt myWatch
  // grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'cssmin'])
  // grunt.registerTask('myWatch', ['default', 'watch'])
}
