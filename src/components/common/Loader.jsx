/**
 * Indicateur de chargement pendant les appels API.
 *
 * Usage :
 * {isLoading && <Loader />}
 */
function Loader({ text = "Chargement en cours..." }) {
  return (
    <div className="loader">
      <span className="loader__spinner" />
      <span>{text}</span>
    </div>
  );
}

export default Loader;
