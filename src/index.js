#!/usr/bin/env node

var inquirer = require("inquirer");
var chalk = require("chalk");

var response = chalk.bold.green;
var titleBorder = chalk.white;
var whiteFont = chalk.white;
var bgCyan = chalk.bgCyan.black;
var bgMagenta = chalk.bgMagenta.black;
var greenFont = chalk.green;
var cyanFont = chalk.cyan;
var whiteBg = chalk.bgWhite.black;
var bgGreen = chalk.bgGreen.black;

var resume = require("./resume.json");

var resumePrompts = {
  type: "list",
  name: "resumeOptions",
  message: "What do you want to know about me?",
  choices: [...Object.keys(resume), "Exit"]

};

function main() {
    console.log();
    console.log(titleBorder('          --------------------------------------------'))
    console.log(titleBorder('          | ')+bgCyan("Heyaaa, I'm Rahul Sharma - The JS Lover.")+titleBorder(' |'));
    console.log(titleBorder('          --------------------------------------------'))
    console.log();
    resumeHandler();
}

function resumeHandler() {
  inquirer.prompt(resumePrompts).then(answer => {
    if (answer.resumeOptions == "Exit") {
      return;
    }

    var option = answer.resumeOptions;
    console.log(response("--------------------------------------"));
    console.log();
    if(option == 'Experience'){
      printExperience(option);
      console.log(response("--------------------------------------"));
    }
    else if(option == 'Tech stack'){
      printTechStack(option);
      console.log(response("--------------------------------------"));
    }
    else if(option == 'Co-curricular activities'){
      printCoCurricularActivities(option);
      console.log(response("--------------------------------------"));
    }
    else if(option == 'Certifications'){
      printCertifications(option);
      console.log(response("--------------------------------------"));
    }
    else if(option == 'Education'){
      printEducation(option);
      console.log(response("--------------------------------------"));
    }
    else if(option == 'Contact Me?'){
      printContact(option);
      console.log(response("--------------------------------------"));
    }

    printNavigation();

  });
}

function getNSpaces(n){
  var nSpacedString = "";
  for(var i=0;i<n;i++){
    nSpacedString = nSpacedString + " ";
  }
  return nSpacedString;
}

function printNavigation(){
  inquirer
    .prompt({
      type: "list",
      name: "exitBack",
      message: "Go back or Exit?",
      choices: ["Back", "Exit"]
    })
    .then(choice => {
      if (choice.exitBack == "Back") {
        resumeHandler();
      } else {
        return;
      }
    });
}

function printExperience(option){
  console.log(bgGreen(' Experience '));
  console.log();
  resume[`${option}`].forEach(info => {
    console.log(getNSpaces(4)+bgMagenta(" "+info.company+" "));
    console.log(getNSpaces(6)+whiteFont("|-->")+getNSpaces(2)+greenFont("( "+info.duration+" )"))
    console.log(getNSpaces(6)+whiteFont("|-->")+getNSpaces(2)+whiteFont(info.title))
    console.log(getNSpaces(6)+whiteFont("|-->")+getNSpaces(2)+cyanFont(info.description))
    console.log();
  });
}

function printTechStack(option){
  console.log(bgGreen(' Tech Stack '));
  var newObject = resume[option];
  Object.keys(newObject).map((key) => {
    let stackArray = newObject[key];
    console.log();
    console.log(getNSpaces(4)+bgCyan(" "+key+" "))
    stackArray.forEach((item) => {
      console.log(getNSpaces(6)+whiteFont("|-->")+getNSpaces(2)+whiteFont(item))
    });
  }); 
  console.log();
}

function printCoCurricularActivities(option){
  console.log(bgCyan(' Co-curricular activities '));
  console.log(getNSpaces(4)+whiteFont("|"));
  resume[option].forEach((item) => {
    console.log(getNSpaces(4)+whiteFont("|-->")+getNSpaces(2)+whiteFont(item));
    console.log(getNSpaces(4)+whiteFont("|"));
  });
  console.log();
}

function printCertifications(option){
  console.log(bgGreen(' Certifications '));
  console.log();
  resume[`${option}`].forEach(info => {
    console.log(getNSpaces(4)+bgMagenta(" "+info.name+" "));
    console.log(getNSpaces(6)+whiteFont("|-->")+getNSpaces(2)+whiteFont(info.description))
    console.log();
  });
}

function printEducation(option){
  console.log(bgMagenta(' Education '));
  console.log();
  resume[`${option}`].forEach(info => {
    console.log(getNSpaces(4)+bgCyan(" "+info.description+" "));
    console.log(getNSpaces(6)+whiteFont("|-->")+getNSpaces(2)+whiteFont(info.institutionName))
    console.log(getNSpaces(6)+whiteFont("|-->")+getNSpaces(2)+whiteFont(info.score))
    console.log();
  });
}

function printContact(option){
  console.log(bgGreen(' Contact Me? '));
  console.log();
  resume[`${option}`].forEach(info => {
    console.log(getNSpaces(4)+bgCyan(" "+info.name+" "));
    console.log(getNSpaces(6)+whiteFont("|-->")+getNSpaces(2)+whiteFont(info.link))
    console.log();
  });
}

(() => {
  console.clear();
  main();
})();