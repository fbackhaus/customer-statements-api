interface Config {
  server: ServerConfig;
}

interface ServerConfig {
  port: number;
}

export default (): Config => {
  const serverConfig: ServerConfig = {
    port: parseInt(process.env.SERVER_PORT) || 3001,
  };

  return {
    server: serverConfig,
  };
};
