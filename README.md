```
mutation {
  createMyThings(input: [{}, {}, {}]) {
    myThings {
      id
      stuff {
        id
      }
    }
  }
  createMyStuffs(input: [{}, {}, {}]) {
    myStuffs {
      id
      thing {
        id
      }
    }
  }
}
```
Then connect one of the things to one of the stuff, and run the following query:
```
query {
  myThings(where: {stuff: null}) {
    id
    stuff {
      id
    }
  }
}
```

it now returns all 3 things, even if one of them is connected to a stuff