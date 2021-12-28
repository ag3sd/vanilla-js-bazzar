import AppModule from './app-module'
const app = async () => {
  // const template = document.createElement('template');
  // template.innerHTML = '<app-layout></app-layout>'
  // template.content.cloneNode(true)
  // document.getElementById('app').appendChild(template);
  await AppModule();
};
app();