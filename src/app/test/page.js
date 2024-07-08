function getEnvVariable() {
  return process.env.OPEN_AI_KEY;
}

export default function Test() {
  const key = getEnvVariable();
  return <div className="">{key}</div>;
}
