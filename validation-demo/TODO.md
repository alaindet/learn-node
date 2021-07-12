- [ ] Add "validated" key to Request using this => https://dev.to/dakdevs/extend-express-request-in-typescript-1693
- [ ] Try to create @Controller and @Route like this
```
// @Controller('/foo')
class FooController {

  // @Route('POST', '/create')
  create(): void {
    console.log('FooController.create');
  }

  // @Route('GET', '/read')
  read(): void {
    console.log('FooController.read');
  }
}
```
