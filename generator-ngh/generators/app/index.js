'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
        default: 'A Component Name'
      }
    ];

    return this.prompt(prompts).then(props => {
      let name = props.name
      let words = name.split(' ')
      //Camel case the words
      let camelWords = []
      words.forEach(word => {
        let  w
        w = word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
        camelWords.push(w)
      });
      props.lowerCamelCaseName = camelWords.join('')
      props.lowerCamelCaseName = props.lowerCamelCaseName.charAt(0).toLowerCase() + props.lowerCamelCaseName.slice(1)

      //dash the words
      props.dashedName = words.join('-').toLowerCase();

      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl( this.templatePath('component/index.js'),
      this.destinationPath(`${this.config.get('componentDirectory')}/${this.props.dashedName}/${this.props.dashedName}.component.js`),
      {dashedName: this.props.dashedName, lowerCamelCaseName: this.props.lowerCamelCaseName}
    );
    this.fs.copyTpl( this.templatePath('component/index.scss'),
      this.destinationPath(`${this.config.get('componentDirectory')}/${this.props.dashedName}/${this.props.dashedName}.scss`),
      {dashedName: this.props.dashedName}
    );
    this.fs.copyTpl( this.templatePath('component/index.html'),
      this.destinationPath(`${this.config.get('componentDirectory')}/${this.props.dashedName}/${this.props.dashedName}.html`),
      {dashedName: this.props.dashedName}
    );
  }
};
