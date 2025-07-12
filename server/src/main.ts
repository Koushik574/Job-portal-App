async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.PORT; // ✅ No fallback value!
  if (!port) {
    throw new Error('❌ PORT environment variable is not defined!');
  }

  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
