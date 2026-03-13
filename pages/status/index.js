import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <>
      <h1>Status</h1>
      <UpdatedAt isLoading={isLoading} data={data} />
      <DatabaseStatus isLoading={isLoading} data={data} />
    </>
  );
}

function UpdatedAt({ isLoading, data }) {
  let UpdatedAtText = "Carregando...";

  if (!isLoading && data) {
    UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {UpdatedAtText}</div>;
}

function DatabaseStatus({ isLoading, data }) {
  let versionText = "Carregando...";
  let maxConnections = "Carregando...";
  let openedConnections = "Caregando...";

  if (!isLoading && data) {
    maxConnections = data.dependencies.database.max_connections;
    openedConnections = data.dependencies.database.opened_connections;
    versionText = data.dependencies.database.version;
  }

  return (
    <>
      <h2>Batabase</h2>
      <div>Versão: {versionText}</div>
      <div>Conexões máximas: {maxConnections}</div>
      <div>Conexões abertas: {openedConnections}</div>
    </>
  );
}
