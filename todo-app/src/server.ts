import app from './app';

app.listen(process.env['APP_PORT'], () => {
  console.log(
    `${process.env['APP_NAME']} app started on port ${process.env['APP_PORT']}`
  );
});
