export class Person{
  constructor(name){
    this.name = name;
  }

  introduceSelf(){
    // `` : on les appelle les littéraux de gabarit
    console.log(`Bonjour je m'appelle ${this.name} !`);
    
  }
}

