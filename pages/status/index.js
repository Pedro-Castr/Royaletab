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
      <Connections isLoading={isLoading} data={data} />
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

function Connections({ isLoading, data }) {
  let maxConnections = "Carregando...";
  let openedConnections = "Caregando...";

  if (!isLoading && data) {
    maxConnections = data.dependencies.database.max_connections;
    openedConnections = data.dependencies.database.opened_connections;
  }

  return (
    <>
      <div>Número de conexões máximas: {maxConnections}</div>
      <div>Número de conexões abertas: {openedConnections}</div>
    </>
  );
}
