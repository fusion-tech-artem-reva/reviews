function foo() {
  const x = 13;
  return {
    x: 20,
    foo() {
      
    },
    bar() {
      console.log(this.x)
    },
    baz: () => {
      console.log(this.x)
    }
  }
}